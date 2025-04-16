import React from 'react';
import { Button } from 'react-bootstrap';
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaClipboardList,
  FaTruck,
  FaBars,
  FaFileInvoice,
  FaCog
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isSidebarOpen = true, toggleSidebar }) => {
  const navigate = useNavigate();

  const navItems = [
    { icon: <FaTachometerAlt />, label: 'Dashboard', path: '/dashboard' },
    { icon: <FaBoxOpen />, label: 'Products', path: '/products' },
    { icon: <FaClipboardList />, label: 'Requests', path: '/restock-requests' },
    { icon: <FaTruck />, label: 'Deliveries', path: '/deliveries' },
    
    { icon: <FaTruck />, label: 'Chatbot', path: '/chatbot' },
    { icon: <FaFileInvoice />, label: 'Invoices', path: '/invoices' },
    // { icon: <FaTruck />, label: 'Payments', path: '/payments' },
    { icon: <FaClipboardList />, label: 'Report', path: '/report' },
    { icon: <FaCog />, label: 'Settings', path: '/settings' },
    { icon: <FaClipboardList />, label: 'Logout', path: '/logout' },
  ];

  return (
    <div
      className="d-flex flex-column text-white p-3 bg-dark shadow"
      style={{
        width: isSidebarOpen ? '250px' : '70px',
        transition: 'width 0.2s ease-out',
        minHeight: '100vh',
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        {isSidebarOpen && <h4 className="fw-bold mb-0">SupplyHub</h4>}
        <Button variant="outline-light" size="sm" onClick={toggleSidebar}>
          <FaBars />
        </Button>
      </div>

      <ul className="nav flex-column">
        {navItems.map((item, index) => (
          <li key={index} className="nav-item mb-3">
            <button
              className="nav-link d-flex align-items-center text-white bg-transparent border-0"
              style={{ gap: '10px', textAlign: 'left' }}
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

export default Sidebar;
