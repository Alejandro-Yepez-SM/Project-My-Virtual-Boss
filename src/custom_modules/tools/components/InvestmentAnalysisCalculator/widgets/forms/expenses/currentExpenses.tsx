import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PropertyFormValues } from "../../../interfaces";
import { useFormContext } from "react-hook-form";

export const CurrentExpenses = () => {
  const { register } = useFormContext<PropertyFormValues>();

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-orange-700 bg-orange-50 px-3 py-2 rounded">
        Current Expenses
      </h4>

      <div className="space-y-3">
        <div>
          <Label htmlFor="currentInsurance">Insurance</Label>
          <Input
            id="currentInsurance"
            type="number"
            placeholder="200"
            {...register("currentInsurance", {
              valueAsNumber: true,
            })}
          />
        </div>
        <div>
          <Label htmlFor="currentPropertyTaxes">Property Taxes</Label>
          <Input
            id="currentPropertyTaxes"
            type="number"
            placeholder="400"
            {...register("currentPropertyTaxes", {
              valueAsNumber: true,
            })}
          />
        </div>
        <div>
          <Label htmlFor="currentMaintenance">Maintenance & Repairs</Label>
          <Input
            id="currentMaintenance"
            type="number"
            placeholder="300"
            {...register("currentMaintenance", {
              valueAsNumber: true,
            })}
          />
        </div>
        <div>
          <Label htmlFor="currentManagementPercent">
            Management (% of income)
          </Label>
          <Input
            id="currentManagementPercent"
            type="number"
            step="0.1"
            placeholder="8"
            {...register("currentManagementPercent", {
              valueAsNumber: true,
            })}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Typical range: 6-12%
          </p>
        </div>
        <div>
          <Label htmlFor="currentVacancy">Vacancy Rate (%)</Label>
          <Input
            id="currentVacancy"
            type="number"
            step="0.1"
            placeholder="5"
            {...register("currentVacancy", {
              valueAsNumber: true,
            })}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Typical range: 3-8%
          </p>
        </div>
        <div>
          <Label htmlFor="currentOtherExpenses">Other Expenses</Label>
          <Input
            id="currentOtherExpenses"
            type="number"
            placeholder="100"
            {...register("currentOtherExpenses", {
              valueAsNumber: true,
            })}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Legal, accounting, etc.
          </p>
        </div>
      </div>
    </div>
  );
};
