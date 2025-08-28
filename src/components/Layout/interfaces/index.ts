import { ReactNode } from "react";

export interface IImageCatalogItem {
  image: IImage;
  principal?: boolean;
  uploading?: boolean;
}

export interface IImage {
  url: string;
  alt: string;
  s3Key?: string;
}

export interface IPrices {
  amount: number;
  currencyCode: string;
}

export interface INavItem {
  name: string;
  icon?: ReactNode;
  path?: string;
  extraData?: unknown;
  subItems?: INavItem[];
}
