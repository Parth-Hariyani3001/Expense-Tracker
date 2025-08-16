import { DollarSign, X } from "lucide-react";
import Navigation from "./Navigation";

type SideBar = {
  toggleSidebar: () => void;
  handleCloseSidebar: () => void;
  isSidebarOpen: boolean;
};

function SideBar({
  toggleSidebar,
  isSidebarOpen,
  handleCloseSidebar,
}: SideBar) {
  return (
    <aside
      className={`
        fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 lg:z-30
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:shadow-none lg:border-r lg:border-gray-200
      `}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-lg font-bold text-gray-900">ExpenseTracker</h2>
        </div>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Navigation */}
      <Navigation handleCloseSidebar={handleCloseSidebar} />
    </aside>
  );
}

export default SideBar;
