import React from "react";
import Checkbox from "../../../../codidge/UI/form/input/Checkbox";

interface BusinessHour {
  day: string;
  open: string;
  close: string;
  isClosed: boolean;
}

interface Props {
  value: BusinessHour[];
  onChange: (val: BusinessHour[]) => void;
}

const BusinessHoursEditor: React.FC<Props> = ({ value, onChange }) => {
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

  const timeOptions = Array.from({ length: 24 * 2 }, (_, i) => {
    const hour = Math.floor(i / 2)
      .toString()
      .padStart(2, "0");
    const min = i % 2 === 0 ? "00" : "30";
    const value = `${hour}:${min}`;
    const label = new Date(`2000-01-01T${value}`).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
    return { value, label };
  });

  const updateHour = (index: number, key: keyof BusinessHour, val: any) => {
    const updated = [...value];
    updated[index] = { ...updated[index], [key]: val };
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {value.map((hour, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg border transition-all ${
            hour.day.toLowerCase() === currentDay
              ? "border-blue-200 bg-blue-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span
                className={`font-medium capitalize ${
                  hour.day.toLowerCase() === currentDay
                    ? "text-blue-700"
                    : "text-gray-700"
                }`}
              >
                {hour.day}
              </span>
              {hour.day.toLowerCase() === currentDay && (
                <span className="text-xs font-normal text-blue-600 bg-blue-100 px-2 py-1 rounded">
                  Today
                </span>
              )}
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                className="bg-white border-gray-600"
                checked={hour.isClosed}
                onChange={(e) =>
                  updateHour(index, "isClosed", e.target.checked)
                }
              />
              <span className="text-sm text-gray-600">Closed</span>
            </label>
          </div>

          {!hour.isClosed && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Open Time
                </label>
                <select
                  value={hour.open}
                  onChange={(e) => updateHour(index, "open", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  {timeOptions.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Close Time
                </label>
                <select
                  value={hour.close}
                  onChange={(e) => updateHour(index, "close", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  {timeOptions.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BusinessHoursEditor;
