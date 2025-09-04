import { Calendar, Plus, Target, TrendingDown, TrendingUp } from "lucide-react";
import BudgetStatItem from "./BudgetStatItem";
import type { BudgetSummary } from "./budgetTypes";

function BudgetHeader({ budget }: { budget: BudgetSummary[] }) {
  function handlerMethod() {
    console.log("clicked");
  }

  // Calculate total budget for a time period
  const totalBudget = budget.reduce((acc, item) => item.budget_amount + acc, 0);

  // Calculate total spent for a time period
  const totalSpent = budget.reduce((acc, item) => item.spent_amount + acc, 0);

  // Calculate Total remaining
  const totalRemaining = totalBudget - totalSpent;

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Budget Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track and manage your spending budgets
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">This Month</span>
          </button>
          <button
            onClick={handlerMethod}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Budget</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BudgetStatItem
          Icon={Target}
          iconColor="blue"
          amount={Number(totalBudget)}
        >
          Total Budget
        </BudgetStatItem>

        <BudgetStatItem
          Icon={TrendingDown}
          iconColor="red"
          amount={Number(totalSpent)}
        >
          Total Spent
        </BudgetStatItem>

        <BudgetStatItem
          Icon={TrendingUp}
          iconColor="green"
          amount={Number(totalRemaining)}
        >
          Total Remaining
        </BudgetStatItem>
      </div>
    </>
  );
}

export default BudgetHeader;
