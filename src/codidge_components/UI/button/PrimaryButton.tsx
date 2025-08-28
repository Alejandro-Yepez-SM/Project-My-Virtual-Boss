import React from "react";
import { LoadingSpinner } from "../loading/loadingSpinner";

export enum ButtonSize {
  SMALL = "sm",
  MEDIUM = "md",
  LARGE = "lg",
}

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  size?: ButtonSize;
}

const sizeClasses = {
  [ButtonSize.SMALL]: "!px-3 !py-1 !text-sm",
  [ButtonSize.MEDIUM]: "!px-4 !py-2 !text-base",
  [ButtonSize.LARGE]: "!px-5 !py-3 !text-lg",
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  loading,
  size = ButtonSize.MEDIUM,
  ...props
}) => {
  const disabledAux = loading || props.disabled;
  const bgColor = disabledAux
    ? "bg-primary hover:bg-primary-300"
    : "bg-primary hover:bg-primary-600";

  return (
    <button
      {...props}
      disabled={disabledAux}
      className={`cursor-pointer min-w-24 flex items-center justify-center font-normal text-white rounded-lg ${bgColor} ${sizeClasses[size]} ${props.className}`}
    >
      {loading ? <LoadingSpinner /> : props.children}
    </button>
  );
};

export default PrimaryButton;
