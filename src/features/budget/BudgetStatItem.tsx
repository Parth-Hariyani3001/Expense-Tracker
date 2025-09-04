import type { LucideIcon } from "lucide-react";
import { formatCurrency } from "../../utils/helpers";
import type { ReactNode } from "react";

function BudgetStatItem({
  Icon,
  iconColor,
  amount,
  children,
}: {
  Icon: LucideIcon;
  iconColor: string;
  amount: number;
  children: ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
      <div className="flex items-center justify-between">
        <div
          className={`w-12 h-12 bg-${iconColor}-100 dark:bg-${iconColor}-900/50 rounded-lg flex items-center justify-center`}
        >
          <Icon
            className={`w-6 h-6 text-${iconColor}-600 dark:text-${iconColor}-400`}
          />
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            ₹{formatCurrency(amount)}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{children}</p>
        </div>
      </div>
    </div>
  );
}

export default BudgetStatItem;
