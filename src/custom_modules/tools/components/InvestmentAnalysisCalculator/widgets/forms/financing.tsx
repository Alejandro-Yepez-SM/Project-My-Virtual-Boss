import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Percent } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { PropertyFormValues } from "../../interfaces";

export const Financing = () => {
  const { register } = useFormContext<PropertyFormValues>();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-3">
        <Percent className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Financing</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="loanAmount">Loan Amount</Label>
          <Input
            id="loanAmount"
            type="number"
            placeholder="400000"
            {...register("loanAmount", {
              valueAsNumber: true,
            })}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Auto-calculated from property value - down payment
          </p>
        </div>
        <div>
          <Label htmlFor="interestRate">Interest Rate (%)</Label>
          <Input
            id="interestRate"
            type="number"
            step="0.1"
            placeholder="7.5"
            {...register("interestRate", {
              valueAsNumber: true,
            })}
          />
        </div>
        <div>
          <Label htmlFor="loanTerm">Loan Term (years)</Label>
          <Input
            id="loanTerm"
            type="number"
            placeholder="30"
            {...register("loanTerm", {
              valueAsNumber: true,
            })}
          />
        </div>
      </div>
    </div>
  );
};
