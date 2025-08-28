import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { Clock } from "lucide-react";
import { format } from "date-fns";
import PerformanceModal from "../../../components/PerformanceModal";
import { ITask } from "../interfaces";
import { formatTimeTo12Hour } from "@/utils/general";

export default function DailySchedule({
  isLoading,
  tasks,
  handleTaskToggle,
}: {
  isLoading: boolean;
  tasks: ITask[];
  handleTaskToggle: (task: ITask) => void;
}) {
  const [scheduleDate] = useState(new Date());
  const [showPerformanceModal, setShowPerformanceModal] = useState(false);

  const dateString = format(scheduleDate, "yyyy-MM-dd");
  const dayOfWeek = scheduleDate.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // Sunday = 0, Saturday = 6

  const currentTime = new Date().getHours() * 100 + new Date().getMinutes();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {isWeekend ? "Weekend" : "Daily"} Schedule -{" "}
            {format(scheduleDate, "EEEE, MMMM d, yyyy")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {isWeekend
              ? "Weekend focus: Open houses, showings, and networking events"
              : "Follow your proven success schedule with automatic reminders"}
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-neutral-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : (
          (tasks.length > 0 ? tasks : []).map((task: any, index: number) => {
            const [hoursStr, minutesStr] = task.scheduledTime.split(":");
            let hours = parseInt(hoursStr);
            const minutes = parseInt(minutesStr.split(" ")[0]);
            const isPM = task.scheduledTime.includes("PM");

            // Convert to 24-hour format
            if (isPM && hours !== 12) {
              hours += 12;
            } else if (!isPM && hours === 12) {
              hours = 0;
            }

            const taskTime = hours * 100 + minutes;
            const isCurrentTask =
              currentTime >= taskTime && currentTime < taskTime + 60;
            const isPastTask = currentTime > taskTime + 60;
            const IconComponent = task.icon || Clock;

            return (
              <Card
                key={task.id || index}
                className={`transition-all duration-200 ${
                  isCurrentTask
                    ? "ring-2 ring-primary bg-primary/5 dark:bg-primary/10"
                    : isPastTask && !task.isCompleted
                    ? "opacity-60 bg-red-50 dark:bg-red-900/10"
                    : task.isCompleted
                    ? "opacity-75 bg-green-50 dark:bg-green-900/10"
                    : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 flex-1">
                      {tasks.length > 0 && (
                        <Checkbox
                          checked={task.isCompleted}
                          onCheckedChange={() => handleTaskToggle(task)}
                          className="h-5 w-5"
                        />
                      )}

                      <div
                        className={`p-2 rounded-lg bg-primary/10 text-primary`}
                      >
                        <IconComponent className="h-5 w-5" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3
                            className={`font-semibold ${
                              task.isCompleted
                                ? "line-through text-gray-500"
                                : ""
                            }`}
                          >
                            {task.title}
                          </h3>
                          <Badge variant="outline" className="text-xs">
                            {formatTimeTo12Hour(task.scheduledTime)}
                          </Badge>
                          {task.targetCount && (
                            <Badge variant="secondary" className="text-xs">
                              Target: {task.targetCount}
                            </Badge>
                          )}
                        </div>
                        <p
                          className={`text-sm text-gray-600 dark:text-gray-400 ${
                            task.isCompleted ? "line-through" : ""
                          }`}
                        >
                          {task.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          task.priority === "high"
                            ? "destructive"
                            : task.priority === "medium"
                            ? "default"
                            : "secondary"
                        }
                        className="text-xs"
                      >
                        {task.priority}
                      </Badge>

                      {isCurrentTask && (
                        <Badge
                          variant="default"
                          className="animate-pulse bg-primary text-primary-foreground"
                        >
                          <Clock className="h-3 w-3 mr-1" />
                          Current
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          💡 Success Tips
        </h3>
        <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
          <li>• Follow this schedule consistently for maximum results</li>
          <li>• Complete high-priority tasks (FSBO & Expired calls) first</li>
          <li>• Track your actual numbers vs. targets each day</li>
          <li>• Use CRM to log all contacts and follow-ups immediately</li>
          <li>• Remember: Success requires discipline and consistency</li>
        </ul>
      </div>

      {/* Performance Tracking Modal */}
      <PerformanceModal
        isOpen={showPerformanceModal}
        onClose={() => setShowPerformanceModal(false)}
        date={dateString}
      />
    </div>
  );
}
