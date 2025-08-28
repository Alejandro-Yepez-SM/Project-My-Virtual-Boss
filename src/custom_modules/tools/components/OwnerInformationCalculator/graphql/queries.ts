import { gql } from "@apollo/client";

export const getPropertyQuery = gql`
  query getProperyDetail($propertyId: String!, $needOwnerContact: Boolean) {
    getPropertyData(
      propertyId: $propertyId
      needOwnerContact: $needOwnerContact
    ) {
      vacant
      propertyType
      address {
        address
        label
        state
        zip
      }
      estimatedEquity
      estimatedValue
      mlsHistory {
        agentEmail
        agentName
        agentOffice
        agentPhone
        baths
        beds
        daysOnMarket
        lastStatusDate
        price
        propertyId
        seqNo
        status
        statusDate
        type
      }
      mortgageHistory {
        amount
        documentDate
        documentNumber
        granteeName
        lenderName
        lenderType
        mortgageIdcore
        open
        position
        propertyType
        term
        termType
      }
      ownerInfo {
        email {
          email
          emailType
        }
        phones {
          phone
          phoneDisplay
        }
        fullName
        mailAddress {
          address
          label
        }
      }
    }
  }
`;
