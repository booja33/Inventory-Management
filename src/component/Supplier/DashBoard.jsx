import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import NotificationBell from "./NotificationBell";

const Dashboard = () => {
  return (
    <div className="d-flex">
      <div className="flex-grow-1 m-4">
        {/* 🔔 Notification icon top-right */}

        <div className="d-flex justify-content-between">
          <div>
            <h2 className="mb-0 fw-bold">Supplier Dashboard</h2>
          <p className="text-muted mb-4">
            Welcome back! Here's an overview of your supply operations.
          </p>
          </div>    
          <div className="d-flex justify-content-end">
            <NotificationBell />
          </div>
        </div>

        {/* Stats Row */}
        <Row className="g-3 mb-4">
          <Col md={3} className="d-flex">
            <Card className="p-3 shadow-sm text-center flex-grow-1">
              <h4>24</h4>
              <p className="text-muted mb-0">Active Products</p>
            </Card>
          </Col>
          <Col md={3} className="d-flex">
            <Card className="p-3 shadow-sm text-center flex-grow-1">
              <h4 className="text-danger">7</h4>
              <p className="text-muted mb-0">Pending Requests</p>
              <small className="text-danger">+2 since yesterday</small>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="p-3 shadow-sm text-center">
              <h4>5</h4>
              <p className="text-muted mb-0">Active Deliveries</p>
              <small className="text-success">-2 from last week</small>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="p-3 shadow-sm text-center">
              <h4>98.2%</h4>
              <p className="text-muted mb-0">On-Time Delivery</p>
              <small className="text-success">+0.5% from last month</small>
            </Card>
          </Col>
        </Row>

        {/* Restock and Deliveries Row */}
        <Row className="g-4">
          <Col md={6}>
            <Card className="p-4 shadow-sm">
              <h5>Recent Restock Requests</h5>
              <p className="text-muted">
                Latest requests from admin requiring your attention
              </p>
              <div className="mb-3">
                <Card className="p-3 border">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <strong>Organic Apples</strong>
                    <span className="badge bg-danger">High</span>
                  </div>
                  <p className="mb-2 text-muted">
                    200 units requested on 4/6/2025
                  </p>
                  <div className="d-flex gap-2">
                    <button className="btn btn-dark btn-sm">✓ Accept</button>
                    <button className="btn btn-outline-secondary btn-sm">
                      ✕ Decline
                    </button>
                  </div>
                </Card>
              </div>
              <div>
                <Card className="p-3 border">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <strong>Fresh Oranges</strong>
                    <span className="badge bg-secondary">Medium</span>
                  </div>
                  <p className="mb-2 text-muted">
                    150 units requested on 4/7/2025
                  </p>
                  <div className="d-flex gap-2">
                    <button className="btn btn-dark btn-sm">✓ Accept</button>
                    <button className="btn btn-outline-secondary btn-sm">
                      ✕ Decline
                    </button>
                  </div>
                </Card>
              </div>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="p-4 shadow-sm">
              <h5>Upcoming Deliveries</h5>
              <p className="text-muted">
                Deliveries scheduled for the next 7 days
              </p>
              <div className="mb-3">
                <Card className="p-3 border">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <strong>Organic Apples</strong>
                    <span className="badge bg-dark">In Transit</span>
                  </div>
                  <p className="mb-2 text-muted">Expected: 4/10/2025</p>
                  <button className="btn btn-light border btn-sm">
                    🚚 Update Status
                  </button>
                </Card>
              </div>
              <div>
                <Card className="p-3 border">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <strong>Fresh Oranges</strong>
                    <span className="badge bg-light text-dark border">
                      Preparing
                    </span>
                  </div>
                  <p className="mb-2 text-muted">Expected: 4/12/2025</p>
                  <button className="btn btn-light border btn-sm">
                    🚚 Update Status
                  </button>
                </Card>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
