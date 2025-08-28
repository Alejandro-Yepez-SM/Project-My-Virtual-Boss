import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { DollarSign, AlertCircle, CheckCircle } from "lucide-react";
import { formatCurrency, formatPercentage } from "../helpers";
import { CalculationResult, PrequalificationFormValues } from "../interfaces";
import { useFormContext } from "react-hook-form";

export const PrequalificationResuls = ({
  results,
  defaultValues,
  setShowResults,
}: {
  results: CalculationResult[];
  defaultValues: PrequalificationFormValues;
  setShowResults: (res: boolean) => void;
}) => {
  const { getValues, reset } = useFormContext<PrequalificationFormValues>();

  const downPaymentAmount = getValues("downPaymentAmount");
  const closingCostPercentage = getValues("closingCostPercentage");

  const resetCalculator = () => {
    setShowResults(false);
  };

  const startOver = () => {
    reset(defaultValues);
    setShowResults(false);
  };

  return (
    <>
      {/* Results Display */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Prequalification Results</h3>
          <div className="space-x-4">
            <Button variant="outline" onClick={resetCalculator}>
              Edit Fields
            </Button>
            <Button variant="destructive" onClick={startOver}>
              Start Over
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {results.map((result, index) => (
            <Card
              key={index}
              className={`border-2 ${
                result.qualifies
                  ? "border-green-200 bg-green-50"
                  : "border-red-200 bg-red-50"
              }`}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{result.loanProgram.name} Loan</span>
                  {result.qualifies ? (
                    <Badge variant="default" className="bg-green-600">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Qualifies
                    </Badge>
                  ) : (
                    <Badge variant="destructive">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Does Not Qualify
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  {result.loanProgram.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {result.qualifies && result.maxLoanAmount > 0 ? (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Maximum Loan Amount
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        {formatCurrency(result.maxLoanAmount)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Maximum Home Price
                      </p>
                      <p className="text-xl font-semibold">
                        {formatCurrency(
                          result.maxLoanAmount + parseFloat(downPaymentAmount)
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Monthly Housing Payment
                      </p>
                      <p className="text-lg font-medium">
                        {formatCurrency(result.monthlyHousingPayment)}
                      </p>
                    </div>

                    {/* Payment Breakdown */}
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h5 className="text-sm font-semibold text-blue-800 mb-2">
                        Payment Breakdown
                      </h5>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span>Principal & Interest:</span>
                          <span className="font-medium">
                            {formatCurrency(
                              result.paymentBreakdown.principalAndInterest
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Property Taxes:</span>
                          <span className="font-medium">
                            {formatCurrency(
                              result.paymentBreakdown.propertyTaxes
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Homeowners Insurance:</span>
                          <span className="font-medium">
                            {formatCurrency(
                              result.paymentBreakdown.homeownersInsurance
                            )}
                          </span>
                        </div>
                        {result.paymentBreakdown.mortgageInsurance > 0 && (
                          <div className="flex justify-between">
                            <span>Mortgage Insurance (PMI):</span>
                            <span className="font-medium">
                              {formatCurrency(
                                result.paymentBreakdown.mortgageInsurance
                              )}
                            </span>
                          </div>
                        )}
                        {result.paymentBreakdown.hoaFees > 0 && (
                          <div className="flex justify-between">
                            <span>HOA Fees:</span>
                            <span className="font-medium">
                              {formatCurrency(result.paymentBreakdown.hoaFees)}
                            </span>
                          </div>
                        )}
                        <Separator className="my-1" />
                        <div className="flex justify-between font-semibold text-blue-900">
                          <span>Total Monthly Payment:</span>
                          <span>
                            {formatCurrency(
                              result.paymentBreakdown.totalMonthlyPayment
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                    <p className="text-red-600 font-medium">
                      Client does not qualify for this loan type
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Debt-to-income ratios exceed requirements
                    </p>
                  </div>
                )}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Housing Ratio:</span>
                    <span
                      className={
                        result.housingRatioUsed <=
                        result.loanProgram.housingRatio
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {formatPercentage(result.housingRatioUsed)} /{" "}
                      {result.loanProgram.housingRatio}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total Debt Ratio:</span>
                    <span
                      className={
                        result.totalRatioUsed <= result.loanProgram.totalRatio
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {formatPercentage(result.totalRatioUsed)} /{" "}
                      {result.loanProgram.totalRatio}%
                    </span>
                  </div>
                </div>

                {/* Cash to Close Analysis */}
                {result.qualifies && result.maxLoanAmount > 0 && (
                  <>
                    <Separator />
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        Cash to Close Analysis
                        {!result.cashToClose.hasEnoughCash && (
                          <Badge variant="destructive" className="text-xs">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Insufficient Cash
                          </Badge>
                        )}
                      </h4>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Funds Available:</span>
                          <span className="font-medium">
                            {formatCurrency(parseFloat(downPaymentAmount))}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span>
                            Minimum Down Payment (
                            {result.loanProgram.name === "FHA" ? "3.5" : "5.0"}
                            %):
                          </span>
                          <span className="font-medium">
                            {formatCurrency(
                              result.cashToClose.downPaymentRequired
                            )}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span>
                            Estimated Closing Costs ({closingCostPercentage}%):
                          </span>
                          <span className="font-medium">
                            {formatCurrency(result.cashToClose.closingCosts)}
                          </span>
                        </div>

                        <Separator />

                        <div className="flex justify-between font-semibold">
                          <span>Total Cash Needed:</span>
                          <span className="text-lg">
                            {formatCurrency(result.cashToClose.totalCashNeeded)}
                          </span>
                        </div>

                        {result.cashToClose.cashShortfall > 0 && (
                          <div className="mt-3 space-y-2">
                            <Alert className="border-red-200 bg-red-50">
                              <AlertCircle className="h-4 w-4 text-red-600" />
                              <AlertDescription className="text-xs text-red-800">
                                <div className="space-y-1">
                                  <div>
                                    <strong>Cash Shortfall:</strong>{" "}
                                    {formatCurrency(
                                      result.cashToClose.cashShortfall
                                    )}
                                  </div>

                                  {result.cashToClose
                                    .suggestedClosingCostReduction > 0 && (
                                    <div>
                                      <strong>
                                        Suggested Seller Concessions:
                                      </strong>{" "}
                                      {formatCurrency(
                                        result.cashToClose
                                          .suggestedClosingCostReduction
                                      )}
                                      <span className="text-muted-foreground">
                                        {" "}
                                        (reduce closing costs)
                                      </span>
                                    </div>
                                  )}

                                  {result.cashToClose.remainingDeficiency >
                                    0 && (
                                    <div className="text-red-700">
                                      <strong>
                                        Additional Funds Still Needed:
                                      </strong>{" "}
                                      {formatCurrency(
                                        result.cashToClose.remainingDeficiency
                                      )}
                                    </div>
                                  )}
                                </div>
                              </AlertDescription>
                            </Alert>
                          </div>
                        )}

                        {result.cashToClose.hasEnoughCash && (
                          <div className="bg-green-50 p-2 rounded text-xs text-green-800">
                            <strong>✓ Sufficient Funds:</strong> Client has
                            enough cash to close with{" "}
                            {formatCurrency(
                              parseFloat(downPaymentAmount) -
                                result.cashToClose.totalCashNeeded
                            )}{" "}
                            remaining.
                          </div>
                        )}

                        <div className="bg-blue-50 p-2 rounded text-xs text-blue-800">
                          <strong>Note:</strong> Seller can contribute to
                          buyer's closing costs.
                          {result.loanProgram.name === "FHA"
                            ? " FHA allows up to 6% of purchase price."
                            : " Conventional loans typically allow 3-6% of purchase price."}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Note:</strong> This is an estimate based on debt-to-income
            ratios only. Final loan approval depends on credit score, employment
            history, assets, and other factors. Recommend clients get
            pre-approved with a qualified lender.
          </AlertDescription>
        </Alert>
      </div>
    </>
  );
};
