import { Building } from "lucide-react";
import { CurrentExpenses } from "./currentExpenses";
import { ProjectedExpenses } from "./projectedExpenses";

export const Expenses = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-3">
        <Building className="h-5 w-5 text-orange-600" />
        <h3 className="text-lg font-semibold">Monthly Expenses</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Expenses */}
        <CurrentExpenses />

        {/* Projected Expenses */}
        <ProjectedExpenses />
      </div>
    </div>
  );
};
