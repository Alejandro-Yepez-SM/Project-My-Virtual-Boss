import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/core/i18n";
import { UnitData } from "../../interfaces";

export const DetailsBreakdown = ({
  monthlyUnits,
  otherIncome,
  currentVacancy,
  projectedVacancy,
  units,
  totalIncome,
  projectedInsurance,
  projectedPropertyTaxes,
  projectedMaintenance,
  projectedManagementPercent,
  projectedOtherExpenses,
  totalExpenses,
}: {
  monthlyUnits: number;
  otherIncome: string;
  currentVacancy: string;
  projectedVacancy: string;
  units: UnitData[];
  totalIncome: number;
  projectedInsurance: string;
  projectedPropertyTaxes: string;
  projectedMaintenance: string;
  projectedManagementPercent: string;
  projectedOtherExpenses: string;
  totalExpenses: number;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Income Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">
              Gross Rental Income ({monthlyUnits} units)
            </span>
            <span className="font-medium">
              {formatCurrency(
                units.reduce(
                  (total, unit) => total + unit.potentialRent * 12,
                  0
                )
              )}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Other Income</span>
            <span className="font-medium">
              {formatCurrency(parseFloat(otherIncome) * 12)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">
              Vacancy Loss (-{currentVacancy}%)
            </span>
            <span className="font-medium text-red-600">
              -
              {formatCurrency(
                ((units.reduce(
                  (total, unit) => total + unit.potentialRent * 12,
                  0
                ) +
                  parseFloat(otherIncome) * 12) *
                  parseFloat(projectedVacancy)) /
                  100
              )}
            </span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold">
            <span>Effective Gross Income</span>
            <span className="text-green-600">
              {formatCurrency(totalIncome)}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Expense Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Insurance</span>
            <span className="font-medium">
              {formatCurrency(parseFloat(projectedInsurance) * 12)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">
              Property Taxes
            </span>
            <span className="font-medium">
              {formatCurrency(parseFloat(projectedPropertyTaxes) * 12)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">
              Maintenance & Repairs
            </span>
            <span className="font-medium">
              {formatCurrency(parseFloat(projectedMaintenance) * 12)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">
              Management ({projectedManagementPercent}%)
            </span>
            <span className="font-medium">
              {formatCurrency(
                (totalIncome * parseFloat(projectedManagementPercent)) / 100
              )}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">
              Other Expenses
            </span>
            <span className="font-medium">
              {formatCurrency(parseFloat(projectedOtherExpenses) * 12)}
            </span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold">
            <span>Total Operating Expenses</span>
            <span className="text-red-600">
              {formatCurrency(totalExpenses)}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
