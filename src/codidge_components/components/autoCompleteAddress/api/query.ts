import { gql } from "@apollo/client";

export const getSearchAutoCompleteQuery = gql`
  query AutocompleteSearch($input: String!) {
    autoCompleteSearch(input: $input) {
      places {
        placeId
        displayName
        address
      }
    }
  }
`;
