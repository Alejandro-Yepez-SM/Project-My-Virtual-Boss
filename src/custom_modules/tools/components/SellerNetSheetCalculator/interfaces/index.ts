export type NetSheetFormValues = {
  salePrice: string;
  zipCode: string;
  mortgageBalance: string;
  commissionRate: string;
  repairs: string;
  homeWarranty: string;
  detectedState: string;
};

export interface NetSheetResult {
  grossSalePrice: number;
  totalDeductions: number;
  netProceeds: number;
  breakdownItems: BreakdownItem[];
}

export interface BreakdownItem {
  category: string;
  description: string;
  amount: number;
  percentage: number;
}
