export interface LoanProgram {
  name: string;
  housingRatio: number;
  totalRatio: number;
  description: string;
}

export interface CalculationResult {
  monthlyHousingPayment: number;
  maxLoanAmount: number;
  qualifies: boolean;
  loanProgram: LoanProgram;
  housingRatioUsed: number;
  totalRatioUsed: number;
  cashToClose: CashToCloseAnalysis;
  paymentBreakdown: PaymentBreakdown;
}

export interface PaymentBreakdown {
  principalAndInterest: number;
  propertyTaxes: number;
  homeownersInsurance: number;
  mortgageInsurance: number;
  hoaFees: number;
  totalMonthlyPayment: number;
}

export interface CashToCloseAnalysis {
  downPaymentRequired: number;
  downPaymentPercentage: number;
  closingCosts: number;
  totalCashNeeded: number;
  hasEnoughCash: boolean;
  cashShortfall: number;
  suggestedClosingCostReduction: number;
  remainingDeficiency: number;
}

export const LOAN_PROGRAMS: LoanProgram[] = [
  {
    name: "Conventional",
    housingRatio: 28,
    totalRatio: 36,
    description: "Standard conventional loan with competitive rates",
  },
  {
    name: "FHA",
    housingRatio: 31,
    totalRatio: 43,
    description: "Government-backed loan with more flexible requirements",
  },
];

export type PrequalificationFormValues = {
  monthlyIncome: string;
  monthlyDebts: string;
  downPaymentAmount: string;
  interestRate: string;
  propertyTaxRate: string;
  insuranceRate: string;
  hoaFees: string;
  closingCostPercentage: string;
};
