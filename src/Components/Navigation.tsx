import { ArrowRightLeft, Home, Notebook } from "lucide-react";
import type { NavigationType } from "../types/generalTypes";
import NavigationItem from "./NavigationItem";

const navigationItems: NavigationType[] = [
  { icon: Home, label: "Dashboard", path: "/dashboard", active: true },
  { icon: Notebook, label: "Expense Categories", path: "/categories" },
  { icon: ArrowRightLeft, label: "Transactions", path: "/transactions" },
];

function Navigation({
  handleCloseSidebar,
}: {
  handleCloseSidebar: () => void;
}) {
  return (
    <nav className="p-4 lg:pt-20">
      <ul className="space-y-2">
        {navigationItems.map((item, idx) => (
          <NavigationItem
            item={item}
            handleCloseSidebar={handleCloseSidebar}
            key={idx}
          />
        ))}
      </ul>

      {/* Quick Stats */}
      <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-lg transition-colors duration-300">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Quick Stats
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600 dark:text-gray-400">
              This Month
            </span>
            <span className="text-sm font-bold text-red-600 dark:text-red-400">
              -$1,234
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600 dark:text-gray-400">
              Budget Left
            </span>
            <span className="text-sm font-bold text-green-600 dark:text-green-400">
              $2,766
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
