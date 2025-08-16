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
      <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Quick Stats
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">This Month</span>
            <span className="text-sm font-bold text-red-600">-$1,234</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">Budget Left</span>
            <span className="text-sm font-bold text-green-600">$2,766</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
