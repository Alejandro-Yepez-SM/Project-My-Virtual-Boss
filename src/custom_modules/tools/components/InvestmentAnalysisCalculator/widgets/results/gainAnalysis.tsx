import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "../../helpers";

export const GainAnalysis = ({
  totalRepairCosts,
  totalIncomeIncrease,
  valueGain,
}: {
  totalRepairCosts: number;
  totalIncomeIncrease: number;
  valueGain: number;
}) => {
  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardHeader>
        <CardTitle className="text-lg text-blue-800">
          Investment Analysis Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-sm font-medium text-blue-700 mb-2">
              Total Repair Investment
            </p>
            <p className="text-2xl font-bold text-blue-800">
              {formatCurrency(totalRepairCosts)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-blue-700 mb-2">
              Annual Income Increase
            </p>
            <p className="text-2xl font-bold text-blue-800">
              {formatCurrency(totalIncomeIncrease)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-blue-700 mb-2">
              Estimated Value Gain
            </p>
            <p className="text-2xl font-bold text-blue-800">
              {formatCurrency(valueGain)}
            </p>
            <p className="text-xs text-blue-600 mt-2 px-2">
              Property value increase based on improved income divided by
              current cap rate
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
