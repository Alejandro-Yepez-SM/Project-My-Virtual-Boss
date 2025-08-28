import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatPercentage } from "../../helpers";
import { UnitData } from "../../interfaces";

export const UnitByUnitAnalysis = ({ units }: { units: UnitData[] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Unit-by-Unit Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-3 py-2 text-left">
                  Unit
                </th>
                <th className="border border-gray-300 px-3 py-2 text-left">
                  Bed/Bath
                </th>
                <th className="border border-gray-300 px-3 py-2 text-left">
                  Current Rent
                </th>
                <th className="border border-gray-300 px-3 py-2 text-left">
                  Potential Rent
                </th>
                <th className="border border-gray-300 px-3 py-2 text-left">
                  Repair Cost
                </th>
                <th className="border border-gray-300 px-3 py-2 text-left">
                  Monthly Gain
                </th>
                <th className="border border-gray-300 px-3 py-2 text-left">
                  Annual Gain
                </th>
                <th className="border border-gray-300 px-3 py-2 text-left">
                  ROI on Repairs
                </th>
              </tr>
            </thead>
            <tbody>
              {units.map((unit) => {
                const monthlyGain = unit.potentialRent - unit.currentRent;
                const annualGain = monthlyGain * 12;
                const repairROI =
                  unit.repairCosts > 0
                    ? (annualGain / unit.repairCosts) * 100
                    : 0;

                return (
                  <tr key={unit.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-3 py-2 font-medium">
                      Unit {unit.id}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-sm">
                      {unit.bedrooms}bed/{unit.bathrooms}bath
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      {formatCurrency(unit.currentRent)}
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      {formatCurrency(unit.potentialRent)}
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      {formatCurrency(unit.repairCosts)}
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <span
                        className={
                          monthlyGain >= 0 ? "text-green-600" : "text-red-600"
                        }
                      >
                        {formatCurrency(monthlyGain)}
                      </span>
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <span
                        className={
                          annualGain >= 0 ? "text-green-600" : "text-red-600"
                        }
                      >
                        {formatCurrency(annualGain)}
                      </span>
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <span
                        className={
                          repairROI >= 20
                            ? "text-green-600"
                            : repairROI >= 10
                            ? "text-orange-600"
                            : "text-red-600"
                        }
                      >
                        {formatPercentage(repairROI)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
