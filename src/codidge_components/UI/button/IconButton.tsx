import React, { ReactNode } from "react";
import { LoadingSpinner } from "../loading/loadingSpinner";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  icon: ReactNode;
  variant?: "primary" | "secondary" | "danger";
}

const IconButton: React.FC<IconButtonProps> = ({
  loading,
  icon,
  variant = "secondary",
  ...props
}) => {
  const disabledAux = loading || props.disabled;

  const baseClasses = "cursor-pointer p-2 rounded-lg transition-colors";
  const variantClasses = {
    primary: "bg-brand-50 text-brand-700 hover:bg-brand-100",
    secondary: "bg-gray-100 text-gray-600 hover:bg-gray-200",
    danger: "bg-red-100 text-red-600 hover:bg-red-200",
  };

  return (
    <button
      {...props}
      disabled={disabledAux}
      className={`${baseClasses} ${variantClasses[variant]} ${props.className}`}
    >
      {loading ? <LoadingSpinner /> : icon}
    </button>
  );
};

export default IconButton;
