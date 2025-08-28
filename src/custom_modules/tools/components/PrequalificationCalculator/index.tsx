import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calculator } from "lucide-react";
import { CalculationResult, PrequalificationFormValues } from "./interfaces";
import { PrequalificationForm } from "./widgets/prequalificationForm";
import { PrequalificationResuls } from "./widgets/prequalificationResuls";
import { FormProvider, useForm } from "react-hook-form";

const defaultValues = {
  monthlyIncome: "",
  monthlyDebts: "",
  downPaymentAmount: "",
  interestRate: "7.0",
  propertyTaxRate: "1.5",
  insuranceRate: "0.35",
  hoaFees: "",
  closingCostPercentage: "3.0",
};

export default function PrequalificationCalculator() {
  const [results, setResults] = useState<CalculationResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const methods = useForm<PrequalificationFormValues>({
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-6 w-6 text-primary" />
            Mortgage Prequalification Calculator
          </CardTitle>
          <CardDescription>
            Calculate how much house your client can afford based on their
            income and debts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!showResults ? (
            <PrequalificationForm
              setResults={setResults}
              setShowResults={setShowResults}
            />
          ) : (
            <PrequalificationResuls
              results={results}
              defaultValues={defaultValues}
              setShowResults={setShowResults}
            />
          )}
        </CardContent>
      </Card>
    </FormProvider>
  );
}
