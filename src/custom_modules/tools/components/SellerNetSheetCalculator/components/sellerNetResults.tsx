import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/core/i18n";
import { NetSheetFormValues, NetSheetResult } from "../interfaces";
import { formatPercentage } from "../../InvestmentAnalysisCalculator/helpers";
import { GEOGRAPHIC_COSTS } from "../helpers";
import { useFormContext } from "react-hook-form";

export const SellerNetResults = ({
  resetCalculator,
  setShowResults,
  result,
}: {
  resetCalculator: () => void;
  setShowResults: (res: boolean) => void;
  result: NetSheetResult;
}) => {
  const { watch } = useFormContext<NetSheetFormValues>();

  const detectedState = watch("detectedState");

  return (
    <>
      {/* Results Display */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Seller's Net Sheet</h3>
          <div className="space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowResults(false);
              }}
            >
              Edit Fields
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={resetCalculator}
            >
              Start Over
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-blue-600">Gross Sale Price</p>
              <p className="text-2xl font-bold text-blue-800">
                {formatCurrency(result.grossSalePrice)}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-red-600">Total Deductions</p>
              <p className="text-2xl font-bold text-red-800">
                {formatCurrency(result.totalDeductions)}
              </p>
              <p className="text-xs text-red-600">
                {formatPercentage(
                  (result.totalDeductions / result.grossSalePrice) * 100
                )}{" "}
                of sale price
              </p>
            </CardContent>
          </Card>

          <Card
            className={`${
              result.netProceeds > 0
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            <CardContent className="p-4 text-center">
              <p
                className={`text-sm ${
                  result.netProceeds > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                Net Proceeds
              </p>
              <p
                className={`text-2xl font-bold ${
                  result.netProceeds > 0 ? "text-green-800" : "text-red-800"
                }`}
              >
                {formatCurrency(result.netProceeds)}
              </p>
              {result.netProceeds <= 0 && (
                <p className="text-xs text-red-600 mt-1">
                  ⚠️ Costs exceed sale price
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Detailed Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Cost Breakdown</CardTitle>
            <CardDescription>
              Based on{" "}
              {GEOGRAPHIC_COSTS[detectedState]?.stateName || "national average"}{" "}
              closing costs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {result.breakdownItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium">{item.category}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      {formatCurrency(item.amount)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatPercentage(item.percentage)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
