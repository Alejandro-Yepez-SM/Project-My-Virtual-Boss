import { Card, CardContent } from "@/components/ui/card";
import { Building, DollarSign, Target, TrendingUp } from "lucide-react";
import { formatCurrency, formatPercentage } from "../../helpers";

export const PerfomanceMetrics = ({
  cashOnCashReturn,
  annualCashFlow,
  netOperatingIncome,
  debtServiceCoverageRatio,
}: {
  cashOnCashReturn: number;
  annualCashFlow: number;
  netOperatingIncome: number;
  debtServiceCoverageRatio: number;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <p className="text-sm font-medium text-blue-800">
              Cash-on-Cash Return
            </p>
          </div>
          <p className="text-2xl font-bold text-blue-700">
            {formatPercentage(cashOnCashReturn)}
          </p>
          <p className="text-xs text-blue-600 mt-1">
            Annual return on cash invested
          </p>
        </CardContent>
      </Card>

      <Card className="bg-purple-50 border-purple-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-5 w-5 text-purple-600" />
            <p className="text-sm font-medium text-purple-800">
              Annual Cash Flow
            </p>
          </div>
          <p className="text-2xl font-bold text-purple-700">
            {formatCurrency(annualCashFlow)}
          </p>
          <p className="text-xs text-purple-600 mt-1">
            {formatCurrency(annualCashFlow / 12)}/month
          </p>
        </CardContent>
      </Card>

      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-5 w-5 text-green-600" />
            <p className="text-sm font-medium text-green-800">Improved NOI</p>
          </div>
          <p className="text-2xl font-bold text-green-700">
            {formatCurrency(netOperatingIncome)}
          </p>
          <p className="text-xs text-green-600 mt-1">Net Operating Income</p>
        </CardContent>
      </Card>

      <Card className="bg-orange-50 border-orange-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Building className="h-5 w-5 text-orange-600" />
            <p className="text-sm font-medium text-orange-800">
              Debt Service Coverage
            </p>
          </div>
          <p className="text-2xl font-bold text-orange-700">
            {debtServiceCoverageRatio.toFixed(2)}x
          </p>
          <p className="text-xs text-orange-600 mt-1">
            {debtServiceCoverageRatio >= 1.25
              ? "Strong Coverage"
              : debtServiceCoverageRatio >= 1.0
              ? "Adequate Coverage"
              : "Insufficient Coverage"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
