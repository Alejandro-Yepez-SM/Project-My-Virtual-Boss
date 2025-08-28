import { CalculationResult, PrequalificationFormValues } from "../interfaces";
import { Label } from "@radix-ui/react-label";
import {
  AlertCircle,
  Building,
  CreditCard,
  DollarSign,
  FileText,
  Home,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useFormContext } from "react-hook-form";
import { calculatePrequalification } from "../helpers";

export const PrequalificationForm = ({
  setResults,
  setShowResults,
}: {
  setResults: (res: CalculationResult[]) => void;
  setShowResults: (res: boolean) => void;
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useFormContext<PrequalificationFormValues>(); // retrieve a

  const onSubmit = async ({
    monthlyIncome,
    monthlyDebts,
    downPaymentAmount,
    interestRate,
    propertyTaxRate,
    insuranceRate,
    hoaFees,
    closingCostPercentage,
  }: PrequalificationFormValues) => {
    const res = calculatePrequalification({
      monthlyIncome,
      monthlyDebts,
      downPaymentAmount,
      interestRate,
      propertyTaxRate,
      insuranceRate,
      hoaFees,
      closingCostPercentage,
    });
    if (res) {
      setResults(res);
    }

    setShowResults(true);
  };

  return (
    <>
      {/* Input Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="income" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Monthly Gross Income
            </Label>
            <Input
              id="income"
              type="number"
              placeholder="5,000"
              className="mt-1"
              {...register("monthlyIncome", {
                required: "Monthly income is required",
              })}
            />
            {errors.monthlyIncome ? (
              <p className="text-xs text-red-500 mt-1">
                {errors.monthlyIncome.message?.toString()}
              </p>
            ) : (
              <p className="text-xs text-muted-foreground mt-1">
                Enter your client's total monthly income before taxes
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="debts" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Monthly Long-Term Obligations (LTO)
            </Label>
            <Input
              id="debts"
              type="number"
              placeholder="800"
              className="mt-1"
              {...register("monthlyDebts", {
                required: "Monthly debts are required",
              })}
            />
            {errors.monthlyDebts ? (
              <p className="text-xs text-red-500 mt-1">
                {errors.monthlyDebts.message?.toString()}
              </p>
            ) : (
              <p className="text-xs text-muted-foreground mt-1">
                Car payments, credit cards, student loans, etc.
              </p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="downPayment" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Funds Available
            </Label>
            <Input
              id="downPayment"
              type="number"
              placeholder="50000"
              className="mt-1"
              {...register("downPaymentAmount", {
                required: "Down payment amount is required",
              })}
            />
            {errors.downPaymentAmount ? (
              <p className="text-xs text-red-500 mt-1">
                {errors.downPaymentAmount.message?.toString()}
              </p>
            ) : (
              <p className="text-xs text-muted-foreground mt-1">
                Total cash available for down payment and closing costs
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="interestRate" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Interest Rate (%)
            </Label>
            <Input
              id="interestRate"
              type="number"
              step="0.1"
              placeholder="7.0"
              className="mt-1"
              {...register("interestRate", {
                required: "Interest rate is required",
              })}
            />
            {errors.interestRate ? (
              <p className="text-xs text-red-500 mt-1">
                {errors.interestRate.message?.toString()}
              </p>
            ) : (
              <p className="text-xs text-muted-foreground mt-1">
                Current market rate for 30-year fixed
              </p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="propertyTax" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Property Tax Rate (% annually)
            </Label>
            <Input
              id="propertyTax"
              type="number"
              step="0.1"
              placeholder="0.5"
              className="mt-1"
              {...register("propertyTaxRate", {
                required: "Property tax rate is required",
              })}
            />
            {errors.propertyTaxRate ? (
              <p className="text-xs text-red-500 mt-1">
                {errors.propertyTaxRate.message?.toString()}
              </p>
            ) : (
              <p className="text-xs text-muted-foreground mt-1">
                Varies by location (typical: 0.5% - 2.5%)
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="insurance" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Homeowners Insurance (% annually)
            </Label>
            <Input
              id="insurance"
              type="number"
              step="0.01" // <-- Fixed step
              placeholder="0.35"
              className="mt-1"
              {...register("insuranceRate", {
                required: "Insurance rate is required",
              })}
            />
            {errors.insuranceRate ? (
              <p className="text-xs text-red-500 mt-1">
                {errors.insuranceRate.message?.toString()}
              </p>
            ) : (
              <p className="text-xs text-muted-foreground mt-1">
                Typical: 0.25% - 0.75% (varies by location)
              </p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="hoaFees" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Monthly HOA Fees (optional)
            </Label>
            <Input
              id="hoaFees"
              type="number"
              placeholder="150"
              className="mt-1"
              {...register("hoaFees")}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Leave blank if no HOA fees apply
            </p>
          </div>

          <div>
            <Label htmlFor="closingCosts" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Closing Costs (%)
            </Label>
            <Input
              id="closingCosts"
              type="number"
              step="0.1"
              placeholder="3.0"
              className="mt-1"
              {...register("closingCostPercentage")}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Typical: 2-4% (adjust if seller pays part)
            </p>
          </div>
        </div>

        <div className="col-span-2 flex gap-3">
          <Button type="submit" className="flex-1">
            Calculate Prequalification
          </Button>
        </div>
      </form>

      {/* Info Section */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Loan Requirements:</strong>
          <br />
          <strong>Conventional:</strong> Housing ≤ 28%, Total Debt ≤ 36%
          <br />
          <strong>FHA:</strong> Housing ≤ 31%, Total Debt ≤ 43%
          <br />
          <strong>Housing Payment includes:</strong> Principal + Interest +
          Property Tax + Insurance + PMI + HOA Fees
        </AlertDescription>
      </Alert>
    </>
  );
};
