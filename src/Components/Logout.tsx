import { LogOut } from "lucide-react";
import { useSignout } from "../hooks/useSignout";

function Logout() {
  const { logout, isLoading } = useSignout();

  function handleLogout() {
    if (isLoading) return;

    logout();
  }
  return (
    <LogOut
      className={`w-5 h-5 text-blue-400 hover:text-blue-700 cursor-pointer ${
        isLoading && "text-gray-500 hover:text-gray-500"
      }`}
      role="button"
      onClick={handleLogout}
    />
  );
}

export default Logout;
