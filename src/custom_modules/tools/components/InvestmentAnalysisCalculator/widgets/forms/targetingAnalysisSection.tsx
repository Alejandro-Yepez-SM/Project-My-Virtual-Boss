import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Target } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { CalculationResults, PropertyFormValues } from "../../interfaces";
import { Button } from "@/components/ui/button";
import { calculateTargetAnalysiss, formatCurrency } from "../../helpers";

export const TargetingAnalysisSection = ({
  results,
}: {
  results: CalculationResults | null;
}) => {
  const { getValues, register } = useFormContext<PropertyFormValues>();
  const values = getValues();

  const [showTargetAnalysis, setShowTargetAnalysis] = useState(false);

  const [targetResults, setTargetResults] = useState<{
    recommendedPurchasePrice: number;
    maxOfferPrice: number;
    capRateBasedPrice: number;
    cashOnCashBasedPrice: number;
  } | null>(null);

  useEffect(() => {
    const calculateTargetAnalysis = () => {
      setShowTargetAnalysis(true);
      if (!results) return;

      const res = calculateTargetAnalysiss({
        annualCashFlow: results.annualCashFlow,
        netOperatingIncome: results.netOperatingIncome,
        targetCapRate: values.targetCapRate,
        targetCashOnCash: values.targetCashOnCash,
        totalCashInvested: results.totalCashInvested,
      });

      setTargetResults({
        recommendedPurchasePrice: res.recommendedPrice,
        maxOfferPrice: res.maxOfferPrice,
        capRateBasedPrice: res.capRateBasedPrice,
        cashOnCashBasedPrice: res.cashOnCashBasedPrice,
      });

      setShowTargetAnalysis(true);
    };

    calculateTargetAnalysis();
  }, [
    values.targetCapRate,
    values.targetCashOnCash,
    results?.netOperatingIncome,
    results?.totalCashInvested,
    results?.annualCashFlow,
  ]);

  return (
    <Card className="bg-purple-50 border-purple-200">
      <CardHeader>
        <CardTitle className="text-purple-800 flex items-center gap-2">
          <Target className="h-5 w-5" />
          Target Analysis Tool
        </CardTitle>
        <p className="text-sm text-purple-600">
          Enter your desired returns to get a recommended purchase price
        </p>
      </CardHeader>
      <CardContent>
        {!showTargetAnalysis ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="targetCapRate">Desired Cap Rate (%)</Label>
                <Input
                  id="targetCapRate"
                  type="number"
                  step="0.1"
                  placeholder="8.0"
                  {...register("targetCapRate", {
                    valueAsNumber: true,
                  })}
                />
                <p className="text-xs text-purple-600 mt-1">
                  Typical range: 6-12%
                </p>
              </div>
              <div>
                <Label htmlFor="targetCashOnCash">
                  Desired Cash-on-Cash ROI (%)
                </Label>
                <Input
                  id="targetCashOnCash"
                  type="number"
                  step="0.1"
                  placeholder="12.0"
                  {...register("targetCashOnCash", {
                    valueAsNumber: true,
                  })}
                />
                <p className="text-xs text-purple-600 mt-1">
                  Typical range: 8-20%
                </p>
              </div>
            </div>

            <Button
              type="button"
              onClick={() => {
                if (results) {
                  const res = calculateTargetAnalysiss({
                    annualCashFlow: results.annualCashFlow,
                    netOperatingIncome: results.netOperatingIncome,
                    targetCapRate: values.targetCapRate,
                    targetCashOnCash: values.targetCashOnCash,
                    totalCashInvested: results.totalCashInvested,
                  });
                  setTargetResults({
                    recommendedPurchasePrice: res.recommendedPrice,
                    maxOfferPrice: res.maxOfferPrice,
                    capRateBasedPrice: res.capRateBasedPrice,
                    cashOnCashBasedPrice: res.cashOnCashBasedPrice,
                  });
                }
              }}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              <Target className="h-4 w-4 mr-2" />
              Calculate Recommended Purchase Price
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-purple-800">
                Purchase Price Recommendations
              </h4>
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={() => setShowTargetAnalysis(false)}
                className="border-purple-300 text-purple-700"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Targets
              </Button>
            </div>

            {targetResults && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-purple-100 p-4 rounded-lg border border-purple-300">
                  <h5 className="font-semibold text-purple-800 mb-2">
                    Recommended Purchase Price
                  </h5>
                  <p className="text-2xl font-bold text-purple-900">
                    {formatCurrency(targetResults.recommendedPurchasePrice)}
                  </p>
                  <p className="text-xs text-purple-700 mt-2">
                    Conservative price to meet both targets
                  </p>
                </div>

                <div className="bg-purple-100 p-4 rounded-lg border border-purple-300">
                  <h5 className="font-semibold text-purple-800 mb-2">
                    Maximum Offer Price
                  </h5>
                  <p className="text-2xl font-bold text-purple-900">
                    {formatCurrency(targetResults.maxOfferPrice)}
                  </p>
                  <p className="text-xs text-purple-700 mt-2">
                    90% of recommended (negotiation buffer)
                  </p>
                </div>
              </div>
            )}

            {targetResults && (
              <div className="space-y-3 pt-4 border-t border-purple-200">
                <h5 className="font-medium text-purple-800">
                  Analysis Breakdown:
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-purple-700">Target Cap Rate:</span>
                    <span className="font-medium">{values.targetCapRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-700">
                      Target Cash-on-Cash:
                    </span>
                    <span className="font-medium">
                      {values.targetCashOnCash}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-700">
                      Cap Rate Based Price:
                    </span>
                    <span className="font-medium">
                      {formatCurrency(targetResults.capRateBasedPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-700">
                      Cash-on-Cash Based Price:
                    </span>
                    <span className="font-medium">
                      {formatCurrency(targetResults.cashOnCashBasedPrice)}
                    </span>
                  </div>
                </div>

                <div className="bg-purple-200 p-3 rounded-lg mt-4">
                  <p className="text-xs text-purple-800">
                    <strong>How it works:</strong> We calculate the maximum
                    price you can pay to achieve your target returns. The
                    recommended price is the lower of the two calculations to
                    ensure you meet both targets.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
