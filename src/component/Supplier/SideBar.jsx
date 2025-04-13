import React from 'react';
import { Button } from 'react-bootstrap';
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaClipboardList,
  FaTruck,
  FaBars,
  

 
 

} from 'react-icons/fa';

const Sidebar = ({ isSidebarOpen = true, toggleSidebar, onSelect, active }) => {
  const navItems = [
    { icon: <FaTachometerAlt />, label: 'Dashboard' },
    { icon: <FaBoxOpen />, label: 'Products' },
    { icon: <FaClipboardList />, label: 'Restock Requests' },
    { icon: <FaTruck />, label: 'Deliveries' },
    { icon: <FaClipboardList /> , label: 'Orders' },
    { icon: <FaTruck />, label: 'Chatbot' },
    
    { icon: <FaClipboardList />, label: 'Invoices' },
    { icon: <FaTruck />, label: 'Payments' },
    { icon: <FaClipboardList />, label: 'Report' },
    { icon: <FaTruck />, label: 'Settings' },
    { icon: <FaClipboardList />, label: 'Logout' },
  ];

  return (
    <div
      className="d-flex flex-column text-white p-3 bg-dark shadow"
      style={{
        width: isSidebarOpen ? '250px' : '70px',
        transition: 'width 0.3s ease',
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
              className={`nav-link d-flex align-items-center text-white bg-transparent border-0 ${
                active === item.label ? 'fw-bold text-primary' : ''
              }`}
              style={{ gap: '10px', textAlign: 'left' }}
              onClick={() => onSelect(item.label)}
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
