import { gql } from "@apollo/client";

export const insertGalleryItem = gql`
  mutation insertGalleryItem($data: [GalleryItemInput]!, $tenant: TenantData!) {
    insertGalleryContent(data: $data, tenant: $tenant) {
      id
      image {
        alt
        url
        s3Key
      }
      filename
      description
      size
      type
    }
  }
`;

export const updateGalleryItem = gql`
  mutation updateGalleryItem(
    $data: GalleryItemUpdateInput!
    $galleryItemId: ID!
    $tenant: TenantData!
  ) {
    updateGalleryItem(
      data: $data
      galleryItemId: $galleryItemId
      tenant: $tenant
    ) {
      id
      image {
        alt
        url
        s3Key
      }
      filename
      description
      size
      type
    }
  }
`;

export const getImagesUploadUrl = gql`
  mutation getImagesUploadUrl(
    $tenant: TenantData!
    $imgInput: UploadUrlImageInput!
  ) {
    getImagesUploadUrl(tenant: $tenant, imgInput: $imgInput) {
      uploadUrl
      fileUrl
    }
  }
`;

export const deleteImages = gql`
  mutation DeleteImages($tenant: TenantData!, $s3Keys: [String!]!) {
    deleteGalleryContent(tenant: $tenant, s3Keys: $s3Keys)
  }
`;
