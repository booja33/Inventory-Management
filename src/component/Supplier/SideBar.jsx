import React, { useEffect, useState } from 'react';
import { FaBars, FaTachometerAlt, FaBoxOpen, FaClipboardList, FaTruck, FaFileInvoice, FaCog } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isSidebarOpen = true, toggleSidebar }) => {
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState({});
  console.log(supplier);
  

  // Fetch user data from localStorage when the component mounts
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setSupplier(user);
    }
  }, []);

  const navItems = [
    { icon: <FaTachometerAlt />, label: 'Dashboard', path: '/dashboard' },
    { icon: <FaBoxOpen />, label: 'Products', path: '/products' },
    { icon: <FaClipboardList />, label: 'Requests', path: '/restock-requests' },
    { icon: <FaTruck />, label: 'Deliveries', path: '/deliveries' },
    { icon: <FaTruck />, label: 'Chatbot', path: '/chatbot' },
    { icon: <FaFileInvoice />, label: 'Invoices', path: '/invoices' },
    { icon: <FaClipboardList />, label: 'Report', path: '/report' },
    { icon: <FaCog />, label: 'Settings', path: '/settings' },
   
  ];

  return (
    <div
      className="d-flex flex-column text-white p-3 bg-dark shadow justify-content-between"
      style={{
        width: isSidebarOpen ? '250px' : '70px',
        transition: 'width 0.2s ease-out',
        minHeight: '100vh',
      }}
    >
      {/* Top Section */}
      <div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          {isSidebarOpen && <h4 className="fw-bold mb-0">SupplyHub</h4>}
          <button variant="outline-light" size="sm" onClick={toggleSidebar}>
            <FaBars />
          </button>
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

      {/* Bottom Section for Supplier Info */}
      <div className="mt-4">
        {isSidebarOpen ? (
          <div className="text-white small">
            {console.log(supplier.name)}
            <div><strong>{supplier.name || 'Supplier Name'}</strong></div>
            <div>{supplier.email || 'supplier@example.com'}</div>
          </div>
        ) : (
          <div className="text-white small text-center">
            <FaTruck />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
