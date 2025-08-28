import { IImage } from "../../../interfaces";

export interface IGalleryItem {
  _id: string;
  size: number;
  description: string;
  filename: string;
  type: MediaType;
  image: IImage;
  createdAt: Date;
  updatedAt: Date;
}

export enum GallerySelection {
  singleSelection,
  multipleSelection,
}

export enum MediaType {
  IMAGE = "image",
  VIDEO = "video",
  FILE = "file",
}

export interface IGalleryProps {
  selection?: GallerySelection;
  showBottomPanel?: boolean;
  onCloseModal?: () => void;
  onSubmit?: (selected: IImage[]) => void;
  allowDeletion?: boolean;
}

export interface IPreviewModalProps {
  media: IGalleryItem;
}
