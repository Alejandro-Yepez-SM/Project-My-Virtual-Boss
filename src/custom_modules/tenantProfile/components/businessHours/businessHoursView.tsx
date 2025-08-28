import React from "react";

interface BusinessHour {
  day: string;
  open: string;
  close: string;
  isClosed?: boolean;
}

interface BusinessHoursProps {
  hours: BusinessHour[];
  className?: string;
}

const BusinessHoursView: React.FC<BusinessHoursProps> = ({ hours }) => {
  const getCurrentDay = () => {
    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    return days[new Date().getDay()];
  };

  const currentDay = getCurrentDay();
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();

  const isCurrentlyOpen = () => {
    const todayHours = hours.find((h) => h.day.toLowerCase() === currentDay);
    if (!todayHours || todayHours.isClosed) return false;

    const [openHour, openMinute] = todayHours.open.split(":").map(Number);
    const [closeHour, closeMinute] = todayHours.close.split(":").map(Number);

    const currentTotalMinutes = currentHour * 60 + currentMinute;
    const openTotalMinutes = openHour * 60 + openMinute;
    const closeTotalMinutes = closeHour * 60 + closeMinute;

    return (
      currentTotalMinutes >= openTotalMinutes &&
      currentTotalMinutes < closeTotalMinutes
    );
  };

  const formatTime = (time: string) => {
    const [hour, minute] = time.split(":");
    const h = parseInt(hour);
    const ampm = h >= 12 ? "PM" : "AM";
    const displayHour = h % 12 || 12;
    return `${displayHour}:${minute} ${ampm}`;
  };

  return (
    <div>
      <div className="space-y-3">
        {hours.map((hour) => (
          <div
            key={hour.day}
            className={`flex justify-between items-center py-2 px-3 rounded-md transition-colors ${
              hour.day.toLowerCase() === currentDay
                ? "bg-blue-50 border border-blue-200"
                : "hover:bg-gray-50"
            }`}
          >
            <span
              className={`font-medium capitalize ${
                hour.day.toLowerCase() === currentDay
                  ? "text-blue-700"
                  : "text-gray-700"
              }`}
            >
              {hour.day}
              {hour.day.toLowerCase() === currentDay && (
                <span className="ml-2 text-xs font-normal text-blue-600">
                  Today
                </span>
              )}
            </span>
            <span
              className={`text-sm ${
                hour.isClosed
                  ? "text-red-500 font-medium"
                  : hour.day.toLowerCase() === currentDay
                  ? "text-blue-700 font-medium"
                  : "text-gray-600"
              }`}
            >
              {hour.isClosed
                ? "Closed"
                : `${formatTime(hour.open)} - ${formatTime(hour.close)}`}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              isCurrentlyOpen() ? "bg-green-400" : "bg-red-400"
            }`}
          />
          <span className="text-sm font-medium text-gray-700">
            Currently {isCurrentlyOpen() ? "Open" : "Closed"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BusinessHoursView;
