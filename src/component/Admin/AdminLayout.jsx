// component/Supplier/SupplierLayout.js
import React, { useState } from "react";
import Sidebar from "./AdminSideBar";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  return (
    <div className="d-flex">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-grow-1">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;