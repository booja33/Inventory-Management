import React, { useState } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { FaUserCog, FaPaintBrush, FaLock } from "react-icons/fa";
import profile from "../../assets/profile.png";

const Settings = () => {
  const [selectedTab, setSelectedTab] = useState("profile");

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="m-4">
      <h2 className="mb-1 fw-bold">Settings</h2>
      <p className="text-muted mb-4">Manage your account settings.</p>

      {/* Tab Buttons */}
      <div className="mb-4">
        <div className="btn-group" role="group" aria-label="Settings Filter">
          <Button
            variant="outline-light"
            className={`fw-semibold border ${selectedTab === "profile" ? "text-black" : "text-secondary"}`}
            onClick={() => handleTabChange("profile")}
          >
            Profile
          </Button>
          <Button
            variant="outline-light"
            className={`fw-semibold border ${selectedTab === "notifications" ? "text-black" : "text-secondary"}`}
            onClick={() => handleTabChange("notifications")}
          >
            Notifications
          </Button>
          <Button
            variant="outline-light"
            className={`fw-semibold border ${selectedTab === "security" ? "text-black" : "text-secondary"}`}
            onClick={() => handleTabChange("security")}
          >
            Security
          </Button>
        </div>
      </div>

      {/* Conditional Content Based on Tab */}
      {selectedTab === "profile" && (
        <div className="mb-4 shadow-lg p-4 bg-white rounded">
          <h2 className="mb-1 fw-bold">Profile Settings</h2>
          <p className="text-muted mb-4">Manage your personal and company information</p>

          <Row>
            <Col md={3} className="d-flex flex-column align-items-center">
              <img
                src={profile}
                alt="Profile"
                className="rounded-circle mb-3"
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />
              <Button variant="outline-secondary" size="sm">
                Change Avatar
              </Button>
            </Col>

            <Col md={9}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Full Name</Form.Label>
                <Form.Control type="text" />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Email</Form.Label>
                    <Form.Control type="email" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Phone Number</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Company Name</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Company Address</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>

          <Button variant="secondary" className="fw-semibold">Save Changes</Button>
        </div>
      )}

      {selectedTab === "notifications" && (
        <div className="mb-4 shadow-lg p-4 bg-white rounded">
          <h2 className="mb-1 fw-bold">Notification Settings</h2>
          <p className="text-muted mb-4">Manage your notification preferences</p>
          <h5>Notification Types</h5>
          <div className=" mb-4 shadow-sm p-4 bg-white rounded" >
          <Form.Group className="mb-3">
            <h6>Restock Request</h6>
            <p className="text-muted mb-4">Receive notifications when a product is restocked</p>
            </Form.Group>

            
             </div>
         
          
        </div>
      )}

      {selectedTab === "security" && (
        <div className="mb-4 shadow-lg p-4 bg-white rounded">
          <h2 className="mb-1 fw-bold">Security Settings</h2>
          <p className="text-muted mb-4">Manage your security preferences</p>
          
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Change Password</Form.Label>
              <Form.Control type="password" placeholder="New Password" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm New Password" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Enable 2FA</Form.Label>
              <Form.Check
                type="checkbox"
                label="Enable Two-Factor Authentication for added security"
              />
            </Form.Group>

            <Button variant="primary" className="fw-semibold">
              Save Security Settings
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default Settings;
