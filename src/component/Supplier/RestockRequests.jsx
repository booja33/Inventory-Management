import React, { useState } from 'react';
import { Table, Button, Badge, Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const initialRequests = [
  { id: "REQ001", product: "Steel Rods", quantity: 100, priority: "High", date: "2025-04-10", status: "Pending" },
  { id: "REQ002", product: "Copper Wire", quantity: 50, priority: "Medium", date: "2025-04-09", status: "Pending" },
  { id: "REQ003", product: "Cardboard Boxes", quantity: 200, priority: "Low", date: "2025-04-08", status: "Pending" },
];

const getPriorityBadge = (priority) => {
  switch (priority) {
    case "High": return <Badge bg="danger">{priority}</Badge>;
    case "Medium": return <Badge bg="warning" text="dark">{priority}</Badge>;
    case "Low": return <Badge bg="secondary">{priority}</Badge>;
    default: return <Badge bg="light">Unknown</Badge>;
  }
};

const getStatusBadge = (status) => {
  switch (status) {
    case "Approved": return <Badge bg="success">{status}</Badge>;
    case "Rejected": return <Badge bg="danger">{status}</Badge>;
    case "Pending": return <Badge bg="warning" text="dark">{status}</Badge>;
    default: return <Badge bg="light">Unknown</Badge>;
  }
};

const RestockRequests = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [searchTerm, setSearchTerm] = useState('');

  const handleStatusChange = (id, newStatus) => {
    const updated = requests.map(req =>
      req.id === id ? { ...req, status: newStatus } : req
    );
    setRequests(updated);
  };

  const filtered = requests.filter(req =>
    req.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="mb-1 fw-bold">Restock Requests</h2>
      <p className="text-muted mb-4">Compact list of requests from admin. Approve or reject with a click.</p>

      <InputGroup className="mb-4" style={{ maxWidth: '400px' }}>
        <InputGroup.Text><FaSearch /></InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Search by ID or product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      <Table bordered hover responsive className="shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Request ID</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Priority</th>
            <th>Requested On</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length > 0 ? (
            filtered.map(req => (
              <tr key={req.id}>
                <td>{req.id}</td>
                <td>{req.product}</td>
                <td>{req.quantity}</td>
                <td>{getPriorityBadge(req.priority)}</td>
                <td>{req.date}</td>
                <td>{getStatusBadge(req.status)}</td>
                <td>
                  {req.status === "Pending" ? (
                    <div className="d-flex gap-1">
                      <Button
                        size="sm"
                        variant="success"
                        onClick={() => handleStatusChange(req.id, "Approved")}
                      >
                        ✓
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        onClick={() => handleStatusChange(req.id, "Rejected")}
                      >
                        ✕
                      </Button>
                    </div>
                  ) : (
                    <span className="text-muted small">Done</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center text-muted">No requests found.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default RestockRequests;
