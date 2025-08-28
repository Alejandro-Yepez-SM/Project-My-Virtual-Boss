import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  calculateMonthlyMortgagePayment,
  formatCurrency,
  formatPercentage,
} from "../../helpers";
import { Badge } from "@/components/ui/badge";

export const InvestMentSummary = ({
  totalCashInvested,
  downPayment,
  closingCosts,
  renovationCosts,
  loanAmount,
  interestRate,
  loanTerm,
  capRate,
  cashOnCashReturn,
  annualCashFlow,
}: {
  totalCashInvested: number;
  downPayment: string;
  closingCosts: string;
  renovationCosts: string;
  loanAmount: string;
  interestRate: string;
  loanTerm: string;
  capRate: number;
  cashOnCashReturn: number;
  annualCashFlow: number;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Investment Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Total Cash Invested
            </p>
            <p className="text-lg font-bold">
              {formatCurrency(totalCashInvested)}
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <div>Down Payment: {formatCurrency(parseFloat(downPayment))}</div>
              <div>
                Closing Costs: {formatCurrency(parseFloat(closingCosts))}
              </div>
              <div>
                Renovation: {formatCurrency(parseFloat(renovationCosts))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Financing Details
            </p>
            <p className="text-lg font-bold">
              {formatCurrency(parseFloat(loanAmount))}
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <div>Interest Rate: {interestRate}%</div>
              <div>Loan Term: {loanTerm} years</div>
              <div>
                Monthly Payment:{" "}
                {formatCurrency(
                  parseFloat(loanAmount) > 0
                    ? calculateMonthlyMortgagePayment(
                        parseFloat(loanAmount),
                        parseFloat(interestRate),
                        parseInt(loanTerm)
                      )
                    : 0
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Performance Metrics
            </p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Cap Rate:</span>
                <Badge
                  variant={
                    capRate >= 8
                      ? "default"
                      : capRate >= 6
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {formatPercentage(capRate)}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Cash-on-Cash:</span>
                <Badge
                  variant={
                    cashOnCashReturn >= 10
                      ? "default"
                      : cashOnCashReturn >= 8
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {formatPercentage(cashOnCashReturn)}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Monthly Cash Flow:</span>
                <Badge
                  variant={annualCashFlow >= 0 ? "default" : "destructive"}
                >
                  {formatCurrency(annualCashFlow / 12)}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
