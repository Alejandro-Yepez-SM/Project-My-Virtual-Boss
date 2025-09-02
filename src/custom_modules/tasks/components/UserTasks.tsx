import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ITask } from "../interfaces";
import {
  CalendarIcon,
  CheckCircle2,
  Clock,
  Filter,
  Search,
  Target,
} from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { formatTimeTo12Hour } from "@/utils/general";
import { categories, priorities } from "../data";

export const UserTasks = ({
  selectedDate,
  tasks,
  dateChangeHandler,
  isLoading,
  handleTaskToggle,
}: {
  selectedDate: Date;
  tasks: ITask[];
  dateChangeHandler: (newDate: Date) => void;
  isLoading: boolean;
  handleTaskToggle: (task: ITask) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const getCategoryData = (categoryValue: string) => {
    return (
      categories.find((cat) => cat.value === categoryValue) || categories[0]
    );
  };

  const getPriorityData = (priorityValue: string) => {
    return priorities.find((p) => p.value === priorityValue) || priorities[1];
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || task.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const completedTasks = filteredTasks.filter((task) => task.isCompleted);
  const incompleteTasks = filteredTasks.filter((task) => !task.isCompleted);

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Calendar & Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Select Date</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && dateChangeHandler(date)}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Search Tasks
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <Input
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Category
                </label>
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Today's Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-neutral-600">Completed</span>
                  <span className="font-medium">
                    {completedTasks.length}/{filteredTasks.length}
                  </span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div
                    className="gradient-success h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${
                        filteredTasks.length > 0
                          ? (completedTasks.length / filteredTasks.length) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tasks List */}
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  Tasks for {format(selectedDate, "EEEE, MMMM d, yyyy")}
                </span>
                <Badge variant="outline" className="ml-2">
                  {/*     {filteredTasks.length} tasks */}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-16 bg-neutral-200 rounded-lg"></div>
                    </div>
                  ))}
                </div>
              ) : filteredTasks.length === 0 ? (
                <div className="text-center py-12">
                  <Target className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-neutral-900 mb-2">
                    No tasks found
                  </h3>
                  <p className="text-neutral-500 mb-4">
                    {tasks.length === 0
                      ? "No tasks scheduled for this date."
                      : "No tasks match your current filters."}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {incompleteTasks.length > 0 && (
                    <div>
                      <h4 className="font-medium text-neutral-900 mb-3 flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        Pending Tasks ({incompleteTasks.length})
                      </h4>
                      <div className="space-y-3">
                        {incompleteTasks.map((task) => {
                          const categoryData = getCategoryData(task.category);
                          const priorityData = getPriorityData(task.priority);

                          return (
                            <div
                              key={task.id}
                              className="flex items-start space-x-4 p-4 bg-white rounded-lg border border-neutral-200 hover:border-neutral-300 transition-colors"
                            >
                              <div className="flex-shrink-0 mt-1">
                                <Checkbox
                                  checked={task.isCompleted}
                                  onCheckedChange={() => handleTaskToggle(task)}
                                  /*    disabled={updateTaskMutation.isPending} */
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h3 className="text-sm font-medium text-neutral-900">
                                      {task.title}
                                    </h3>
                                    <p className="text-sm text-neutral-600 mt-1">
                                      {task.description}
                                    </p>
                                  </div>
                                  <div className="flex items-center space-x-2 ml-4">
                                    <Badge
                                      variant="outline"
                                      className={priorityData.color}
                                    >
                                      {priorityData.label}
                                    </Badge>
                                    {task.startTime && (
                                      <Badge
                                        variant="outline"
                                        className="text-neutral-600"
                                      >
                                        <Clock className="h-3 w-3 mr-1" />
                                        {formatTimeTo12Hour(
                                          task.startTime
                                        )} - {formatTimeTo12Hour(task.endTime)}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center mt-3 space-x-4">
                                  <Badge
                                    variant="outline"
                                    className={`${categoryData.color} flex items-center space-x-1`}
                                  >
                                    {/* <CategoryIcon className="h-3 w-3" /> */}
                                    <span>{categoryData.label}</span>
                                  </Badge>
                                  {task.targetCount && (
                                    <span className="text-xs text-neutral-500">
                                      Target: {task.targetCount} | Progress:{" "}
                                      {task.currentProgress || 0}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {completedTasks.length > 0 && (
                    <div>
                      <h4 className="font-medium text-neutral-900 mb-3 flex items-center">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-secondary" />
                        Completed Tasks ({completedTasks.length})
                      </h4>
                      <div className="space-y-3">
                        {completedTasks.map((task) => {
                          return (
                            <div
                              key={task.id}
                              className="flex items-start space-x-4 p-4 bg-secondary/5 rounded-lg border border-secondary/20"
                            >
                              <div className="flex-shrink-0 mt-1">
                                <Checkbox
                                  checked={task.isCompleted}
                                  onCheckedChange={() => handleTaskToggle(task)}
                                  /*   disabled={updateTaskMutation.isPending} */
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h3 className="text-sm font-medium text-neutral-900 line-through">
                                      {task.title}
                                    </h3>
                                    <p className="text-sm text-neutral-600 mt-1 line-through">
                                      {task.description}
                                    </p>
                                  </div>
                                  {task.startTime && (
                                    <Badge
                                      variant="outline"
                                      className="text-neutral-500 ml-4"
                                    >
                                      <Clock className="h-3 w-3 mr-1" />
                                      {formatTimeTo12Hour(
                                        task.startTime
                                      )} - {formatTimeTo12Hour(task.endTime)}
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center mt-3 space-x-4">
                                  <Badge
                                    variant="outline"
                                    className="bg-secondary/10 text-secondary border-secondary/20 flex items-center space-x-1"
                                  >
                                    <CheckCircle2 className="h-3 w-3" />
                                    <span>Completed</span>
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
