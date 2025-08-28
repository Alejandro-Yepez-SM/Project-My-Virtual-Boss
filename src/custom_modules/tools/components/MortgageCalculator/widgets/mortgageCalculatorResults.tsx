import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/core/i18n";
import { Calculator, Info } from "lucide-react";
import { formatCurrencyDetailed } from "../helpers";
import { MortgageCalculation, MortgageFormValues } from "../interfaces";
import { Badge } from "@/components/ui/badge";
import { useFormContext } from "react-hook-form";

export const MortgageCalculatorResults = ({
  calculation,
}: {
  calculation: MortgageCalculation | null;
}) => {
  const { watch } = useFormContext<MortgageFormValues>(); // retrieve a

  const downPayment = watch("downPayment");
  const homePrice = watch("homePrice");

  return (
    <div className="space-y-6">
      {/* Monthly Payment Breakdown */}
      {calculation && (
        <Card className="border-2 border-green-100">
          <CardHeader className="bg-green-50">
            <CardTitle className="flex items-center gap-2 text-green-900">
              <Calculator className="h-5 w-5" />
              Monthly Payment Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {/* Total Monthly Payment */}
            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-green-900">
                  Total Monthly Payment
                </span>
                <span className="text-2xl font-bold text-green-600">
                  {formatCurrency(calculation.monthlyPayment)}
                </span>
              </div>
            </div>

            {/* Payment Components */}
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                <span className="text-neutral-700 font-medium">
                  Principal & Interest
                </span>
                <span className="font-semibold">
                  {formatCurrencyDetailed(
                    calculation.principal + calculation.interest
                  )}
                </span>
              </div>

              <div className="pl-4 space-y-2 text-sm">
                <div className="flex justify-between text-neutral-600">
                  <span>• Principal</span>
                  <span>{formatCurrencyDetailed(calculation.principal)}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>• Interest</span>
                  <span>{formatCurrencyDetailed(calculation.interest)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                <span className="text-neutral-700 font-medium">
                  Property Tax
                </span>
                <span className="font-semibold">
                  {formatCurrencyDetailed(calculation.propertyTax)}
                </span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                <span className="text-neutral-700 font-medium">
                  Home Insurance
                </span>
                <span className="font-semibold">
                  {formatCurrencyDetailed(calculation.insurance)}
                </span>
              </div>

              {calculation.pmi > 0 && (
                <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-700 font-medium">PMI</span>
                    <Badge variant="outline" className="text-xs">
                      &lt;20% down
                    </Badge>
                  </div>
                  <span className="font-semibold">
                    {formatCurrencyDetailed(calculation.pmi)}
                  </span>
                </div>
              )}

              {calculation.hoa > 0 && (
                <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-700 font-medium">HOA Fees</span>
                  <span className="font-semibold">
                    {formatCurrencyDetailed(calculation.hoa)}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Loan Summary */}
      {calculation && (
        <Card className="border-2 border-blue-100">
          <CardHeader className="bg-blue-50">
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <Info className="h-5 w-5" />
              Loan Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between py-2 border-b border-neutral-100">
              <span className="text-neutral-700">Loan Amount</span>
              <span className="font-semibold">
                {formatCurrency(calculation.totalLoanAmount)}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-neutral-100">
              <span className="text-neutral-700">Total Interest Paid</span>
              <span className="font-semibold text-orange-600">
                {formatCurrency(calculation.totalInterest)}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-neutral-100">
              <span className="text-neutral-700">Total Cost of Home</span>
              <span className="font-semibold text-blue-600">
                {formatCurrency(calculation.totalCost)}
              </span>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg mt-4">
              <p className="text-sm text-blue-800">
                <strong>Down Payment:</strong>{" "}
                {formatCurrency(parseFloat(downPayment) || 0)}(
                {(
                  ((parseFloat(downPayment) || 0) /
                    (parseFloat(homePrice) || 1)) *
                  100
                ).toFixed(1)}
                %)
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Calculation Message */}
      {!calculation && (
        <Card className="border-2 border-neutral-200">
          <CardContent className="p-8 text-center">
            <Calculator className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-neutral-600 mb-2">
              Enter Loan Details
            </h3>
            <p className="text-neutral-500">
              Fill in the home price and loan information to see your monthly
              payment breakdown
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
