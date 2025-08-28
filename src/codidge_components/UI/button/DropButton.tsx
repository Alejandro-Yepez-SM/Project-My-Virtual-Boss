import { PlusCircleIcon } from "lucide-react";
import OutlineButton from "./OutlineButton";
import { useDropzone } from "react-dropzone";

export const DropButton = ({
  onDropImage,
}: {
  onDropImage: (acceptedFiles: File[]) => void;
}) => {
  const onDrop = (acceptedFiles: File[]) => {
    onDropImage(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/webp": [],
      "image/svg+xml": [],
    },
  });

  return (
    <OutlineButton
      type="button"
      {...getRootProps()}
      className={`h-full w-full rounded-xl bg-gray-50 ${
        isDragActive
          ? "!border-brand-500 bg-gray-100 dark:bg-gray-800"
          : "!border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
      }`}
    >
      <input {...getInputProps()} />
      <PlusCircleIcon />
    </OutlineButton>
  );
};
