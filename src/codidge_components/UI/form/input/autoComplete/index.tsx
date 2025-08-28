import React, { useEffect, useRef, useState } from "react";
import { InputCodidge } from "../InputField";

interface Option {
  value: string;
  valueToShow: React.ReactNode;
}

interface AutocompleteInputProps {
  options: Option[];
  onSelect: (value: string) => void;
  placeholder?: string;
  label?: string;
  defaultValue?: Option;
  required?: boolean;
}

export const AutoCompleteInput: React.FC<AutocompleteInputProps> = ({
  options,
  onSelect,
  label,
  placeholder = "Type to search...",
  defaultValue,
  required = false,
}) => {
  const [inputValue, setInputValue] = useState(defaultValue?.value ?? "");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isValidOption = (val: string) =>
    options.some((opt) => opt.value === val);

  const filtered = options.filter((opt) =>
    opt.value.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleSelect = (value: string) => {
    setInputValue(value);
    onSelect(value);
    setIsOpen(false);
  };

  // Close dropdown on outside click and validate input
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);

        // Validation
        if (!isValidOption(inputValue)) {
          if (required) {
            setInputValue("");
            onSelect("");
          }
        } else {
          onSelect(inputValue);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [inputValue, required]);

  return (
    <div ref={containerRef} className="relative w-full">
      <InputCodidge
        label={label}
        type="text"
        value={inputValue}
        placeholder={placeholder}
        onChange={(e) => {
          setInputValue(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
      />

      {isOpen && filtered.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {filtered.map((opt) => (
            <li
              key={opt.value}
              className="cursor-pointer px-3 py-2 hover:bg-gray-100 flex items-center gap-2"
              onClick={() => handleSelect(opt.value)}
            >
              {opt.valueToShow}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
