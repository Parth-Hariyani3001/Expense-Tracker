import { Menu, User, Bell, Search, DollarSign } from "lucide-react";
import Logout from "./Logout";
import { useUser } from "../hooks/useUser";

function AppHeader({ toggleSidebar }: { toggleSidebar: () => void }) {
  const { user } = useUser();

  const email = user?.email;
  const fullName = user?.user_metadata?.fullName;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-40">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left side - Logo and Menu */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 hidden sm:block">
              ExpenseTracker
            </h1>
          </div>
        </div>

        {/* Center - Search (hidden on mobile) */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right side - Notifications and Profile */}
        <div className="flex items-center space-x-3 gap-4">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-blue-600" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-900">
                {fullName ?? "John Doe"}
              </p>
              <p className="text-xs text-gray-500">
                {email ?? "JohnDoe@gmail.com"}
              </p>
            </div>
          </div>
          <Logout />
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
