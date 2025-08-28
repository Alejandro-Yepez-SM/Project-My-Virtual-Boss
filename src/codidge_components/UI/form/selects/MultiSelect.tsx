import { Check } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

interface Option {
  value: string;
  text: string;
}

interface MultiSelectProps {
  label: string;
  options: Option[];
  defaultSelected?: string[];
  onChange?: (selected: string[]) => void;
  disabled?: boolean;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  options,
  defaultSelected = [],
  onChange,
  disabled = false,
}) => {
  const [selectedOptions, setSelectedOptions] =
    useState<string[]>(defaultSelected);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    if (!disabled) setIsOpen((prev) => !prev);
  };

  const handleSelect = (optionValue: string) => {
    const newSelectedOptions = selectedOptions.includes(optionValue)
      ? selectedOptions.filter((value) => value !== optionValue)
      : [...selectedOptions, optionValue];

    setSelectedOptions(newSelectedOptions);
    onChange?.(newSelectedOptions);
  };

  const selectedValuesText = selectedOptions
    .map((value) => options.find((option) => option.value === value)?.text)
    .filter(Boolean)
    .join(", ");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="w-full" ref={dropdownRef}>
      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
        {label}
      </label>

      <div className="relative z-20 inline-block w-full">
        <div className="relative flex flex-col items-center">
          <div onClick={toggleDropdown} className="w-full cursor-pointer">
            <div className="mb-2 flex h-11 items-center rounded-lg border border-gray-300 py-1.5 pl-3 pr-3 shadow-theme-xs transition focus-within:border-brand-300 focus-within:shadow-focus-ring dark:border-gray-700 dark:bg-gray-900 dark:focus-within:border-brand-300">
              <div className="flex-auto text-sm text-gray-800 dark:text-white/90 truncate">
                {selectedValuesText || (
                  <span className="text-gray-400 dark:text-white/50">
                    Select options
                  </span>
                )}
              </div>
              <div className="flex items-center pl-2">
                <svg
                  className={`stroke-current w-5 h-5 text-gray-700 dark:text-gray-400 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.79175 7.39551L10.0001 12.6038L15.2084 7.39551"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {isOpen && (
            <div
              className="absolute left-0 z-40 w-full overflow-y-auto rounded-lg bg-white shadow-sm top-12 max-h-select dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col">
                {options.map((option) => {
                  const isSelected = selectedOptions.includes(option.value);
                  return (
                    <div
                      key={option.value}
                      className={
                        "flex hover:bg-gray-200 justify-between items-center cursor-pointer px-4 py-2 text-sm"
                      }
                      onClick={() => handleSelect(option.value)}
                    >
                      {option.text}
                      {isSelected && (
                        <Check className="text-brand-500" size={16} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiSelect;
