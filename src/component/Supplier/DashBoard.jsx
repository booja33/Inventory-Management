
// src/component/Supplier/Dashboard.jsx
import React from "react";
import NotificationBell from "./NotificationBell";
import { useLocation } from "react-router-dom";

const DashBoard = () => {
  // const location = useLocation();
  // const { name, email } = location.state || {};
  return (
    <div className="d-flex">
      <div className="flex-grow-1 m-4">
        {/* 🔔 Notification icon top-right */}
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h2 className="mb-0 fw-bold">Supplier Dashboard</h2>
            <p className="text-muted mb-0">
              Welcome back! Here's an overview of your supply operations.
            </p>
          </div>
          <NotificationBell />
        </div>

        {/* Stats Row */}
        <div className="row g-3 mb-4">
          <div className="col-md-3 d-flex">
            <div className="card p-3 shadow-sm text-center flex-grow-1">
              <h4 className="mb-1">24</h4>
              <p className="text-muted mb-0">Active Products</p>
            </div>
          </div>
          <div className="col-md-3 d-flex">
            <div className="card p-3 shadow-sm text-center flex-grow-1">
              <h4 className="text-danger mb-1">7</h4>
              <p className="text-muted mb-1">Pending Requests</p>
              <small className="text-danger">+2 since yesterday</small>
            </div>
          </div>
          <div className="col-md-3 d-flex">
            <div className="card p-3 shadow-sm text-center flex-grow-1">
              <h4 className="mb-1">5</h4>
              <p className="text-muted mb-1">Active Deliveries</p>
              <small className="text-success">-2 from last week</small>
            </div>
          </div>
          <div className="col-md-3 d-flex">
            <div className="card p-3 shadow-sm text-center flex-grow-1">
              <h4 className="mb-1">98.2%</h4>
              <p className="text-muted mb-1">On‑Time Delivery</p>
              <small className="text-success">+0.5% from last month</small>
            </div>
          </div>
        </div>

        {/* Restock Requests & Deliveries Row */}
        <div className="row g-4">
          {/* Recent Restock Requests */}
          <div className="col-md-6">
            <div className="card p-4 shadow-sm">
              <h5 className="mb-3">Recent Restock Requests</h5>
              <p className="text-muted mb-4">
                Latest requests from admin requiring your attention
              </p>

              {/* Request Item */}
              <div className="mb-3">
                <div className="card p-3 border">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <strong>Organic Apples</strong>
                    <span className="badge bg-danger">High</span>
                  </div>
                  <p className="text-muted mb-3">
                    200 units requested on 4/6/2025
                  </p>
                  <div className="d-flex gap-2">
                    <button className="btn btn-dark btn-sm">✓ Accept</button>
                    <button className="btn btn-outline-secondary btn-sm">
                      ✕ Decline
                    </button>
                  </div>
                </div>
              </div>

              {/* Another Request */}
              <div>
                <div className="card p-3 border">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <strong>Fresh Oranges</strong>
                    <span className="badge bg-secondary">Medium</span>
                  </div>
                  <p className="text-muted mb-3">
                    150 units requested on 4/7/2025
                  </p>
                  <div className="d-flex gap-2">
                    <button className="btn btn-dark btn-sm">✓ Accept</button>
                    <button className="btn btn-outline-secondary btn-sm">
                      ✕ Decline
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Deliveries */}
          <div className="col-md-6">
            <div className="card p-4 shadow-sm">
              <h5 className="mb-3">Upcoming Deliveries</h5>
              <p className="text-muted mb-4">Deliveries scheduled for the next 7 days</p>

              {/* Delivery Item */}
              <div className="mb-3">
                <div className="card p-3 border">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <strong>Organic Apples</strong>
                    <span className="badge bg-dark">In Transit</span>
                  </div>
                  <p className="text-muted mb-3">Expected: 4/10/2025</p>
                  <button className="btn btn-light border btn-sm">
                    🚚 Update Status
                  </button>
                </div>
              </div>

              {/* Another Delivery */}
              <div>
                <div className="card p-3 border">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <strong>Fresh Oranges</strong>
                    <span className="badge bg-light text-dark border">Preparing</span>
                  </div>
                  <p className="text-muted mb-3">Expected: 4/12/2025</p>
                  <button className="btn btn-light border btn-sm">
                    🚚 Update Status
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
