export interface AutoCompleteSearchResults {
  places: AutoCompletePlacesResult[];
}

export interface AutoCompletePlacesResult {
  displayName: string;
  address: string;
  placeId: string;
}
