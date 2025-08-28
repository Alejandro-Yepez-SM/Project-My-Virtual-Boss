import { Button } from "@/components/ui/button";
import { Home, Plus, Trash2 } from "lucide-react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { PropertyFormValues, RenovationItem } from "../../interfaces";
import { renovationCategories } from "../..";
import { getTotalRenovationCost } from "../../helpers";

export const ItemizedRenovationCost = () => {
  const { watch, setValue, register, control } =
    useFormContext<PropertyFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "renovationItems",
  });

  const nextRenovationId = watch("nextRenovationId"); // Optional

  const addRenovationItem = () => {
    append({
      id: nextRenovationId,
      category: "",
      cost: 0,
    });

    // Optional: If you want to increment some ID
    setValue("nextRenovationId", nextRenovationId + 1);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Home className="h-5 w-5 text-green-600" />
          <h4 className="text-base font-semibold">Itemized Renovation Costs</h4>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addRenovationItem}
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4" />
          Add Item
        </Button>
      </div>

      {fields.length > 0 && (
        <div className="space-y-3">
          {fields.map((item: RenovationItem, index: number) => (
            <div key={item.id} className="flex gap-3 items-end">
              <div className="flex-1">
                <Label htmlFor={`category-${item.id}`}>Category</Label>
                <Controller
                  control={control}
                  name={`renovationItems.${index}.category`}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {renovationCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="flex-1">
                <Label htmlFor={`cost-${item.id}`}>Cost</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                    $
                  </span>
                  <Input
                    id={`cost-${item.id}`}
                    type="number"
                    value={item.cost || ""}
                    className="pl-7 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="0"
                    min="0"
                    {...register(`renovationItems.${index}.cost`, {
                      valueAsNumber: true,
                    })}
                  />
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => remove(index)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <div className="flex justify-end pt-2">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">
                Total Itemized Costs:
              </p>
              <p className="text-lg font-semibold text-green-600">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                }).format(getTotalRenovationCost(fields))}
              </p>
            </div>
          </div>
        </div>
      )}

      {fields.length === 0 && (
        <div className="text-center py-6 border-2 border-dashed border-gray-300 rounded-lg">
          <Home className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">No renovation items added yet</p>
          <p className="text-sm text-gray-400">
            Click "Add Item" to start itemizing your renovation costs
          </p>
        </div>
      )}
    </div>
  );
};
