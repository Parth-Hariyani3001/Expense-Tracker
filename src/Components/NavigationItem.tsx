import { NavLink } from "react-router-dom";
import type { NavigationType } from "../types/generalTypes";

function NavigationItem({
  item,
  handleCloseSidebar,
}: {
  item: NavigationType;
  handleCloseSidebar: () => void;
}) {
  const Icon = item.icon;
  return (
    <li>
      <NavLink
        to={item.path}
        className={({ isActive }) =>
          `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            isActive
              ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-400"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
          }`
        }
        onClick={handleCloseSidebar}
      >
        {({ isActive }) => (
          <>
            <Icon
              className={`w-5 h-5 ${
                isActive ? "text-blue-700" : "text-gray-500"
              }`}
            />
            <span className="font-medium">{item.label}</span>
          </>
        )}
      </NavLink>
    </li>
  );
}

export default NavigationItem;
