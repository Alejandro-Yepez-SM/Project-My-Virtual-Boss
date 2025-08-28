import { Calculator } from "lucide-react";
import { MortgageCalculation, MortgageFormValues } from "./interfaces";
import { MortgageCalculatorResults } from "./widgets/mortgageCalculatorResults";
import { FormProvider, useForm } from "react-hook-form";
import { MortgageCalculatorForm } from "./widgets/mortgageCalculatorForm";
import { useEffect, useState } from "react";
import { calculateMortgage } from "./helpers";

export default function MortgageCalculator() {
  const [isDownPaymentPercent, setIsDownPaymentPercent] =
    useState<boolean>(true);

  const methods = useForm<MortgageFormValues>({
    defaultValues: {
      homePrice: "450000",
      downPayment: "90000",
      downPaymentPercent: "20",
      interestRate: "7.25",
      loanTerm: "30",
      propertyTaxRate: "1.2",
      homeInsurance: "1800",
      pmiRate: "0.5",
      hoaFees: "0",
    },
  });

  const { watch, setValue } = methods;

  const homePrice = watch("homePrice");
  const downPayment = watch("downPayment");
  const downPaymentPercent = watch("downPaymentPercent");
  const interestRate = watch("interestRate");
  const loanTerm = watch("loanTerm");
  const propertyTaxRate = watch("propertyTaxRate");
  const homeInsurance = watch("homeInsurance");
  const pmiRate = watch("pmiRate");
  const hoaFees = watch("hoaFees");

  // Calculated values
  const [calculation, setCalculation] = useState<MortgageCalculation | null>(
    null
  );

  // Update down payment when switching between dollar and percentage
  useEffect(() => {
    const price = parseFloat(homePrice) || 0;
    const downDollar = parseFloat(downPayment) || 0;
    const downPercent = parseFloat(downPaymentPercent) || 0;

    if (isDownPaymentPercent && price > 0) {
      setValue("downPayment", ((price * downPercent) / 100).toString());
    } else if (!isDownPaymentPercent && price > 0 && downDollar > 0) {
      setValue("downPaymentPercent", ((downDollar / price) * 100).toFixed(1));
    }
  }, [homePrice, downPaymentPercent, downPayment, isDownPaymentPercent]);

  // Auto-calculate when inputs change
  useEffect(() => {
    const results = calculateMortgage({
      homePrice,
      downPayment,
      interestRate,
      loanTerm,
      propertyTaxRate,
      homeInsurance,
      pmiRate,
      hoaFees,
    });
    if (results) {
      setCalculation(results);
    }
  }, [
    homePrice,
    downPayment,
    interestRate,
    loanTerm,
    propertyTaxRate,
    homeInsurance,
    pmiRate,
    hoaFees,
  ]);

  return (
    <FormProvider {...methods}>
      <div className="space-y-6">
        {/* Calculator Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Calculator className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-neutral-900">
              Mortgage Payment Calculator
            </h2>
          </div>
          <p className="text-neutral-600">
            Calculate monthly payments with detailed cost breakdown for
            homebuyers
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <MortgageCalculatorForm
            isDownPaymentPercent={isDownPaymentPercent}
            setIsDownPaymentPercent={setIsDownPaymentPercent}
          />

          {/* Results */}
          <MortgageCalculatorResults calculation={calculation} />
        </div>
      </div>
    </FormProvider>
  );
}
