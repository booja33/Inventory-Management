import React, { useState, useEffect } from 'react';
import { FaBell, FaBoxOpen, FaClock, FaTruck } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialNotifications = [
  {
    id: 1,
    type: 'Low Stock',
    message: 'Low stock alert: Copper Wire',
    icon: <FaBoxOpen className="me-2 text-danger" />,
  },
  {
    id: 2,
    type: 'Expiry',
    message: 'Expiry reminder: Paint Thinner',
    icon: <FaClock className="me-2 text-warning" />,
  },
  {
    id: 3,
    type: 'Order',
    message: 'Order #1234 has been shipped',
    icon: <FaTruck className="me-2 text-primary" />,
  },
];

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [toastedIds, setToastedIds] = useState([]);

  // Simulate incoming notifications
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifications(initialNotifications);
      setUnreadCount(initialNotifications.length);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Trigger persistent toasts (manual close only)
  useEffect(() => {
    notifications.forEach((note) => {
      if (!toastedIds.includes(note.id)) {
        toast(
          <div className="d-flex align-items-center">
            {note.icon}
            <span>{note.message}</span>
          </div>,
          {
            toastId: note.id,
            position: 'top-right',
            autoClose: false, // ⛔ no auto-close
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
        setToastedIds((prev) => [...prev, note.id]);
      }
    });
  }, [notifications, toastedIds]);

  const handleClick = () => {
    setUnreadCount(0);
  };

  return (
    <div className="position-relative">
      <FaBell
        size={20}
        style={{ cursor: 'pointer', color: 'black' }}
        onClick={handleClick}
      />
      {unreadCount > 0 && (
        <span
          style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            background: 'red',
            borderRadius: '50%',
            color: 'white',
            fontSize: '10px',
            padding: '2px 6px',
          }}
        >
          {unreadCount}
        </span>
      )}

      {/* 🟢 Toast container with persistent settings */}
      <ToastContainer
        newestOnTop
        pauseOnFocusLoss={false}
        closeOnClick
        draggable
      />
    </div>
  );
};

export default NotificationBell;
