import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatPercentage } from "../../helpers";
import { UnitData } from "../../interfaces";

export const AfterImprovements = ({
  improvedCapRate,
  units,
  propertyValue,
  totalRepairCosts,
}: {
  improvedCapRate: number;
  units: UnitData[];
  propertyValue: string;
  totalRepairCosts: number;
}) => {
  return (
    <Card className="bg-green-50 border-green-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-green-800">
          After Improvements
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <span className="text-sm font-medium">Cap Rate:</span>
          <span className="text-lg font-bold text-green-700">
            {formatPercentage(improvedCapRate)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm font-medium">Annual Income:</span>
          <span className="font-medium">
            {formatCurrency(
              units.reduce((total, unit) => total + unit.potentialRent * 12, 0)
            )}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm font-medium">Property Value:</span>
          <span className="font-medium">
            {formatCurrency(parseFloat(propertyValue) + totalRepairCosts)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
