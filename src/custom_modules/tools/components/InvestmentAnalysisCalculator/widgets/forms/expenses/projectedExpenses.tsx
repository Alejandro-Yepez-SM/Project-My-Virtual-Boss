import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import { PropertyFormValues } from "../../../interfaces";

export const ProjectedExpenses = () => {
  const { register } = useFormContext<PropertyFormValues>();

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-green-700 bg-green-50 px-3 py-2 rounded">
        Projected Expenses
      </h4>

      <div className="space-y-3">
        <div>
          <Label htmlFor="projectedInsurance">Insurance</Label>
          <Input
            id="projectedInsurance"
            type="number"
            placeholder="250"
            {...register("projectedInsurance", {
              valueAsNumber: true,
            })}
          />
        </div>
        <div>
          <Label htmlFor="projectedPropertyTaxes">Property Taxes</Label>
          <Input
            id="projectedPropertyTaxes"
            type="number"
            placeholder="500"
            {...register("projectedPropertyTaxes", {
              valueAsNumber: true,
            })}
          />
        </div>
        <div>
          <Label htmlFor="projectedMaintenance">Maintenance & Repairs</Label>
          <Input
            id="projectedMaintenance"
            type="number"
            placeholder="400"
            {...register("projectedMaintenance", {
              valueAsNumber: true,
            })}
          />
        </div>
        <div>
          <Label htmlFor="projectedManagementPercent">
            Management (% of income)
          </Label>
          <Input
            id="projectedManagementPercent"
            type="number"
            step="0.1"
            placeholder="8"
            {...register("projectedManagementPercent", {
              valueAsNumber: true,
            })}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Typical range: 6-12%
          </p>
        </div>
        <div>
          <Label htmlFor="projectedVacancy">Vacancy Rate (%)</Label>
          <Input
            id="projectedVacancy"
            type="number"
            step="0.1"
            placeholder="3"
            {...register("projectedVacancy", {
              valueAsNumber: true,
            })}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Typical range: 3-8%
          </p>
        </div>
        <div>
          <Label htmlFor="projectedOtherExpenses">Other Expenses</Label>
          <Input
            id="projectedOtherExpenses"
            type="number"
            placeholder="150"
            {...register("projectedOtherExpenses", {
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
