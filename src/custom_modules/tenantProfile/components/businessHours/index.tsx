import { useState } from "react";
import { Clock } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import BusinessHoursEditor from "./businessHoursEdition";
import BusinessHoursView from "./businessHoursView";
import ComponentCard from "../../../../codidge/components/ComponentCard";
import OutlineButton from "../../../../codidge/UI/button/OutlineButton";

export const BusinessHours = () => {
  const [businessHoursEdition, setBusinessHoursEdition] =
    useState<boolean>(false);

  const { control } = useFormContext();

  return (
    <ComponentCard
      title="Business Hours"
      rightWidget={
        <OutlineButton
          type="button"
          onClick={() => {
            setBusinessHoursEdition((prev) => !prev);
          }}
        >
          <Clock className="mr-2" />
          {businessHoursEdition ? "View Hours" : "Edit Hours"}
        </OutlineButton>
      }
    >
      <Controller
        name="businessHours"
        control={control}
        render={({ field }) => (
          <div>
            {businessHoursEdition ? (
              <BusinessHoursEditor {...field} />
            ) : (
              <BusinessHoursView hours={field.value} />
            )}
          </div>
        )}
      />
    </ComponentCard>
  );
};
