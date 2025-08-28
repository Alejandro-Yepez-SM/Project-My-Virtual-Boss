import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calculator } from "lucide-react";
import { NetSheetFormValues, NetSheetResult } from "./interfaces";
import { SellerNetForm } from "./components/sellerNetForm";
import { FormProvider, useForm } from "react-hook-form";
import { SellerNetResults } from "./components/sellerNetResults";

const defaultValues = {
  salePrice: "",
  zipCode: "",
  mortgageBalance: "",
  commissionRate: "6.0",
  repairs: "",
  homeWarranty: "500",
  detectedState: "",
};

export default function SellerNetSheetCalculator() {
  const methods = useForm<NetSheetFormValues>({
    defaultValues,
  });

  const { reset } = methods;

  const [result, setResult] = useState<NetSheetResult | null>(null);
  const [showResults, setShowResults] = useState(false);

  const resetCalculator = () => {
    reset(defaultValues);
    setResult(null);
    setShowResults(false);
  };

  return (
    <FormProvider {...methods}>
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-6 w-6 text-primary" />
            Seller's Net Sheet Calculator
          </CardTitle>
          <CardDescription>
            Calculate your estimated net proceeds from the sale using
            location-specific costs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!showResults ? (
            <SellerNetForm
              setResult={setResult}
              setShowResults={setShowResults}
            />
          ) : (
            result && (
              <SellerNetResults
                result={result}
                setShowResults={setShowResults}
                resetCalculator={resetCalculator}
              />
            )
          )}
        </CardContent>
      </Card>
    </FormProvider>
  );
}
