import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { PropertyFormValues } from "../../interfaces";

export const UnitDetails = () => {
  const { watch, register, control, setValue } =
    useFormContext<PropertyFormValues>();

  const numberUnits = parseInt(watch("numberOfUnits") || "0", 10);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "units",
  });

  useEffect(() => {
    const desiredLength = numberUnits;
    const currentLength = fields.length;

    if (desiredLength > currentLength) {
      // Append empty units until reaching desired length
      for (let i = currentLength; i < desiredLength; i++) {
        append({
          id: Date.now(),
          bedrooms: 0,
          bathrooms: 0,
          currentRent: 0,
          repairCosts: 0,
          potentialRent: 0,
          marketValue: 0,
        });
      }
    } else if (desiredLength < currentLength) {
      // Remove extra units
      for (let i = currentLength - 1; i >= desiredLength; i--) {
        remove(i);
      }
    }
  }, [numberUnits, fields.length, append, remove]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-3">
        <Building className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Unit Details</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-3 py-2 text-left">
                Unit #
              </th>
              <th className="border border-gray-300 px-3 py-2 text-left">
                Bed/Bath
              </th>
              <th className="border border-gray-300 px-3 py-2 text-left">
                Current Rent
              </th>
              <th className="border border-gray-300 px-3 py-2 text-left">
                Repair Costs
              </th>
              <th className="border border-gray-300 px-3 py-2 text-left">
                Potential/Market Value
              </th>
              <th className="border border-gray-300 px-3 py-2 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {fields.map(
              (field, index) =>
                index < numberUnits && (
                  <tr key={field.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-3 py-2 font-medium">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <div className="flex gap-1">
                        <Input
                          type="number"
                          placeholder="0"
                          className="w-16"
                          min="0"
                          max="10"
                          {...register(`units.${index}.bedrooms`, {
                            valueAsNumber: true,
                          })}
                        />
                        <span className="self-center text-xs text-gray-500">
                          bed
                        </span>
                        <Input
                          type="number"
                          placeholder="0"
                          className="w-16"
                          min="0"
                          max="10"
                          step="0.5"
                          {...register(`units.${index}.bathrooms`, {
                            valueAsNumber: true,
                          })}
                        />
                        <span className="self-center text-xs text-gray-500">
                          bath
                        </span>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                          $
                        </span>
                        <Input
                          type="number"
                          placeholder="0"
                          className="w-full pl-7 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          {...register(`units.${index}.currentRent`, {
                            valueAsNumber: true,
                          })}
                        />
                      </div>
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                          $
                        </span>
                        <Input
                          type="number"
                          placeholder="0"
                          className="w-full pl-7 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          {...register(`units.${index}.repairCosts`, {
                            valueAsNumber: true,
                          })}
                        />
                      </div>
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                          $
                        </span>
                        <Input
                          type="number"
                          placeholder="0"
                          className="w-full pl-7 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          {...register(`units.${index}.potentialRent`, {
                            valueAsNumber: true,
                          })}
                        />
                      </div>
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          remove(index);
                          setValue("numberOfUnits", String(numberUnits - 1));
                        }}
                        className="text-xs"
                      >
                        Clear Unit
                      </Button>
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <div>
          <Label htmlFor="otherIncome">Other Monthly Income</Label>
          <Input
            id="otherIncome"
            type="number"
            placeholder="0"
            className="max-w-xs"
            {...register("otherIncome")}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Laundry, parking, storage, etc.
          </p>
        </div>
      </div>
    </div>
  );
};
