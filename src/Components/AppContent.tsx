import { Outlet } from "react-router-dom";

function AppContent() {
  return (
    <main
      className={`
        transition-all duration-300 ease-in-out pt-16 lg:ml-64 dark:bg-gray-900
      `}
    >
      <div className="p-6">
        <Outlet />
      </div>
    </main>
  );
}

export default AppContent;
