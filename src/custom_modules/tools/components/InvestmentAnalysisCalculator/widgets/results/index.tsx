import { Button } from "@/components/ui/button";
import { Edit, RotateCcw } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { CalculationResults, PropertyFormValues } from "../../interfaces";
import { CurrentPerformance } from "./currentPerformance";
import { AfterImprovements } from "./afterImprovements";
import { GainAnalysis } from "./gainAnalysis";
import { PerfomanceMetrics } from "./perfomanceMetrics";
import { FutureProjections } from "./futureProjections";
import { UnitByUnitAnalysis } from "./unitByUnitAnalysis";
import { DetailsBreakdown } from "./detailsBreakdown";
import { InvestMentSummary } from "./investMentSummary";

export const InvestmentAnalysisResuls = ({
  setShowResults,
  results,
  resetCalculator,
}: {
  results: CalculationResults | null;
  setShowResults: (show: boolean) => void;
  resetCalculator: () => void;
}) => {
  const { getValues } = useFormContext<PropertyFormValues>();

  const formValues = getValues();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Investment Analysis Results</h3>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowResults(false)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Inputs
          </Button>
          <Button variant="destructive" onClick={resetCalculator}>
            <RotateCcw className="h-4 w-4 mr-2" />
            New Analysis
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      {results && (
        <div className="space-y-6">
          {/* Current vs Improved Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CurrentPerformance
              currentCapRate={results.currentCapRate}
              units={formValues.units}
              propertyValue={formValues.propertyValue}
            />
            <AfterImprovements
              improvedCapRate={results.improvedCapRate}
              units={formValues.units}
              propertyValue={formValues.propertyValue}
              totalRepairCosts={results.totalRepairCosts}
            />
          </div>

          {/* Value Gain Analysis */}
          <GainAnalysis
            totalRepairCosts={results.totalRepairCosts}
            valueGain={results.valueGain}
            totalIncomeIncrease={results.totalIncomeIncrease}
          />

          {/* Performance Metrics */}
          <PerfomanceMetrics
            cashOnCashReturn={results.cashOnCashReturn}
            annualCashFlow={results.cashOnCashReturn}
            netOperatingIncome={results.netOperatingIncome}
            debtServiceCoverageRatio={results.debtServiceCoverageRatio}
          />

          {/* Future Projections */}
          <FutureProjections
            projections={{
              year3: results.projections.year3,
              year5: results.projections.year5,
            }}
          />
        </div>
      )}

      {/* Unit-by-Unit Analysis */}
      <UnitByUnitAnalysis units={formValues.units} />

      {/* Detailed Breakdown */}
      {results && (
        <DetailsBreakdown
          monthlyUnits={results.monthlyUnits}
          currentVacancy={formValues.currentVacancy}
          otherIncome={formValues.otherIncome}
          projectedVacancy={formValues.projectedVacancy}
          units={formValues.units}
          totalIncome={results.totalIncome}
          projectedInsurance={formValues.projectedInsurance}
          projectedPropertyTaxes={formValues.projectedPropertyTaxes}
          projectedMaintenance={formValues.projectedMaintenance}
          projectedManagementPercent={formValues.projectedManagementPercent}
          projectedOtherExpenses={formValues.projectedOtherExpenses}
          totalExpenses={results.totalExpenses}
        />
      )}

      {/* Investment Summary */}
      {results && (
        <InvestMentSummary
          totalCashInvested={results.totalCashInvested}
          downPayment={formValues.downPayment}
          closingCosts={formValues.closingCosts}
          renovationCosts={formValues.renovationCosts}
          loanAmount={formValues.loanAmount}
          interestRate={formValues.interestRate}
          loanTerm={formValues.loanTerm}
          capRate={results.capRate}
          cashOnCashReturn={results.cashOnCashReturn}
          annualCashFlow={results.annualCashFlow}
        />
      )}
    </div>
  );
};
