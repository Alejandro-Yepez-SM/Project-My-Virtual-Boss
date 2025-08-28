import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatPercentage } from "../../helpers";
import { UnitData } from "../../interfaces";

export const CurrentPerformance = ({
  currentCapRate,
  units,
  propertyValue,
}: {
  currentCapRate: number;
  units: UnitData[];
  propertyValue: string;
}) => {
  return (
    <Card className="bg-orange-50 border-orange-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg text-orange-800">
          Current Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <span className="text-sm font-medium">Cap Rate:</span>
          <span className="text-lg font-bold text-orange-700">
            {formatPercentage(currentCapRate)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm font-medium">Annual Income:</span>
          <span className="font-medium">
            {formatCurrency(
              units.reduce((total, unit) => total + unit.currentRent * 12, 0)
            )}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm font-medium">Property Value:</span>
          <span className="font-medium">
            {formatCurrency(parseFloat(propertyValue))}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
