import { Input } from "@/components/ui/input";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@radix-ui/react-select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";
import { useMutation, useReactiveVar } from "@apollo/client";
import { addTaskMutation } from "../graphql/mutations";
import { ITask, TaskSource } from "../interfaces";
import { Controller, useForm } from "react-hook-form";
import { toast } from "@/hooks/useToast";
import { userData } from "@/store/user";
import { getTaskByUserQuery } from "../graphql/queries";
import { toHHMM, toMin } from "@/utils/general";
import { buildGetTaskByUserQueryVariables } from "../hooks/useGetTaskByUserQuery";

type NewTaskForm = {
  title: string;
  description: string;
  category: string;
  scheduledTime: string;
  targetCount: string;
  priority: string;
  durationMinutes: number | string;
  source: TaskSource;
};

export const NewTaskForm = ({
  setShowAddTask,
  dateString,
}: {
  dateString: string;
  setShowAddTask: (val: boolean) => void;
}) => {
  const user = useReactiveVar(userData);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<NewTaskForm>({
    defaultValues: {
      title: "",
      description: "",
      durationMinutes: 30,
      category: "lead_generation",
      scheduledTime: "",
      targetCount: "1",
      priority: "medium",
      source: TaskSource.user,
    },
  });
  //TODO: move into its own hook
  const [createNewTaskFn, { loading }] = useMutation<{ addTask: ITask }>(
    addTaskMutation,
    {
      update: (cache, { data }) => {
        if (!data?.addTask) return;

        const newTask = data.addTask;

        const cacheId = {
          query: getTaskByUserQuery,
          variables: buildGetTaskByUserQueryVariables({
            dateString: newTask.date,
            userId: user?.id ?? "",
            userActiveTemplateId: user?.activeTemplateId ?? "",
          }),
        };

        // Read existing tasks from cache
        const existing = cache.readQuery<{ getTasksByUser: ITask[] }>(cacheId);

        if (existing?.getTasksByUser) {
          const newTaskList = [...existing.getTasksByUser, newTask].sort(
            (a, b) => toMin(a.startTime) - toMin(b.startTime)
          );
          cache.writeQuery({
            ...cacheId,
            data: {
              getTasksByUser: newTaskList,
            },
          });
        }
      },
    }
  );

  const onSubmit = async (data: NewTaskForm) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { scheduledTime, durationMinutes, targetCount, ...task } = data;
      const duration = Number(durationMinutes);
      const start = toMin(scheduledTime);
      const endTime = toHHMM(start + duration);
      await createNewTaskFn({
        variables: {
          tenant: {
            tenantId: import.meta.env.VITE_APP_TENANT_ID,
          },
          userId: user?.id,
          task: {
            ...task,
            date: dateString,
            startTime: scheduledTime,
            endTime,
          },
        },
      });

      toast({ title: "Task created successfully!" });
      reset(); // reset the form
      setShowAddTask(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create task.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md slide-up">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>Add Custom Task</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAddTask(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="text-sm font-medium mb-2 block">
                Task Title <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="Enter task title..."
                {...register("title", { required: true })}
              />
              {errors.title && (
                <p className="mt-2 text-red-500 text-xs">Title is required</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Description
              </label>
              <Textarea
                placeholder="Task description..."
                {...register("description")}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Scheduled Time <span className="text-red-500">*</span>
                </label>
                <Input
                  type="time"
                  {...register("scheduledTime", { required: true })}
                />
                {errors.scheduledTime && (
                  <p className="mt-2 text-red-500 text-xs">Time is required</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Duration (minutes)
                </label>
                <Input
                  type="number"
                  min={5}
                  placeholder="10"
                  {...register("durationMinutes", { required: true })}
                />
                {errors.targetCount && (
                  <p className="text-red-500 text-sm">Target Count</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="targetCount"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Target Count
                    </label>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString()}>
                            {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />

              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Priority
                    </label>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
            </div>
            <div>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Category
                    </label>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lead_generation">
                          Lead Generation
                        </SelectItem>
                        <SelectItem value="relationship_building">
                          Relationship Building
                        </SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="administrative">
                          Administrative
                        </SelectItem>
                        <SelectItem value="personal_development">
                          Personal Development
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              />
            </div>
            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowAddTask(false);
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 gradient-primary text-white"
              >
                {loading ? "Creating..." : "Create Task"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
