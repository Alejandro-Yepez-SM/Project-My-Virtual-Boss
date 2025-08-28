import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Bell } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Icon } from "@radix-ui/react-select";

export const NotificationPopup = () => {
  const [notificationOpen, setNotificationOpen] = useState(false);

  // Get upcoming follow-ups and tasks for notifications
  /*   const { data: followUps = [] } = useQuery({
    queryKey: ["/api/contacts/follow-ups"],
    enabled: !!user,
  }); */
  /*  const today = new Date().toISOString().split('T')[0]; */

  /* const { data: todayTasks = [] } = useQuery({
    queryKey: ['/api/schedule', today],
    queryFn: () => fetch(`/api/schedule?date=${today}`).then(res => res.json()),
    enabled: !!user,
  }); */

  const notifications = [
    /*  ...followUps.slice(0, 3).map((followUp: any) => ({
      id: `followup-${followUp.id}`,
      type: 'follow-up',
      title: 'Follow-up Due',
      message: `Call ${followUp.firstName} ${followUp.lastName}`,
      time: followUp.nextFollowUpDate ? new Date(followUp.nextFollowUpDate).toLocaleDateString() : 'Today',
      icon: Phone,
      priority: 'high'
    })),
    ...todayTasks.filter((task: any) => !task.isCompleted).slice(0, 2).map((task: any) => ({
      id: `task-${task.id}`,
      type: 'task',
      title: 'Pending Task',
      message: task.title,
      time: task.scheduledTime,
      icon: Clock,
      priority: 'medium'
    })) */
  ].slice(0, 5);

  return (
    <Popover open={notificationOpen} onOpenChange={setNotificationOpen}>
      <div className="flex">
        <PopoverTrigger asChild>
          <button className="cursor-pointer relative p-2 text-neutral-400 hover:text-primary transition-colors">
            <Bell className="h-5 w-5" />
            {notifications.length > 0 && (
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-accent text-accent-foreground text-xs">
                {notifications.length}
              </Badge>
            )}
          </button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-80 p-0" align="end">
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Notifications</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {notifications.length === 0 ? (
              <div className="px-4 py-6 text-center text-neutral-500">
                <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No new notifications</p>
              </div>
            ) : (
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification) => {
                  /*      const Icon = notification.icon; */
                  return (
                    <div
                      /*   key={notification.id} */
                      className="flex items-start space-x-3 px-4 py-3 border-b border-neutral-100 hover:bg-neutral-50 cursor-pointer transition-colors"
                      onClick={() => {
                        /*    if (notification.type === "follow-up") {
                          setLocation("/crm");
                        } else if (notification.type === "task") {
                          setLocation("/tasks");
                        } */
                        setNotificationOpen(false);
                      }}
                    >
                      <div
                      /*    className={`p-2 rounded-full ${
                          notification.priority === "high"
                            ? "bg-red-100 text-red-600"
                            : "bg-blue-100 text-blue-600"
                        }`} */
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-neutral-900">
                          {/*  {notification.title} */}
                        </p>
                        <p className="text-sm text-neutral-600 truncate">
                          {/* {notification.message} */}
                        </p>
                        <p className="text-xs text-neutral-500 mt-1">
                          {/*  {notification.time} */}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
};
