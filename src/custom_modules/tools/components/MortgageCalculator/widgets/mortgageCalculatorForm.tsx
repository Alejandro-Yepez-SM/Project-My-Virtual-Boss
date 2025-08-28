import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import {
  Building,
  DollarSign,
  Home,
  Percent,
  Shield,
  TrendingUp,
} from "lucide-react";
import { MortgageFormValues } from "../interfaces";
import { Controller, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-select";

export const MortgageCalculatorForm = ({
  isDownPaymentPercent,
  setIsDownPaymentPercent,
}: {
  isDownPaymentPercent: boolean;
  setIsDownPaymentPercent: (p: boolean) => void;
}) => {
  const { register, control } = useFormContext<MortgageFormValues>(); // retrieve a

  return (
    <Card className="border-2 border-blue-100">
      <CardHeader className="bg-blue-50">
        <CardTitle className="flex items-center gap-2 text-blue-900">
          <Home className="h-5 w-5" />
          Loan Details
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Home Price */}
        <div className="space-y-2">
          <Label htmlFor="homePrice" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Home Price
          </Label>
          <Input
            id="homePrice"
            type="number"
            placeholder="450000"
            className="text-lg font-semibold"
            {...register("homePrice", {
              required: "Home price is required",
            })}
          />
        </div>

        {/* Down Payment */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Down Payment
          </Label>
          <div className="flex gap-2">
            <Button
              type="button"
              variant={!isDownPaymentPercent ? "default" : "outline"}
              size="sm"
              onClick={() => setIsDownPaymentPercent(false)}
              className="px-3"
            >
              $
            </Button>
            <Button
              type="button"
              variant={isDownPaymentPercent ? "default" : "outline"}
              size="sm"
              onClick={() => setIsDownPaymentPercent(true)}
              className="px-3"
            >
              %
            </Button>
            {isDownPaymentPercent ? (
              <Controller
                name="downPaymentPercent"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    placeholder={"20"}
                    className="flex-1"
                  />
                )}
              />
            ) : (
              <Controller
                name="downPayment"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    placeholder={"90000"}
                    className="flex-1"
                  />
                )}
              />
            )}
          </div>
        </div>

        {/* Interest Rate */}
        <div className="space-y-2">
          <Label htmlFor="interestRate" className="flex items-center gap-2">
            <Percent className="h-4 w-4" />
            Interest Rate (Annual %)
          </Label>
          <Input
            id="interestRate"
            type="number"
            step="0.01"
            placeholder="7.25"
            {...register("interestRate", {
              required: "Interest Rate is required",
            })}
          />
        </div>

        {/* Loan Term */}
        <div className="space-y-2">
          <Label htmlFor="loanTerm" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Loan Term (Years)
          </Label>
          <Input
            id="loanTerm"
            type="number"
            placeholder="30"
            {...register("loanTerm", {
              required: "Loan Term is required",
            })}
          />
        </div>

        <Separator />

        {/* Additional Costs */}
        <div className="space-y-4">
          <Label className="text-sm font-semibold text-neutral-700">
            Additional Monthly Costs
          </Label>

          <div className="space-y-2">
            <Label htmlFor="propertyTax" className="text-sm">
              Property Tax Rate (Annual %)
            </Label>
            <Input
              id="propertyTax"
              type="number"
              step="0.1"
              placeholder="1.2"
              {...register("propertyTaxRate", {
                required: "Property Tax Rate is required",
              })}
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="homeInsurance"
              className="flex items-center gap-2 text-sm"
            >
              <Shield className="h-3 w-3" />
              Home Insurance (Annual $)
            </Label>
            <Input
              id="homeInsurance"
              type="number"
              placeholder="1800"
              {...register("homeInsurance", {
                required: "Home Insurance is required",
              })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pmiRate" className="text-sm">
              PMI Rate (Annual %)
            </Label>
            <Input
              id="pmiRate"
              type="number"
              step="0.1"
              placeholder="0.5"
              {...register("pmiRate", {
                required: "PMI Rate is required",
              })}
            />
            <p className="text-xs text-neutral-500">
              Applied when down payment is less than 20%
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hoaFees" className="text-sm">
              HOA Fees (Monthly $)
            </Label>
            <Input
              id="hoaFees"
              type="number"
              placeholder="0"
              {...register("hoaFees", {
                required: "HOA Fees is required",
              })}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
