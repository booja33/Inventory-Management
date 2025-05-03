import React, { useState, useEffect, useRef } from 'react';
import { FaBell, FaBoxOpen } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const NotificationBell = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [toastedMessages, setToastedMessages] = useState([]);
  const stompClientRef = useRef(null);

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('Connected to WebSocket');
        client.subscribe('/topic/notifications', (message) => {
          const notif = JSON.parse(message.body);
          if (!toastedMessages.includes(notif.message)) {
            toast(
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FaBoxOpen style={{ marginRight: '8px', color: 'red' }} />
                <span>{notif.message}</span>
              </div>,
              {
                position: 'top-right',
                autoClose: false,
                closeOnClick: true,
                draggable: true,
              }
            );
            setToastedMessages((prev) => [...prev, notif.message]);
            setUnreadCount((prev) => prev + 1);
          }
        });
      },
      onStompError: (frame) => {
        console.error('STOMP error:', frame);
      },
    });

    stompClientRef.current = client;
    client.activate();

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
  }, [toastedMessages]);

  const handleClick = () => {
    setUnreadCount(0);
  };

  return (
    <div style={{ position: 'relative' }}>
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
      <ToastContainer newestOnTop />
    </div>
  );
};

export default NotificationBell;
