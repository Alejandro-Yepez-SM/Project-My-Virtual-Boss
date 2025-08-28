export interface UnitData {
  id: number;
  currentRent: number;
  repairCosts: number;
  potentialRent: number;
  marketValue: number;
  bedrooms: number;
  bathrooms: number;
}

export interface RenovationItem {
  id: number;
  category: string;
  cost: number;
}

export interface CalculationResults {
  totalIncome: number;
  totalExpenses: number;
  netOperatingIncome: number;
  capRate: number;
  cashOnCashReturn: number;
  totalCashInvested: number;
  annualCashFlow: number;
  monthlyUnits: number;
  currentCapRate: number;
  improvedCapRate: number;
  totalRepairCosts: number;
  totalIncomeIncrease: number;
  valueGain: number;
  debtServiceCoverageRatio: number;
  projections: {
    year3: ProjectionYear;
    year5: ProjectionYear;
  };
}

export interface ProjectionYear {
  rent: number;
  propertyValue: number;
  cashFlow: number;
  equity: number;
  capRate: number;
  roi: number;
}

export type PropertyFormValues = {
  // Property details
  propertyValue: string;
  downPayment: string;
  closingCosts: string;
  renovationCosts: string;

  // Renovation items
  renovationItems: RenovationItem[];
  nextRenovationId: number;

  // Unit configuration
  numberOfUnits: string;
  units: UnitData[];

  // Income
  otherIncome: string;

  // Current Expenses
  currentInsurance: string;
  currentPropertyTaxes: string;
  currentMaintenance: string;
  currentManagementPercent: string;
  currentVacancy: string;
  currentOtherExpenses: string;

  // Projected Expenses
  projectedInsurance: string;
  projectedPropertyTaxes: string;
  projectedMaintenance: string;
  projectedManagementPercent: string;
  projectedVacancy: string;
  projectedOtherExpenses: string;

  // Mortgage details
  loanAmount: string;
  interestRate: string;
  loanTerm: string;

  // Target analysis
  targetCapRate: string;
  targetCashOnCash: string;
};
