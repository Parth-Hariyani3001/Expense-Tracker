import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Edit2,
  Target,
  Trash2,
} from "lucide-react";
import type { BudgetSummary } from "./budgetTypes";
import BudgetProgress from "./BudgetProgress";
import { formatCurrency } from "../../utils/helpers";

function getBudgetStatus(progress: number) {
  if (progress >= 100)
    return {
      color: "text-red-600",
      icon: AlertTriangle,
      label: "Over Budget",
    };

  if (progress >= 80)
    return {
      color: "text-yellow-600",
      icon: Clock,
      label: "Near Limit",
    };

  return {
    color: "text-green-600",
    icon: CheckCircle,
    label: "On Track",
  };
}

function BudgetItem({ budget }: { budget: BudgetSummary }) {
  const {
    parent_category_id: id,
    budget_amount: budgetAmount,
    remaining_budget: remainingBudget,
    spent_amount: spentAmount,
    parent_category: category,
    parent_category_color: categoryColor,
    budget_period_from: periodFrom,
    budget_period_end: periodTo,
  } = budget;

  const isLoading = false;
  const isExpanded = false;

  function toggleBudgetBreakdown(catId: number) {
    console.log(catId);
  }

  const percentageProgress =
    budgetAmount > 0 ? (spentAmount / budgetAmount) * 100 : 0;

  const status = getBudgetStatus(percentageProgress);
  const StatusIcon = status.icon;

  function placeholderMethod() {
    console.log("placeholder");
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div
            className={`w-4 h-4 rounded-full`}
            style={{ backgroundColor: categoryColor }}
          ></div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {category}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {periodFrom} to {periodTo}
            </p>
          </div>
        </div>

        {/* Right side status and buttons */}
        <div className="flex items-center space-x-2">
          <div className={`flex items-center space-x-1 ${status.color}`}>
            <StatusIcon className="w-4 h-4" />
            <span className="text-sm font-medium">{status.label}</span>
          </div>
          <button
            onClick={placeholderMethod}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-300"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={placeholderMethod}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-300"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Budget Amount
          </span>
          <span className="font-semibold text-gray-900 dark:text-white">
            ₹{formatCurrency(Number(budgetAmount.toFixed(2)))}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Spent
          </span>
          <span className="font-semibold text-red-600">
            ₹{formatCurrency(Number((spentAmount || 0).toFixed(2)))}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Remaining
          </span>
          <span
            className={`font-semibold ${
              Number(remainingBudget || 0) >= 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            ₹{formatCurrency(Number((remainingBudget || 0).toFixed(2)))}
          </span>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Progress
            </span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {percentageProgress}%
            </span>
          </div>
          <BudgetProgress progress={percentageProgress} />
        </div>

        {/* breakdown section */}
        <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
          <button
            onClick={() => toggleBudgetBreakdown(id)}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-300 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                Loading breakdown...
              </>
            ) : (
              <>
                <Target className="w-4 h-4" />
                {isExpanded ? "Hide Breakdown" : "Show Breakdown"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BudgetItem;
