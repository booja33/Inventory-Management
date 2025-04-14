import React, { useState } from "react";
import {
  InputGroup,
  Form,
  Table,
  Badge,
  Button,
  Card,
  Modal,
} from "react-bootstrap";
import {
  FaSearch,
  FaTruck,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

// Sample deliveries
const dummyDeliveries = [
  {
    id: "DEL-001",
    product: "Organic Apples",
    quantity: 150,
    status: "In Transit",
    expectedDate: "2025-04-15",
  },
  {
    id: "DEL-002",
    product: "Steel Rods",
    quantity: 80,
    status: "Preparing",
    expectedDate: "2025-04-16",
  },
  {
    id: "DEL-003",
    product: "Cardboard Boxes",
    quantity: 300,
    status: "Delivered",
    expectedDate: "2025-04-12",
  },
];

// Status badge
const statusStyles = {
  Delivered: { bg: "success", icon: <FaCheckCircle className="me-1" /> },
  "In Transit": { bg: "primary", icon: <FaTruck className="me-1" /> },
  Preparing: { bg: "warning", icon: <FaClock className="me-1" /> },
};

const statusBadge = (status) => {
  const { bg, icon } = statusStyles[status] || {
    bg: "secondary",
    icon: null,
  };
  return (
    <Badge bg={bg}>
      {icon} {status}
    </Badge>
  );
};

const Deliveries = () => {
  const [deliveries, setDeliveries] = useState(dummyDeliveries);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  // Open modal
  const handleOpenModal = (index) => {
    setSelectedIndex(index);
    setNewStatus(deliveries[index].status);
    setShowModal(true);
  };

  // Save updated status
  const handleUpdateStatus = () => {
    const updated = [...deliveries];
    updated[selectedIndex].status = newStatus;
    setDeliveries(updated);
    setShowModal(false);
  };

  const filtered = deliveries.filter((item) =>
    `${item.id} ${item.product}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="m-4">
      <h2 className="mb-1 fw-bold">Deliveries</h2>
      <p className="text-muted mb-4">Manage and update delivery statuses.</p>

      {/* Search bar */}
      <InputGroup className="mb-4" style={{ maxWidth: "400px" }}>
        <InputGroup.Text>
          <FaSearch />
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Search by ID or product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      {/* Delivery table */}
      <Card className="p-3 shadow-sm">
        <Table responsive bordered hover>
          <thead className="table-dark">
            <tr>
              <th>Delivery ID</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Expected Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.product}</td>
                  <td>{item.quantity}</td>
                  <td>{statusBadge(item.status)}</td>
                  <td>{item.expectedDate}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      onClick={() => handleOpenModal(index)}
                    >
                      Update Status
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No deliveries found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>

      {/* Modal for updating status */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Delivery Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Updating status for:{" "}
            <strong>{deliveries[selectedIndex]?.product}</strong>
          </p>
          <Form.Select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <option>Preparing</option>
            <option>In Transit</option>
            <option>Delivered</option>
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateStatus}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Deliveries;
