import { BreakdownItem, NetSheetFormValues } from "../interfaces";

export const detectStateFromZip = (zip: string): string => {
  if (!zip || zip.length < 5) return "DEFAULT";

  const zipNum = parseInt(zip.substring(0, 5));

  // California: 90000-96699
  if (zipNum >= 90000 && zipNum <= 96699) return "CA";
  // New York: 10000-14999
  if (zipNum >= 10000 && zipNum <= 14999) return "NY";
  // New Jersey: 07000-08999
  if (zipNum >= 7000 && zipNum <= 8999) return "NJ";
  // Florida: 32000-34999
  if (zipNum >= 32000 && zipNum <= 34999) return "FL";
  // Texas: 75000-79999, 77000-77999
  if (
    (zipNum >= 75000 && zipNum <= 79999) ||
    (zipNum >= 77000 && zipNum <= 77999)
  )
    return "TX";
  // Washington: 98000-99499
  if (zipNum >= 98000 && zipNum <= 99499) return "WA";
  // Illinois: 60000-62999
  if (zipNum >= 60000 && zipNum <= 62999) return "IL";
  // Pennsylvania: 15000-19699
  if (zipNum >= 15000 && zipNum <= 19699) return "PA";
  // Ohio: 43000-45999
  if (zipNum >= 43000 && zipNum <= 45999) return "OH";
  // Georgia: 30000-31999
  if (zipNum >= 30000 && zipNum <= 31999) return "GA";
  // North Carolina: 27000-28999
  if (zipNum >= 27000 && zipNum <= 28999) return "NC";

  return "DEFAULT";
};

export const calculateNetSheet = ({
  salePrice,
  mortgageBalance,
  commissionRate,
  repairs,
  homeWarranty,
  zipCode,
}: NetSheetFormValues) => {
  const grossPrice = parseFloat(salePrice);
  const mortgage = parseFloat(mortgageBalance || "0");
  const commission = parseFloat(commissionRate);
  const repairCosts = parseFloat(repairs || "0");
  const warranty = parseFloat(homeWarranty || "0");

  if (!grossPrice || grossPrice <= 0) return;

  const state = detectStateFromZip(zipCode);
  const costs = GEOGRAPHIC_COSTS[state] || GEOGRAPHIC_COSTS.DEFAULT;

  const breakdownItems: BreakdownItem[] = [];
  let totalDeductions = 0;

  // Mortgage payoff
  if (mortgage > 0) {
    breakdownItems.push({
      category: "Loan Payoff",
      description: "Existing mortgage balance",
      amount: mortgage,
      percentage: (mortgage / grossPrice) * 100,
    });
    totalDeductions += mortgage;
  }

  // Real estate commission
  const commissionAmount = grossPrice * (commission / 100);
  breakdownItems.push({
    category: "Real Estate Commission",
    description: `${commission}% total commission`,
    amount: commissionAmount,
    percentage: commission,
  });
  totalDeductions += commissionAmount;

  // Transfer tax
  const transferTaxAmount = grossPrice * (costs.transferTax / 100);
  if (transferTaxAmount > 0) {
    breakdownItems.push({
      category: "Transfer Tax",
      description: `${costs.stateName} transfer tax`,
      amount: transferTaxAmount,
      percentage: costs.transferTax,
    });
    totalDeductions += transferTaxAmount;
  }

  // Title insurance
  const titleAmount = grossPrice * (costs.titleInsurance / 100);
  breakdownItems.push({
    category: "Title Insurance",
    description: "Owner's title insurance policy",
    amount: titleAmount,
    percentage: costs.titleInsurance,
  });
  totalDeductions += titleAmount;

  // Attorney fees (if applicable)
  if (costs.attorneyFees > 0) {
    breakdownItems.push({
      category: "Attorney Fees",
      description: "Legal representation at closing",
      amount: costs.attorneyFees,
      percentage: (costs.attorneyFees / grossPrice) * 100,
    });
    totalDeductions += costs.attorneyFees;
  }

  // Recording fees
  breakdownItems.push({
    category: "Recording Fees",
    description: "Document recording with county",
    amount: costs.recordingFees,
    percentage: (costs.recordingFees / grossPrice) * 100,
  });
  totalDeductions += costs.recordingFees;

  // Escrow/settlement fees
  const escrowAmount = grossPrice * (costs.escrowFees / 100);
  breakdownItems.push({
    category: "Escrow/Settlement Fees",
    description: "Third-party transaction management",
    amount: escrowAmount,
    percentage: costs.escrowFees,
  });
  totalDeductions += escrowAmount;

  // Property taxes (prorated - assume 6 months average)
  const propertyTaxAmount = (grossPrice * (costs.propertyTaxRate / 100)) / 2;
  breakdownItems.push({
    category: "Prorated Property Taxes",
    description: "Property taxes through closing date",
    amount: propertyTaxAmount,
    percentage: (propertyTaxAmount / grossPrice) * 100,
  });
  totalDeductions += propertyTaxAmount;

  // Repairs/concessions
  if (repairCosts > 0) {
    breakdownItems.push({
      category: "Repairs/Concessions",
      description: "Negotiated repairs or buyer concessions",
      amount: repairCosts,
      percentage: (repairCosts / grossPrice) * 100,
    });
    totalDeductions += repairCosts;
  }

  // Home warranty
  if (warranty > 0) {
    breakdownItems.push({
      category: "Home Warranty",
      description: "One-year home warranty for buyer",
      amount: warranty,
      percentage: (warranty / grossPrice) * 100,
    });
    totalDeductions += warranty;
  }

  const netProceeds = grossPrice - totalDeductions;

  return {
    grossSalePrice: grossPrice,
    totalDeductions: totalDeductions,
    netProceeds: netProceeds,
    breakdownItems: breakdownItems.sort((a, b) => b.amount - a.amount),
  };
};

export const GEOGRAPHIC_COSTS: Record<
  string,
  {
    transferTax: number;
    titleInsurance: number;
    attorneyFees: number;
    recordingFees: number;
    escrowFees: number;
    propertyTaxRate: number;
    stateName: string;
  }
> = {
  // High-cost states/metros
  CA: {
    // California
    transferTax: 0.55, // $0.55 per $1000 (varies by county)
    titleInsurance: 0.8,
    attorneyFees: 0,
    recordingFees: 150,
    escrowFees: 0.2,
    propertyTaxRate: 0.75,
    stateName: "California",
  },
  NY: {
    // New York
    transferTax: 4.0, // $2 per $1000 + mansion tax for $1M+
    titleInsurance: 0.6,
    attorneyFees: 1500,
    recordingFees: 200,
    escrowFees: 0.1,
    propertyTaxRate: 1.68,
    stateName: "New York",
  },
  NJ: {
    // New Jersey
    transferTax: 1.0, // ~1% varies by location
    titleInsurance: 0.7,
    attorneyFees: 1200,
    recordingFees: 100,
    escrowFees: 0.15,
    propertyTaxRate: 1.79,
    stateName: "New Jersey",
  },
  FL: {
    // Florida
    transferTax: 0.7, // $0.70 per $1000
    titleInsurance: 0.5,
    attorneyFees: 800,
    recordingFees: 75,
    escrowFees: 0.25,
    propertyTaxRate: 0.83,
    stateName: "Florida",
  },
  TX: {
    // Texas
    transferTax: 0, // No state transfer tax
    titleInsurance: 0.9,
    attorneyFees: 0,
    recordingFees: 50,
    escrowFees: 0.2,
    propertyTaxRate: 1.6,
    stateName: "Texas",
  },
  WA: {
    // Washington
    transferTax: 1.28, // Varies by county
    titleInsurance: 0.8,
    attorneyFees: 0,
    recordingFees: 100,
    escrowFees: 0.3,
    propertyTaxRate: 0.94,
    stateName: "Washington",
  },
  IL: {
    // Illinois
    transferTax: 1.5, // $1.50 per $1000
    titleInsurance: 0.7,
    attorneyFees: 1000,
    recordingFees: 150,
    escrowFees: 0.2,
    propertyTaxRate: 2.16,
    stateName: "Illinois",
  },
  PA: {
    // Pennsylvania
    transferTax: 1.0, // 1% usually split with buyer
    titleInsurance: 0.5,
    attorneyFees: 1200,
    recordingFees: 100,
    escrowFees: 0.1,
    propertyTaxRate: 1.58,
    stateName: "Pennsylvania",
  },
  OH: {
    // Ohio
    transferTax: 0.4, // $4 per $1000
    titleInsurance: 0.6,
    attorneyFees: 800,
    recordingFees: 75,
    escrowFees: 0.15,
    propertyTaxRate: 1.52,
    stateName: "Ohio",
  },
  GA: {
    // Georgia
    transferTax: 0.1, // $1 per $1000
    titleInsurance: 0.7,
    attorneyFees: 800,
    recordingFees: 50,
    escrowFees: 0.2,
    propertyTaxRate: 0.83,
    stateName: "Georgia",
  },
  NC: {
    // North Carolina
    transferTax: 0.2, // $2 per $1000
    titleInsurance: 0.6,
    attorneyFees: 1000,
    recordingFees: 75,
    escrowFees: 0.15,
    propertyTaxRate: 0.84,
    stateName: "North Carolina",
  },
  DEFAULT: {
    // National average for other locations
    transferTax: 0.5,
    titleInsurance: 0.7,
    attorneyFees: 800,
    recordingFees: 100,
    escrowFees: 0.2,
    propertyTaxRate: 1.07,
    stateName: "Other Location",
  },
};
