import {
  CalculationResults,
  PropertyFormValues,
  RenovationItem,
  UnitData,
} from "../interfaces";

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatPercentage = (ratio: number): string => {
  return `${ratio.toFixed(2)}%`;
};

export const getTotalRepairCosts = (units: UnitData[]) => {
  return units.reduce((total, unit) => total + unit.repairCosts, 0);
};

export const getTotalRenovationCost = (renovationItems: RenovationItem[]) => {
  return renovationItems.reduce((total, item) => total + item.cost, 0);
};

export const calculateMonthlyMortgagePayment = (
  principal: number,
  rate: number,
  years: number
): number => {
  const monthlyRate = rate / 100 / 12;
  const numPayments = years * 12;
  if (monthlyRate === 0) return principal / numPayments;

  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1)
  );
};

export const calculateInvestmentAnalysis = ({
  otherIncome,
  units,
  currentVacancy,
  projectedVacancy,
  currentInsurance,
  currentPropertyTaxes,
  currentMaintenance,
  currentOtherExpenses,
  projectedInsurance,
  projectedPropertyTaxes,
  projectedMaintenance,
  projectedOtherExpenses,
  currentManagementPercent,
  projectedManagementPercent,
  loanAmount,
  interestRate,
  propertyValue,
  loanTerm,
  downPayment,
  closingCosts,
  renovationCosts,
}: PropertyFormValues) => {
  console.log("Starting investment analysis calculation...");
  const monthlyOtherIncome = parseFloat(otherIncome) || 0;

  // Calculate current and potential income from units
  const currentAnnualRentalIncome = units.reduce(
    (total, unit) => total + unit.currentRent * 12,
    0
  );
  const potentialAnnualRentalIncome = units.reduce(
    (total, unit) => total + unit.potentialRent * 12,
    0
  );
  const totalRepairCosts = units.reduce(
    (total, unit) => total + unit.repairCosts,
    0
  );

  const annualOtherIncome = monthlyOtherIncome * 12;
  const currentGrossIncome = currentAnnualRentalIncome + annualOtherIncome;
  const potentialGrossIncome = potentialAnnualRentalIncome + annualOtherIncome;

  // Vacancy adjustment
  const currentVacancyRate = parseFloat(currentVacancy) / 100 || 0;
  const projectedVacancyRate = parseFloat(projectedVacancy) / 100 || 0;
  const currentEffectiveIncome = currentGrossIncome * (1 - currentVacancyRate);
  const potentialEffectiveIncome =
    potentialGrossIncome * (1 - projectedVacancyRate);

  // Annual expenses - Current
  const currentAnnualInsurance = (parseFloat(currentInsurance) || 0) * 12;
  const currentAnnualPropertyTaxes =
    (parseFloat(currentPropertyTaxes) || 0) * 12;
  const currentAnnualMaintenance = (parseFloat(currentMaintenance) || 0) * 12;
  const currentAnnualOtherExpenses =
    (parseFloat(currentOtherExpenses) || 0) * 12;

  // Annual expenses - Projected
  const projectedAnnualInsurance = (parseFloat(projectedInsurance) || 0) * 12;
  const projectedAnnualPropertyTaxes =
    (parseFloat(projectedPropertyTaxes) || 0) * 12;
  const projectedAnnualMaintenance =
    (parseFloat(projectedMaintenance) || 0) * 12;
  const projectedAnnualOtherExpenses =
    (parseFloat(projectedOtherExpenses) || 0) * 12;

  // Management fees
  const currentManagementRate = parseFloat(currentManagementPercent) / 100 || 0;
  const projectedManagementRate =
    parseFloat(projectedManagementPercent) / 100 || 0;
  const currentManagementFees = currentEffectiveIncome * currentManagementRate;
  const projectedManagementFees =
    potentialEffectiveIncome * projectedManagementRate;

  const currentOperatingExpenses =
    currentAnnualInsurance +
    currentAnnualPropertyTaxes +
    currentAnnualMaintenance +
    currentManagementFees +
    currentAnnualOtherExpenses;
  const projectedOperatingExpenses =
    projectedAnnualInsurance +
    projectedAnnualPropertyTaxes +
    projectedAnnualMaintenance +
    projectedManagementFees +
    projectedAnnualOtherExpenses;

  // Net Operating Income
  const currentNOI = currentEffectiveIncome - currentOperatingExpenses;
  const projectedNOI = potentialEffectiveIncome - projectedOperatingExpenses;

  // Mortgage payment
  const loanPrincipal = parseFloat(loanAmount) || 0;
  const rate = parseFloat(interestRate) || 0;
  const years = parseInt(loanTerm) || 30;

  console.log("Calculating mortgage payment:", {
    loanPrincipal,
    rate,
    years,
  });

  const monthlyMortgagePayment =
    loanPrincipal > 0
      ? calculateMonthlyMortgagePayment(loanPrincipal, rate, years)
      : 0;

  console.log("Monthly mortgage payment:", monthlyMortgagePayment);
  const annualDebtService = monthlyMortgagePayment * 12;

  console.log("Annual debt service:", annualDebtService);
  console.log("Current NOI:", currentNOI);
  console.log("Projected NOI:", projectedNOI);

  // Cash flow
  const currentCashFlow = currentNOI - annualDebtService;
  const projectedCashFlow = projectedNOI - annualDebtService;

  // Cap rates
  const propValue = parseFloat(propertyValue) || 1;
  const currentCapRate = (currentNOI / propValue) * 100;
  const improvedPropertyValue = propValue + totalRepairCosts;
  const projectedCapRate = (projectedNOI / improvedPropertyValue) * 100;

  // Value gain calculation
  const valueGain = (projectedNOI - currentNOI) / (currentCapRate / 100);

  // Cash-on-cash return
  const downPmt = parseFloat(downPayment) || 0;
  const closing = parseFloat(closingCosts) || 0;
  const renovation = parseFloat(renovationCosts) || 0;
  const totalCashInvested = downPmt + closing + renovation;

  const cashOnCashReturn =
    totalCashInvested > 0 ? (projectedCashFlow / totalCashInvested) * 100 : 0;

  // Debt Service Coverage Ratio (DSCR)
  const debtServiceCoverageRatio =
    annualDebtService > 0 ? projectedNOI / annualDebtService : 0;

  // 3-year and 5-year projections
  const calculateProjections = (years: number) => {
    const rentGrowthRate = 0.05; // 5% annual rent increase
    const appreciationRate = 0.03; // 3% annual property appreciation

    const futureRent =
      potentialAnnualRentalIncome * Math.pow(1 + rentGrowthRate, years);
    const futureGrossIncome = futureRent + annualOtherIncome;
    const futureEffectiveIncome =
      futureGrossIncome * (1 - projectedVacancyRate);
    const futureNOI = futureEffectiveIncome - projectedOperatingExpenses;
    const futureCashFlow = futureNOI - annualDebtService;

    const futurePropertyValue =
      propValue * Math.pow(1 + appreciationRate, years);

    // Calculate equity (property value - remaining loan balance)
    // Start with the current loan balance as entered by user
    const currentLoanBalance = parseFloat(loanAmount) || 0;
    const monthlyPayments = years * 12;
    const monthlyRate = rate / 100 / 12;
    let remainingBalance = currentLoanBalance;

    if (monthlyRate > 0 && currentLoanBalance > 0) {
      // Calculate remaining balance after years of payments
      const loanTermYears = parseInt(loanTerm) || 30;
      const totalPayments = loanTermYears * 12;
      const monthlyPayment = monthlyMortgagePayment; // Use the already calculated payment

      // Calculate remaining balance after years of payments using standard amortization
      const paymentsRemaining = totalPayments - monthlyPayments;
      if (paymentsRemaining > 0) {
        remainingBalance =
          monthlyPayment *
          ((Math.pow(1 + monthlyRate, paymentsRemaining) - 1) /
            (monthlyRate * Math.pow(1 + monthlyRate, paymentsRemaining)));
      } else {
        remainingBalance = 0; // Loan paid off
      }
    } else if (currentLoanBalance > 0) {
      // Simple calculation if no interest
      remainingBalance = Math.max(
        0,
        currentLoanBalance - monthlyMortgagePayment * monthlyPayments
      );
    }

    const equity = futurePropertyValue - Math.max(0, remainingBalance);

    // Calculate future cap rate and ROI
    const futureCapRate =
      futurePropertyValue > 0 ? (futureNOI / futurePropertyValue) * 100 : 0;
    const totalCashInvested = downPmt + closing + renovation;
    const futureROI =
      totalCashInvested > 0 ? (futureCashFlow / totalCashInvested) * 100 : 0;

    return {
      rent: futureRent,
      propertyValue: futurePropertyValue,
      cashFlow: futureCashFlow,
      equity: equity,
      capRate: futureCapRate,
      roi: futureROI,
    };
  };

  const projections = {
    year3: calculateProjections(3),
    year5: calculateProjections(5),
  };

  const calculationResults: CalculationResults = {
    totalIncome: potentialEffectiveIncome,
    totalExpenses: projectedOperatingExpenses,
    netOperatingIncome: projectedNOI,
    capRate: projectedCapRate,
    cashOnCashReturn,
    totalCashInvested,
    annualCashFlow: projectedCashFlow,
    monthlyUnits: units.length,
    currentCapRate,
    improvedCapRate: projectedCapRate,
    totalRepairCosts,
    totalIncomeIncrease:
      potentialAnnualRentalIncome - currentAnnualRentalIncome,
    valueGain,
    debtServiceCoverageRatio,
    projections,
  };

  return calculationResults;
};

export const calculateTargetAnalysis = (
  results: CalculationResults | null,
  {
    targetCapRate,
    targetCashOnCash,
  }: {
    targetCapRate: string;
    targetCashOnCash: string;
  }
) => {
  if (!results) return;

  const targetCapRateDecimal = parseFloat(targetCapRate) / 100 || 0.08;
  const targetCashOnCashDecimal = parseFloat(targetCashOnCash) / 100 || 0.12;

  // Calculate price based on desired cap rate
  // Cap Rate = NOI / Property Value, so Property Value = NOI / Cap Rate
  const capRateBasedPrice = results.netOperatingIncome / targetCapRateDecimal;

  // Calculate price based on desired cash-on-cash return
  // Cash-on-Cash = Cash Flow / Cash Invested
  // We need to work backwards: if we want X% return on our cash invested
  // And we know our cash flow after debt service
  const totalCashInvested = results.totalCashInvested;
  const desiredCashFlow = totalCashInvested * targetCashOnCashDecimal;

  // Current cash flow calculation: NOI - Debt Service
  // We need to find a price where: NOI - Debt Service = Desired Cash Flow
  // But NOI will change with property value (due to property taxes, etc.)
  // For simplicity, we'll use the current NOI and adjust for debt service
  const currentDebtService =
    results.netOperatingIncome - results.annualCashFlow;
  const requiredNOI = desiredCashFlow + currentDebtService;
  const cashOnCashBasedPrice = requiredNOI / targetCapRateDecimal;

  // Recommended price is the lower of the two (more conservative)
  const recommendedPrice = Math.min(capRateBasedPrice, cashOnCashBasedPrice);

  // Max offer price (assuming 90% of recommended for negotiation room)
  const maxOfferPrice = recommendedPrice * 0.9;

  return {
    recommendedPrice,
    maxOfferPrice,
    capRateBasedPrice,
    cashOnCashBasedPrice,
  };
};

export const calculateTargetAnalysiss = ({
  targetCapRate,
  targetCashOnCash,
  netOperatingIncome,
  annualCashFlow,
  totalCashInvested,
}: {
  targetCapRate: string;
  targetCashOnCash: string;
  netOperatingIncome: number;
  annualCashFlow: number;
  totalCashInvested: number;
}) => {
  const targetCapRateDecimal = parseFloat(targetCapRate) / 100 || 0.08;
  const targetCashOnCashDecimal = parseFloat(targetCashOnCash) / 100 || 0.12;

  // Calculate price based on desired cap rate
  // Cap Rate = NOI / Property Value, so Property Value = NOI / Cap Rate
  const capRateBasedPrice = netOperatingIncome / targetCapRateDecimal;

  // Calculate price based on desired cash-on-cash return
  // Cash-on-Cash = Cash Flow / Cash Invested
  // We need to work backwards: if we want X% return on our cash invested
  // And we know our cash flow after debt service
  const desiredCashFlow = totalCashInvested * targetCashOnCashDecimal;

  // Current cash flow calculation: NOI - Debt Service
  // We need to find a price where: NOI - Debt Service = Desired Cash Flow
  // But NOI will change with property value (due to property taxes, etc.)
  // For simplicity, we'll use the current NOI and adjust for debt service
  const currentDebtService = netOperatingIncome - annualCashFlow;
  const requiredNOI = desiredCashFlow + currentDebtService;
  const cashOnCashBasedPrice = requiredNOI / targetCapRateDecimal;

  // Recommended price is the lower of the two (more conservative)
  const recommendedPrice = Math.min(capRateBasedPrice, cashOnCashBasedPrice);

  // Max offer price (assuming 90% of recommended for negotiation room)
  const maxOfferPrice = recommendedPrice * 0.9;

  return {
    recommendedPrice,
    maxOfferPrice,
    capRateBasedPrice,
    cashOnCashBasedPrice,
  };
};
