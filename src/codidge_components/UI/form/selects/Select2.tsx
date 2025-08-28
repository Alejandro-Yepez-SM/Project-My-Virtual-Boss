import { ChevronDown } from "lucide-react";
import type React from "react";
import { ReactNode, useEffect, useRef, useState } from "react";
import { LoadingSpinner } from "../../loading/loadingSpinner";

export interface ISelectOption {
  value: any;
  valueToShow: ReactNode;
  available?: boolean;
}

interface SelectProps {
  label?: string;
  options: ISelectOption[];
  defaultSelected?: ISelectOption;
  onChange?: (selected: ISelectOption) => void;
  disabled?: boolean;
  loading?: boolean;
  classNameWrapper?: string;
  upPosition?: boolean;
  placeholder?: ReactNode; // <-- Add this
}

const Select2: React.FC<SelectProps> = ({
  label,
  options,
  defaultSelected,
  onChange,
  loading = false,
  disabled = false,
  classNameWrapper,
  placeholder = "",
  upPosition = false,
}) => {
  const [selectedOption, setSelectedOption] = useState<ISelectOption>(
    defaultSelected ?? {
      value: "",
      valueToShow: "",
      available: true,
    }
  );
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    if (!disabled) setIsOpen((prev) => !prev);
  };

  const handleSelect = (optionValue: ISelectOption) => {
    if (optionValue.available) {
      setSelectedOption(optionValue);
      setIsOpen(false);
      onChange?.(optionValue);
    }
  };

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

  useEffect(() => {
    setSelectedOption(defaultSelected ?? { value: "", valueToShow: "" });
  }, [defaultSelected]);

  const normalizedOptions = options.map((opt) => ({
    ...opt,
    available: opt.available !== false,
  }));

  return (
    <div className="w-full" ref={dropdownRef}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          {label}
        </label>
      )}

      <div className="relative inline-block w-full">
        <div className="relative flex flex-col items-center">
          <div onClick={toggleDropdown} className="w-full">
            {loading ? (
              <div className="min-w-20 flex justify-center py-1.5 pl-3 pr-3 rounded-lg border border-gray-300">
                <LoadingSpinner />
              </div>
            ) : (
              <div
                className={`flex h-10 rounded-lg border border-gray-300 py-1.5 pl-3 pr-3 shadow-theme-xs outline-hidden transition focus:border-brand-300 focus:shadow-focus-ring dark:border-gray-700 dark:bg-gray-900 dark:focus:border-brand-300 ${classNameWrapper}`}
              >
                <div className="flex flex-wrap items-center flex-auto gap-2">
                  {selectedOption.value !== "" ? (
                    selectedOption.valueToShow
                  ) : (
                    <span className="text-gray-400 text-sm">
                      {placeholder ?? "Select an option"}
                    </span>
                  )}
                </div>
                <div className="flex items-center py-1 pl-1 pr-1 w-7">
                  <button
                    type="button"
                    onClick={toggleDropdown}
                    className="w-5 h-5 text-gray-700 outline-hidden cursor-pointer focus:outline-hidden dark:text-gray-400"
                  >
                    <ChevronDown />
                  </button>
                </div>
              </div>
            )}
          </div>

          {isOpen && (
            <div
              className={`absolute left-0 z-40 w-full bg-white rounded-lg overflow-hidden max-h-select dark:bg-gray-900 shadow-theme-sm border border-gray-200 ${
                upPosition ? "bottom-full" : "top-full"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col ">
                {normalizedOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`hover:bg-gray-50 w-full cursor-pointer border border-b border-gray-100 ${
                      !option.available && "!bg-gray-200 !cursor-not-allowed"
                    }`}
                    onClick={() => handleSelect(option)}
                  >
                    <div
                      className={`relative flex w-full items-center p-2 pl-2 ${
                        selectedOption.value === option.value
                          ? "bg-primary/10"
                          : ""
                      }`}
                    >
                      <div className="mx-2 leading-6 text-gray-800 dark:text-white/90">
                        {option.valueToShow}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Select2;
