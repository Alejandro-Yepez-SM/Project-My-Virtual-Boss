import React from "react";
import Label from "../Label";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: boolean;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      placeholder = "Enter your message",
      rows = 3,
      value = "",
      onChange,
      className = "",
      disabled = false,
      error = false,
      hint = "",
      label = "",
      ...rest
    },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (onChange) {
        onChange(e);
      }
    };

    let textareaClasses = `w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden ${className} `;

    if (disabled) {
      textareaClasses += ` bg-gray-100 opacity-50 text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`;
    } else if (error) {
      textareaClasses += ` bg-transparent border-error-300 focus:border-error-300 focus:ring-3 focus:ring-error-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-error-800`;
    } else {
      textareaClasses += ` bg-transparent text-gray-900 dark:text-gray-300 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800`;
    }

    return (
      <div>
        {label && <Label>{label}</Label>}
        <div className="relative">
          <textarea
            placeholder={placeholder}
            rows={rows}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            className={textareaClasses}
            ref={ref}
            {...rest}
          />
          {hint && (
            <p
              className={`mt-2 text-sm ${
                error ? "text-error-500" : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {hint}
            </p>
          )}
        </div>
      </div>
    );
  }
);

TextArea.displayName = "TextArea"; // good practice when using forwardRef

export default TextArea;
