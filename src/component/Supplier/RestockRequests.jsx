import React, { useState, useEffect } from 'react';
import { Table, Button, Badge, Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';

const RestockRequests = () => {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch requests from the backend when the component mounts
    axios.get('http://localhost:8080/api/requests')
      .then(response => {
        setRequests(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the requests!", error);
      });
  }, []);

  const handleStatusChange = (id, newStatus) => {
    axios.patch(`http://localhost:8080/api/requests/${id}/status`, { status: newStatus })
      .then(response => {
        setRequests(prevRequests =>
          prevRequests.map(req =>
            req.id === id ? { ...req, status: newStatus } : req
          )
        );
      })
      .catch(error => {
        console.error("There was an error updating the status!", error);
      });
  };

  const filtered = requests.filter(req =>
    req.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="m-4">
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

export default RestockRequests;
