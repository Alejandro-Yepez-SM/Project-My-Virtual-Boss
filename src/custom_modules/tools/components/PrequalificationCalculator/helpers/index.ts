import {
  CalculationResult,
  CashToCloseAnalysis,
  LOAN_PROGRAMS,
  LoanProgram,
  PaymentBreakdown,
} from "../interfaces";

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatPercentage = (ratio: number): string => {
  return `${ratio.toFixed(1)}%`;
};

export const calculateMonthlyPayment = (
  principal: number,
  rate: number,
  years: number
): number => {
  const monthlyRate = rate / 100 / 12;
  const numPayments = years * 12;
  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1)
  );
};

export const calculateCashToClose = (
  loanAmount: number,
  loanProgram: LoanProgram,
  downPaymentAmount: string,
  closingCostPercentage: string
): CashToCloseAnalysis => {
  const totalLoanAmount = loanAmount;
  const purchasePrice = totalLoanAmount + parseFloat(downPaymentAmount);
  const fundsAvailable = parseFloat(downPaymentAmount);

  // Determine minimum down payment percentage based on loan program
  let minDownPaymentPercentage: number;
  if (loanProgram.name === "FHA") {
    minDownPaymentPercentage = 3.5; // FHA minimum 3.5%
  } else {
    minDownPaymentPercentage = 5.0; // Conventional minimum (can be 3% for first-time buyers)
  }

  const minDownPaymentRequired =
    purchasePrice * (minDownPaymentPercentage / 100);
  const downPaymentPercentage = (fundsAvailable / purchasePrice) * 100;

  // Calculate closing costs based on purchase price
  const closingCosts =
    purchasePrice * (parseFloat(closingCostPercentage) / 100);

  // Total cash needed
  const totalCashNeeded = minDownPaymentRequired + closingCosts;

  // Check if borrower has enough funds
  const hasEnoughCash = fundsAvailable >= totalCashNeeded;
  const cashShortfall = hasEnoughCash ? 0 : totalCashNeeded - fundsAvailable;

  // Calculate seller concession suggestions
  let suggestedClosingCostReduction = 0;
  let remainingDeficiency = 0;

  if (cashShortfall > 0) {
    // First, try to reduce closing costs (seller concessions)
    suggestedClosingCostReduction = Math.min(cashShortfall, closingCosts);
    remainingDeficiency = Math.max(0, cashShortfall - closingCosts);
  }

  return {
    downPaymentRequired: minDownPaymentRequired,
    downPaymentPercentage: downPaymentPercentage,
    closingCosts: closingCosts,
    totalCashNeeded: totalCashNeeded,
    hasEnoughCash: hasEnoughCash,
    cashShortfall: cashShortfall,
    suggestedClosingCostReduction: suggestedClosingCostReduction,
    remainingDeficiency: remainingDeficiency,
  };
};

export const calculatePrequalification = ({
  monthlyIncome,
  monthlyDebts,
  downPaymentAmount,
  interestRate,
  propertyTaxRate,
  insuranceRate,
  hoaFees,
  closingCostPercentage,
}: {
  monthlyIncome: string;
  monthlyDebts: string;
  downPaymentAmount: string;
  interestRate: string;
  propertyTaxRate: string;
  insuranceRate: string;
  hoaFees: string;
  closingCostPercentage: string;
}): CalculationResult[] | undefined => {
  const PMI_RATE = 0.005 / 12; // 0.5% annually for loans with < 20% down

  const income = parseFloat(monthlyIncome);
  const debts = parseFloat(monthlyDebts || "0");
  const downPayment = parseFloat(downPaymentAmount);
  const rate = parseFloat(interestRate);
  const propTaxRate = parseFloat(propertyTaxRate) / 100 / 12; // Annual % to monthly decimal
  const insRate = parseFloat(insuranceRate) / 100 / 12; // Annual % to monthly decimal
  const monthlyHoaFees = parseFloat(hoaFees || "0");

  if (!income || income <= 0 || !downPayment || downPayment <= 0) return;

  const calculationResults: CalculationResult[] = [];

  LOAN_PROGRAMS.forEach((program) => {
    // Calculate maximum housing payment based on housing ratio
    const maxHousingPayment = income * (program.housingRatio / 100);

    // Calculate maximum total payment based on total debt ratio
    const maxTotalPayment = income * (program.totalRatio / 100);
    const maxHousingFromTotal = maxTotalPayment - debts;

    // Use the more restrictive of the two
    const actualMaxHousingPayment = Math.min(
      maxHousingPayment,
      maxHousingFromTotal
    );

    if (actualMaxHousingPayment <= 0) {
      const emptyCashToClose: CashToCloseAnalysis = {
        downPaymentRequired: 0,
        downPaymentPercentage: 0,
        closingCosts: 0,
        totalCashNeeded: 0,
        hasEnoughCash: false,
        cashShortfall: 0,
        suggestedClosingCostReduction: 0,
        remainingDeficiency: 0,
      };

      calculationResults.push({
        monthlyHousingPayment: 0,
        maxLoanAmount: 0,
        qualifies: false,
        loanProgram: program,
        housingRatioUsed: (maxHousingPayment / income) * 100,
        totalRatioUsed: ((maxHousingPayment + debts) / income) * 100,
        cashToClose: emptyCashToClose,
        paymentBreakdown: {
          principalAndInterest: 0,
          propertyTaxes: 0,
          homeownersInsurance: 0,
          mortgageInsurance: 0,
          hoaFees: 0,
          totalMonthlyPayment: 0,
        },
      });
      return;
    }

    // Calculate maximum home price and loan amount
    let bestHomePrice = 0;
    let bestLoanAmount = 0;
    let bestMonthlyPayment = 0;

    // Start with a reasonable estimate and iterate to find maximum affordable home
    for (
      let testHomePrice = 100000;
      testHomePrice <= 3000000;
      testHomePrice += 5000
    ) {
      const loanAmount = testHomePrice - downPayment;

      // Skip if loan amount is negative or too small
      if (loanAmount <= 0) continue;

      const downPaymentPercent = downPayment / testHomePrice;
      const principalAndInterest = calculateMonthlyPayment(
        loanAmount,
        rate,
        30
      );
      const propertyTax = testHomePrice * propTaxRate;
      const insurance = testHomePrice * insRate;
      const pmi = downPaymentPercent < 0.2 ? loanAmount * PMI_RATE : 0;

      const totalMonthlyPayment =
        principalAndInterest + propertyTax + insurance + pmi + monthlyHoaFees;

      if (totalMonthlyPayment <= actualMaxHousingPayment) {
        bestHomePrice = testHomePrice;
        bestLoanAmount = loanAmount;
        bestMonthlyPayment = totalMonthlyPayment;
      } else {
        break;
      }
    }

    const housingRatio = (bestMonthlyPayment / income) * 100;
    const totalRatio = ((bestMonthlyPayment + debts) / income) * 100;

    // Calculate cash to close analysis
    const cashToClose = calculateCashToClose(
      bestLoanAmount,
      program,
      downPaymentAmount,
      closingCostPercentage
    );

    // Calculate detailed payment breakdown for best case
    const finalHomePrice = bestLoanAmount + downPayment;
    const finalDownPaymentPercent = downPayment / finalHomePrice;
    const finalPrincipalAndInterest = calculateMonthlyPayment(
      bestLoanAmount,
      rate,
      30
    );
    const finalPropertyTax = finalHomePrice * propTaxRate;
    const finalInsurance = finalHomePrice * insRate;
    const finalPmi =
      finalDownPaymentPercent < 0.2 ? bestLoanAmount * PMI_RATE : 0;

    const paymentBreakdown: PaymentBreakdown = {
      principalAndInterest: finalPrincipalAndInterest,
      propertyTaxes: finalPropertyTax,
      homeownersInsurance: finalInsurance,
      mortgageInsurance: finalPmi,
      hoaFees: monthlyHoaFees,
      totalMonthlyPayment: bestMonthlyPayment,
    };

    calculationResults.push({
      monthlyHousingPayment: bestMonthlyPayment,
      maxLoanAmount: bestLoanAmount,
      qualifies:
        housingRatio <= program.housingRatio &&
        totalRatio <= program.totalRatio &&
        bestLoanAmount > 0,
      loanProgram: program,
      housingRatioUsed: housingRatio,
      totalRatioUsed: totalRatio,
      cashToClose: cashToClose,
      paymentBreakdown: paymentBreakdown,
    });
  });

  return calculationResults;
};
