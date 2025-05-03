// src/component/Admin/AdminSidebar.jsx
import React from "react";
import {
  FaBars,
  FaTachometerAlt,
  FaUsers,
  FaShoppingCart,
  FaClipboardList,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminSidebar = ({ isSidebarOpen = true, toggleSidebar }) => {
  const navigate = useNavigate();

  const navItems = [
    { icon: <FaTachometerAlt />, label: "Dashboard", path: "/AdminDashboard" },
    { icon: <FaUsers />, label: "Users", path: "/users" },
    { icon: <FaShoppingCart />, label: "Request", path: "/AdminStockRequests" },
    { icon: <FaClipboardList />, label: "Reports", path: "/reports" },
    { icon: <FaCog />, label: "Settings", path: "/Admsettings" },
    { icon: <FaShoppingCart />, label: "Products", path: "/ProductAdminPage" },
    // { icon: <FaSignOutAlt />, label: "Logout", path: "/logout" },

  ];

  return (
    <div
      className="d-flex flex-column text-white bg-dark"
      style={{
        width: isSidebarOpen ? "250px" : "70px",
        transition: "width 0.3s ease-out",
        minHeight: "100vh",
        padding: "2rem 0.5rem",
      }}
    >
      <div className="d-flex justify-content-between align-items-center px-2 mb-4">
        {isSidebarOpen && <h4 className="mb-0">Admin Panel</h4>}
        <button
          className="btn btn-outline-light btn-sm"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>
      </div>

      <ul className="nav flex-column px-2">
        {navItems.map((item, i) => (
          <li key={i} className="nav-item mb-3">
            <button
              className="nav-link d-flex align-items-center text-white bg-transparent border-0 p-0"
              style={{ gap: "20px", width: "100%" }}
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              {isSidebarOpen && <span>{item.label}</span>}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSidebar;
