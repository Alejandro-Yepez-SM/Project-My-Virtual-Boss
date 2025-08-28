import { gql } from "@apollo/client";

export const getGalleryContent = gql`
  query coll($tenant: TenantData!) {
    getGalleryContent(tenant: $tenant) {
      id
      filename
      description
      size
      type
      image {
        alt
        url
        s3Key
      }
      createdAt
      updatedAt
    }
  }
`;
