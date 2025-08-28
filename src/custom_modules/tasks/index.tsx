import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Target, CalendarDays } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/useToast";
import DailySchedule from "@/custom_modules/tasks/components/DailySchedule";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { ITask } from "./interfaces";
import { getTaskByUserQuery } from "./graphql/queries";
import { userData } from "@/store/user";
import { UserTasks } from "./components/UserTasks";
import { NewTaskForm } from "./components/TaskForm";
import { updateTaskMutation } from "./graphql/mutations";

export default function Tasks() {
  const user = useReactiveVar(userData);

  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showAddTask, setShowAddTask] = useState(false);

  const dateString = format(selectedDate, "yyyy-MM-dd");

  const { data, loading: isLoading } = useQuery<{ getTasksByUser: ITask[] }>(
    getTaskByUserQuery,
    {
      variables: {
        userId: user?.id,
        date: dateString,
      },
    }
  );
  const tasks = data?.getTasksByUser ?? [];

  const [updateNewTaskFn] = useMutation<{ updateTask: ITask }>(
    updateTaskMutation,
    {
      update(cache, { data }) {
        if (!data?.updateTask) return;

        const updatedTask = data.updateTask;

        const existing = cache.readQuery<{ getTasksByUser: ITask[] }>({
          query: getTaskByUserQuery,
          variables: { userId: user?.id, date: dateString },
        });

        if (!existing) return;

        const updatedTasks = existing.getTasksByUser.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        );

        cache.writeQuery({
          query: getTaskByUserQuery,
          variables: { userId: user?.id, date: dateString },
          data: {
            getTasksByUser: updatedTasks,
          },
        });
      },
    }
  );

  const handleTaskToggle = async (task: ITask) => {
    try {
      await updateNewTaskFn({
        variables: {
          userId: user?.id,
          taskId: task.id,
          updates: {
            isCompleted: !task.isCompleted,
          },
        },
      });

      if (!task.isCompleted) {
        toast({
          title: "Task Completed!",
          description: `Great job completing "${task.title}"`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update task.",
        variant: "destructive",
      });
    }
  };

  const dateChangeHandler = (newDate: Date) => {
    setSelectedDate(newDate);
  };

  return (
    <div>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
              Task Management
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 mt-1">
              Stay on track with your daily real estate activities
            </p>
          </div>
          <Button
            onClick={() => setShowAddTask(true)}
            className="gradient-primary text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>

        {/* Tabs for Schedule vs Custom Tasks */}
        <Tabs defaultValue="schedule" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="schedule" className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              Daily Schedule
            </TabsTrigger>
            <TabsTrigger value="custom" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Custom Tasks
            </TabsTrigger>
          </TabsList>

          <TabsContent value="schedule" className="mt-6">
            <DailySchedule
              isLoading={isLoading}
              tasks={tasks}
              handleTaskToggle={handleTaskToggle}
            />
          </TabsContent>

          <TabsContent value="custom" className="mt-6">
            <UserTasks
              selectedDate={selectedDate}
              tasks={tasks}
              dateChangeHandler={dateChangeHandler}
              isLoading={isLoading}
              handleTaskToggle={handleTaskToggle}
            />
          </TabsContent>
        </Tabs>
        {/* Add Task Modal */}
        {showAddTask && (
          <NewTaskForm
            dateString={dateString}
            setShowAddTask={setShowAddTask}
          />
        )}
      </div>
    </div>
  );
}
