import { Button } from "@/components/ui/button";
import { MapPin, Search } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IOwnerAddress } from "../../interfaces";
import { PlacesAutoCompleteWidget } from "@/codidge_components/components/autoCompleteAddress";

type FormData = {
  addressInfo: any;
};

export const SearchOwnerBar = ({
  onSubmit,
  loading,
}: {
  onSubmit: (results: any) => void;
  loading: boolean;
}) => {
  const { control, handleSubmit } = useForm<FormData>();
  const [selectedPlace, setSelectedPlace] = useState<IOwnerAddress | null>();

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit(async () => await onSubmit(selectedPlace))}
    >
      <div>
        <Controller
          name="addressInfo"
          control={control}
          render={({ field }) => (
            <PlacesAutoCompleteWidget
              label={
                <div className="flex gap-2 mb-1">
                  <MapPin className="h-4 w-4" />
                  Property Address
                </div>
              }
              initialValue={field.value}
              onChange={(value) => {
                setSelectedPlace(value); // save full object locally
                field.onChange(value?.displayName || ""); // update form with string
              }}
              autoCompleteRestrictions={{}}
              placeholder="123 Main Street, City, State, ZIP"
            />
          )}
        />
        <p className="text-xs text-muted-foreground mt-1">
          Enter the complete property address for owner lookup
        </p>
      </div>
      <Button type="submit" disabled={loading} className="w-full" size="lg">
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Looking up owner information...
          </div>
        ) : (
          <>
            <Search className="h-4 w-4 mr-2" />
            Search Owner Information
          </>
        )}
      </Button>
    </form>
  );
};
