import React, { ReactNode, useId, useRef, useEffect } from "react";

interface TooltipWrapperProps {
  children: ReactNode;
  tooltip: string | ReactNode;
  tooltipStyle?: "light" | "dark";
  positionClass?: string;
}

export const TooltipWrapper: React.FC<TooltipWrapperProps> = ({
  children,
  tooltip,
  tooltipStyle = "light",
  positionClass = "-top-10 left-1/2 -translate-x-1/2",
}) => {
  const id = useId();
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    const tooltip = tooltipRef.current;
    if (!trigger || !tooltip) return;

    const show = () => {
      tooltip.classList.remove("invisible", "opacity-0");
    };
    const hide = () => {
      tooltip.classList.add("invisible", "opacity-0");
    };

    trigger.addEventListener("mouseenter", show);
    trigger.addEventListener("mouseleave", hide);

    return () => {
      trigger.removeEventListener("mouseenter", show);
      trigger.removeEventListener("mouseleave", hide);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={triggerRef}>
      {children}
      <div
        id={`tooltip-${id}`}
        role="tooltip"
        ref={tooltipRef}
        className={`absolute z-20 invisible opacity-0 transition-opacity duration-200 px-3 py-2 text-sm font-medium ${
          tooltipStyle === "light"
            ? "text-gray-900 bg-white border border-gray-200"
            : "text-white bg-gray-900"
        } rounded-lg shadow-md tooltip whitespace-nowrap ${positionClass}`}
      >
        {tooltip}
        <div className="tooltip-arrow" data-popper-arrow />
      </div>
    </div>
  );
};
