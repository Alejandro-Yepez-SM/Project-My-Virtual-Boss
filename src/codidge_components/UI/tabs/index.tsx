import React, { ReactNode } from "react";
import clsx from "clsx";

export interface TabItem {
  name: string;
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
  tabClassName?: string;
}

interface TabsListProps {
  tabs: TabItem[];
}

export const TabsList: React.FC<TabsListProps> = ({ tabs }) => {
  return (
    <div className="text-sm font-medium text-center text-gray-500 dark:text-gray-400 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px">
        {tabs.map((tab, idx) => {
          const isDisabled = tab.disabled;
          const isActive = tab.active;

          const baseClasses =
            "inline-block p-4 rounded-t-lg border-b-2 transition-colors duration-200";
          const activeClasses = isActive
            ? "text-brand-900 border-brand-900"
            : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300";

          const disabledClasses =
            "text-gray-400 cursor-not-allowed dark:text-gray-500";

          const className = clsx(
            baseClasses,
            isDisabled ? disabledClasses : activeClasses
          );

          const content = <span className={className}>{tab.name}</span>;

          return (
            <li key={idx} className="me-2">
              {isDisabled ? (
                content
              ) : tab.href ? (
                <a
                  href={tab.href}
                  className={`${className} ${tab.tabClassName}`}
                  onClick={tab.onClick}
                >
                  {tab.icon && tab.icon}
                  {tab.name}
                </a>
              ) : (
                <button
                  type="button"
                  onClick={tab.onClick}
                  className={`${className} ${tab.tabClassName}`}
                >
                  {tab.icon && tab.icon}
                  {tab.name}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
