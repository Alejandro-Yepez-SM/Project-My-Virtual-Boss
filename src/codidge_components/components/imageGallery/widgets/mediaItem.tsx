import { IGalleryItem } from "../interfaces";

export const MediaItem = ({ item }: { item: IGalleryItem }) => {
  if (item.type === "video") {
    return (
      <video
        src={item.image.url}
        className="h-full w-full object-cover pointer-events-none"
        preload="metadata"
        muted
      />
    );
  }

  if (item.type === "file") {
    return (
      <div className="flex flex-col justify-center items-center h-full text-gray-500 gap-2 p-4 bg-gray-50 dark:bg-gray-800">
        <div className="text-4xl">📄</div>
        <p className="text-xs text-center break-words px-2 line-clamp-2">
          {item.image.alt ?? "Untitled Document"}
        </p>
      </div>
    );
  }

  // Default: image
  return (
    <img
      src={item.image.url}
      alt={item.image.alt}
      className="h-full w-full object-contain rounded-xl pointer-events-none"
    />
  );
};
