import { IGalleryItem, MediaType } from "../interfaces";

export const getMediaType = (file: File): MediaType => {
  if (file.type.startsWith("image/")) {
    return MediaType.IMAGE;
  } else if (file.type.startsWith("video/")) {
    return MediaType.VIDEO;
  } else {
    return MediaType.FILE;
  }
};

export const filterGalleryByTabSelection = (
  gallery: IGalleryItem[],
  type: MediaType
) => {
  return gallery.filter((gal) => {
    if (!gal.type) {
      return type === MediaType.IMAGE;
    } else {
      return gal.type === type;
    }
  });
};
