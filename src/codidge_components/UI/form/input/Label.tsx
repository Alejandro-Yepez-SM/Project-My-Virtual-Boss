import { FC, ReactNode } from "react";

interface LabelProps {
  htmlFor?: string;
  children: ReactNode;
  className?: string;
}

const Label: FC<LabelProps> = ({ htmlFor, children, className }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`mb-1.5 block text-xs md:text-sm font-medium text-gray-300 dark:text-gray-400 ${className}`}
    >
      {children}
    </label>
  );
};

export default Label;
