import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { Calculator } from "lucide-react";
import { CalculationResults, PropertyFormValues } from "./interfaces";
import { FormProvider, useForm } from "react-hook-form";
import {
  calculateInvestmentAnalysis,
  getTotalRenovationCost,
  getTotalRepairCosts,
} from "./helpers";
import { Financing } from "./widgets/forms/financing";
import { PropertyInformationForm } from "./widgets/forms/propertyInformationForm";
import { ItemizedRenovationCost } from "./widgets/forms/itemizedRenovationCost";
import { UnitDetails } from "./widgets/forms/unitDetails";
import { Expenses } from "./widgets/forms/expenses";
import { TargetingAnalysisSection } from "./widgets/forms/targetingAnalysisSection";
import { InvestmentAnalysisResuls } from "./widgets/results";

export const renovationCategories = [
  "Landscaping",
  "Roof",
  "Painting/Pressure Washing",
  "Doors and Windows",
  "Lighting and Security",
  "Kitchen",
  "Bathroom",
  "Flooring",
  "HVAC",
  "Plumbing",
  "Electrical",
  "Other",
];

const defaultValues = {
  // Property details
  propertyValue: "500000",
  downPayment: "100000",
  closingCosts: "15000",
  renovationCosts: "0",

  // Renovation items
  renovationItems: [],
  nextRenovationId: 1,

  // Unit configuration
  numberOfUnits: "1",
  units: [
    {
      id: 1,
      currentRent: 0,
      repairCosts: 0,
      potentialRent: 0,
      marketValue: 0,
      bedrooms: 0,
      bathrooms: 0,
    },
  ],

  // Income
  otherIncome: "0",

  // Current Expenses
  currentInsurance: "200",
  currentPropertyTaxes: "400",
  currentMaintenance: "300",
  currentManagementPercent: "8",
  currentVacancy: "5",
  currentOtherExpenses: "100",

  // Projected Expenses
  projectedInsurance: "250",
  projectedPropertyTaxes: "500",
  projectedMaintenance: "400",
  projectedManagementPercent: "8",
  projectedVacancy: "3",
  projectedOtherExpenses: "150",

  // Mortgage
  loanAmount: "400000",
  interestRate: "7.5",
  loanTerm: "30",

  // Target Analysis
  targetCapRate: "8",
  targetCashOnCash: "12",
};

export default function InvestmentAnalysisCalculator() {
  const methods = useForm<PropertyFormValues>({
    defaultValues,
  });

  const { handleSubmit, reset, watch, setValue } = methods;

  const onSubmit = (formData: PropertyFormValues) => {
    setShowResults(false); // Reset to show fresh resultss
    const calculationResults = calculateInvestmentAnalysis(formData);
    setResults(calculationResults);
    setShowResults(true);
  };

  const [results, setResults] = useState<CalculationResults | null>(null);
  const [showResults, setShowResults] = useState(false);

  const units = watch("units");
  const renovationItems = watch("renovationItems");

  // Auto-calculate total renovation costs when components change
  useEffect(() => {
    const repairTotal = getTotalRepairCosts(units);
    const itemizedTotal = getTotalRenovationCost(renovationItems);
    const total = repairTotal + itemizedTotal;
    setValue("renovationCosts", total.toString());
  }, [renovationItems, units]);

  // Update units when number changes

  const resetCalculator = () => {
    reset(defaultValues);
    setResults(null);
    setShowResults(false);
  };

  return (
    <FormProvider {...methods}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-6 w-6 text-primary" />
            Investment Analysis Calculator
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Calculate cap rates and cash-on-cash returns for rental properties
            (1-100 units)
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {!showResults ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Property Information */}
              <PropertyInformationForm />

              {/* Itemized Renovation Costs */}
              <ItemizedRenovationCost />

              <Separator />

              {/* Unit Details */}
              <UnitDetails />

              <Separator />

              {/* Expenses */}
              <Expenses />

              <Separator />

              {/* Financing */}
              <Financing />

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate Investment Analysis
                </Button>
              </div>
            </form>
          ) : (
            <>
              {/* Results Display */}
              <div className="space-y-6">
                <InvestmentAnalysisResuls
                  resetCalculator={resetCalculator}
                  setShowResults={setShowResults}
                  results={results}
                />
                <TargetingAnalysisSection results={results} />
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </FormProvider>
  );
}
