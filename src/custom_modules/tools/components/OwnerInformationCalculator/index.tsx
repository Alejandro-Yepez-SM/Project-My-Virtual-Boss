import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";

import { SearchOwnerBar } from "./widgets/forms/searchBar";
import { useLazyQuery } from "@apollo/client";
import { getPropertyQuery } from "./graphql/queries";
import { IOwnerAddress, IProperty } from "./interfaces";
import { OwnerResults } from "./widgets/results";

export default function OwnerInformationCalculator() {
  const [showResults, setShowResults] = useState(false);

  const [getPropertyDetailsFn, { data, loading }] = useLazyQuery<{
    getPropertyData: IProperty;
  }>(getPropertyQuery);

  const handleSearch = async (address: IOwnerAddress) => {
    if (!address.id) {
      return;
    }

    await getPropertyDetailsFn({
      variables: {
        propertyId: address.id,
        needOwnerContact: true,
      },
    });

    setShowResults(true);
  };

  const ownerData = data?.getPropertyData.ownerInfo;
  const propertyResuls = data?.getPropertyData;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-6 w-6 text-primary" />
            Owner Information Lookup
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Get detailed owner contact information for abandoned houses, vacant
            properties, and FSBO listings
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {!showResults ? (
            <>
              {/* Search Form */}
              <div className="space-y-4">
                <SearchOwnerBar
                  onSubmit={async (results) => {
                    await handleSearch(results);
                  }}
                  loading={loading}
                />
              </div>
            </>
          ) : (
            ownerData &&
            propertyResuls && (
              <OwnerResults
                ownerInfo={ownerData}
                propertyResuls={propertyResuls}
                setShowResults={setShowResults}
              />
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
}
