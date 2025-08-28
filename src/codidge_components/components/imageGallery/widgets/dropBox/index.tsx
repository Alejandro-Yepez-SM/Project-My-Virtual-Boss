import { useDropzone } from "react-dropzone";
import React from "react";
import { toast } from "react-toastify";

export enum MediaType {
  IMAGE = "image",
  VIDEO = "video",
  FILE = "file",
}

interface DropBoxProps {
  onDropImage: (acceptedFiles: File[]) => void;
  children: React.ReactNode;
  className?: string;
  multiple?: boolean;
  maxSizeMB?: number; // default to 10 MB
}

const ACCEPTED_MIME_TYPES: Record<string, MediaType> = {
  "image/jpeg": MediaType.IMAGE,
  "image/png": MediaType.IMAGE,
  "image/webp": MediaType.IMAGE,
  "image/svg+xml": MediaType.IMAGE,
  "video/mp4": MediaType.VIDEO,
  "video/webm": MediaType.VIDEO,
  "application/pdf": MediaType.FILE,
  "application/msword": MediaType.FILE,
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    MediaType.FILE,
};

export const DropBox = ({
  onDropImage,
  children,
  className = "",
  multiple = true,
  maxSizeMB = 10,
}: DropBoxProps) => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const acceptObject = Object.keys(ACCEPTED_MIME_TYPES).reduce((acc, type) => {
    acc[type] = [];
    return acc;
  }, {} as Record<string, string[]>);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple,
    accept: acceptObject,
    onDrop: (files) => {
      const validFiles: File[] = [];

      files.forEach((file) => {
        const isAccepted = file.type in ACCEPTED_MIME_TYPES;
        const isSizeOk = file.size <= maxSizeBytes;

        if (!isAccepted) {
          toast.error(`Unsupported file type: ${file.name}`);
        } else if (!isSizeOk) {
          toast.error(`${file.name} is too large. Max size is ${maxSizeMB}MB.`);
        } else {
          validFiles.push(file);
        }
      });

      if (validFiles.length > 0) {
        onDropImage(validFiles);
      }
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`cursor-pointer ${
        isDragActive ? "ring-2 ring-brand-500" : "border-gray-300"
      } ${className}`}
    >
      <input {...getInputProps()} />
      {children}
    </div>
  );
};
