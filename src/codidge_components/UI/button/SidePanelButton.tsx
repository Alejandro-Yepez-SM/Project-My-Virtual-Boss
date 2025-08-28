import clsx from "clsx";
import { ReactNode } from "react";
import { useNavigate } from "react-router";

export const SidePanelButton = ({
  path,
  isActive,
  icon,
  label,
}: {
  path: string;
  isActive: boolean;
  icon: ReactNode;
  label: string;
}) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        navigate(path);
      }}
      className={clsx(
        "w-full border-none cursor-pointer flex items-center space-x-3 px-4 py-3 text-left transition-colors hover: ",
        isActive ? "border text-primary" : "text-gray-500 hover:text-primary"
      )}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};
