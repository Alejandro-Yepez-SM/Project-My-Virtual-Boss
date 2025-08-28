import type React from "react";
import { ReactNode, useState } from "react";
import Checkbox from "../input/Checkbox";

interface Option {
  value: string;
  text: string;
  checked: boolean;
}

interface MultiSelectProps {
  label: ReactNode;
  options: Option[];
  defaultSelected?: string[];
  onChange?: (selected: string[]) => void;
  disabled?: boolean;
}

const CheckBoxMultiSelect: React.FC<MultiSelectProps> = ({
  label,
  options,
  defaultSelected = [],
  onChange,
  disabled = false,
}) => {
  const [selectedOptions, setSelectedOptions] =
    useState<string[]>(defaultSelected);
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <div className="w-full">
      <div className="relative z-20 inline-block w-full">
        <div className="relative flex flex-col items-center">
          <div onClick={toggleDropdown} className="w-full cursor-pointer">
            <div className="h-11 flex items-center rounded-lg border border-gray-300 py-1.5 pl-3 pr-3 shadow-theme-xs transition focus-within:border-brand-300 focus-within:shadow-focus-ring dark:border-gray-700 dark:bg-gray-900 dark:focus-within:border-brand-300">
              {label}
            </div>
          </div>

          {isOpen && (
            <div
              className="absolute top-12 right-0 z-40 w-max rounded-lg bg-white shadow-sm border border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col w-fit">
                {options.map((option) => {
                  const isSelected = selectedOptions.includes(option.value);
                  return (
                    <div className="p-2" key={option.value}>
                      <Checkbox
                        onChange={() => {
                          handleSelect(option.value);
                        }}
                        label={option.text}
                        checked={isSelected}
                      />
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

export default CheckBoxMultiSelect;
