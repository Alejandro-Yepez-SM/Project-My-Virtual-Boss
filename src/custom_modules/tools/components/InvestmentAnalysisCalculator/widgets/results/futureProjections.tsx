import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/core/i18n";
import { ProjectionYear } from "../../interfaces";

export const FutureProjections = ({
  projections,
}: {
  projections: {
    year3: ProjectionYear;
    year5: ProjectionYear;
  };
}) => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg text-indigo-800">
          Future Projections
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Based on 5% annual rent growth and 3% property appreciation
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 3-Year Projection */}
          <div className="bg-indigo-50 p-4 rounded-lg border-2 border-indigo-200">
            <h4 className="text-lg font-semibold text-indigo-800 mb-3">
              3-Year Projection
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-indigo-700">
                  Annual Rental Income:
                </span>
                <span className="font-semibold text-indigo-800">
                  {formatCurrency(projections.year3.rent)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-indigo-700">Property Value:</span>
                <span className="font-semibold text-indigo-800">
                  {formatCurrency(projections.year3.propertyValue)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-indigo-700">
                  Annual Cash Flow:
                </span>
                <span className="font-semibold text-indigo-800">
                  {formatCurrency(projections.year3.cashFlow)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-indigo-700">Cap Rate:</span>
                <span className="font-semibold text-indigo-800">
                  {projections.year3.capRate.toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-indigo-700">
                  Cash-on-Cash ROI:
                </span>
                <span className="font-semibold text-indigo-800">
                  {projections.year3.roi.toFixed(2)}%
                </span>
              </div>
              <div className="mt-3 pt-2 border-t border-indigo-200">
                <p className="text-xs text-indigo-600 mb-1">
                  <strong>Cap Rate:</strong> Net Operating Income ÷ Property
                  Value (measures property's income efficiency)
                </p>
                <p className="text-xs text-indigo-600">
                  <strong>Cash-on-Cash ROI:</strong> Annual Cash Flow ÷ Total
                  Cash Invested (measures return on your cash)
                </p>
              </div>
              <div className="border-t border-indigo-200 pt-2 mt-2">
                <div className="text-xs text-indigo-600 mb-2 font-medium">
                  Equity Breakdown:
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-indigo-600">Property Value:</span>
                  <span className="text-indigo-700">
                    {formatCurrency(projections.year3.propertyValue)}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-indigo-600">- Remaining Loan:</span>
                  <span className="text-indigo-700">
                    -
                    {formatCurrency(
                      projections.year3.propertyValue - projections.year3.equity
                    )}
                  </span>
                </div>
                <div className="flex justify-between border-t border-indigo-200 pt-1 mt-1">
                  <span className="text-sm font-medium text-indigo-700">
                    = Net Equity:
                  </span>
                  <span className="font-semibold text-indigo-800">
                    {formatCurrency(projections.year3.equity)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 5-Year Projection */}
          <div className="bg-emerald-50 p-4 rounded-lg border-2 border-emerald-200">
            <h4 className="text-lg font-semibold text-emerald-800 mb-3">
              5-Year Projection
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-emerald-700">
                  Annual Rental Income:
                </span>
                <span className="font-semibold text-emerald-800">
                  {formatCurrency(projections.year5.rent)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-emerald-700">
                  Property Value:
                </span>
                <span className="font-semibold text-emerald-800">
                  {formatCurrency(projections.year5.propertyValue)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-emerald-700">
                  Annual Cash Flow:
                </span>
                <span className="font-semibold text-emerald-800">
                  {formatCurrency(projections.year5.cashFlow)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-emerald-700">Cap Rate:</span>
                <span className="font-semibold text-emerald-800">
                  {projections.year5.capRate.toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-emerald-700">
                  Cash-on-Cash ROI:
                </span>
                <span className="font-semibold text-emerald-800">
                  {projections.year5.roi.toFixed(2)}%
                </span>
              </div>
              <div className="mt-3 pt-2 border-t border-emerald-200">
                <p className="text-xs text-emerald-600 mb-1">
                  <strong>Cap Rate:</strong> Net Operating Income ÷ Property
                  Value (measures property's income efficiency)
                </p>
                <p className="text-xs text-emerald-600">
                  <strong>Cash-on-Cash ROI:</strong> Annual Cash Flow ÷ Total
                  Cash Invested (measures return on your cash)
                </p>
              </div>
              <div className="border-t border-emerald-200 pt-2 mt-2">
                <div className="text-xs text-emerald-600 mb-2 font-medium">
                  Equity Breakdown:
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-emerald-600">Property Value:</span>
                  <span className="text-emerald-700">
                    {formatCurrency(projections.year5.propertyValue)}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-emerald-600">- Remaining Loan:</span>
                  <span className="text-emerald-700">
                    -
                    {formatCurrency(
                      projections.year5.propertyValue - projections.year5.equity
                    )}
                  </span>
                </div>
                <div className="flex justify-between border-t border-emerald-200 pt-1 mt-1">
                  <span className="text-sm font-medium text-emerald-700">
                    = Net Equity:
                  </span>
                  <span className="font-semibold text-emerald-800">
                    {formatCurrency(projections.year5.equity)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
