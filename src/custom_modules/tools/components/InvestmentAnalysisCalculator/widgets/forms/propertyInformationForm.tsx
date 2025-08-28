import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Home } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { PropertyFormValues } from "../../interfaces";

export const PropertyInformationForm = () => {
  const { register, control } = useFormContext<PropertyFormValues>();

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Home className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Property Information</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="propertyValue">Asking Price</Label>
          <Controller
            name="propertyValue"
            control={control}
            rules={{ required: "Home price is required" }}
            render={({ field }) => (
              <Input
                id="propertyValue"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="500000"
                value={field.value}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/[^0-9]/g, "");
                  field.onChange(numericValue);
                }}
              />
            )}
          />
        </div>
        <div>
          <Label htmlFor="downPayment">Down Payment</Label>
          <Input
            id="downPayment"
            type="number"
            placeholder="100000"
            {...register("downPayment", {
              required: "Down Payment is required",
            })}
          />
        </div>
        <div>
          <Label htmlFor="closingCosts">Closing Costs</Label>
          <Input
            id="closingCosts"
            type="number"
            placeholder="15000"
            {...register("closingCosts", {
              required: "Closing Costs is required",
            })}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Auto-calculated at 3% of asking price (editable)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="renovationCosts">Total Renovation Costs</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
              $
            </span>
            <Input
              id="renovationCosts"
              type="number"
              placeholder="0"
              className="pl-7 bg-gray-50 dark:bg-gray-900"
              readOnly
              {...register("renovationCosts", {
                required: "Renovation Costs is required",
              })}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Auto-calculated from unit repair costs + itemized renovation costs
          </p>
        </div>
        <div>
          <Label htmlFor="numberOfUnits">Number of Units (1-100)</Label>
          <Input
            id="numberOfUnits"
            type="number"
            min="1"
            max="100"
            placeholder="1"
            {...register("numberOfUnits", {
              required: "Number of Units is required",
            })}
          />
        </div>
      </div>
    </div>
  );
};
