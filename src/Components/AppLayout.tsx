import React, { useState } from "react";

import AppContent from "./AppContent";
import AppHeader from "./AppHeader";
import SideBar from "./SideBar";

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <AppHeader toggleSidebar={toggleSidebar} />

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-opacity-50 z-50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <SideBar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        handleCloseSidebar={handleCloseSidebar}
      />

      {/* Main Content */}
      <AppContent />
    </div>
  );
};

export default Layout;
