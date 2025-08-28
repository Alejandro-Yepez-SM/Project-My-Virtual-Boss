import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "relative space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        month_caption: "flex justify-center",
        caption_label: "text-sm mx-auto font-medium",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-xs p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: "h-9 w-9 p-0 font-normal text-xs aria-selected:opacity-100 text-center",
        day_range_end: "day-range-end",
        selected:
          "rounded-lg bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        today: "rounded-lg bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        Nav: CustomNav,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };

const CustomNav = ({
  previousMonth,
  nextMonth,
  onPreviousClick,
  onNextClick,
}: any) => {
  return (
    <div className="flex justify-between w-full absolute top-0 px-0">
      <button
        type="button"
        onClick={onPreviousClick}
        disabled={!previousMonth}
        aria-label="Go to previous month"
        className="cursor-pointer h-6 w-6 flex items-center justify-center rounded-lg bg-muted text-muted-foreground hover:bg-accent hover:text-white disabled:opacity-50 transition"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={onNextClick}
        disabled={!nextMonth}
        aria-label="Go to next month"
        className="cursor-pointer h-6 w-6 flex items-center justify-center rounded-lg bg-muted text-muted-foreground hover:bg-accent hover:text-white disabled:opacity-50 transition"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};
