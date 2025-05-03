
import React, { useState } from "react";

const initialRequests = [
  {
    id: 1,
    item: "Printer Ink",
    quantity: 10,
    staff: "Alice",
    date: "2025-04-18",
    status: "Pending",
  },
  {
    id: 2,
    item: "Paper A4 Pack",
    quantity: 20,
    staff: "Bob",
    date: "2025-04-17",
    status: "Pending",
  },
];

const AdminStockRequests = () => {
  const [requests, setRequests] = useState(initialRequests);

  const updateStatus = (id, newStatus) => {
    const updated = requests.map((req) =>
      req.id === id ? { ...req, status: newStatus } : req
    );
    setRequests(updated);
  };

  return (
    <div className="container mt-4">
      <h4>📦 Stock Requests from Staff</h4>
      <table className="table table-bordered mt-3">
        <thead className="table-light">
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Staff</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id}>
              <td>{req.item}</td>
              <td>{req.quantity}</td>
              <td>{req.staff}</td>
              <td>{req.date}</td>
              <td>
                <span className={`badge ${
                  req.status === "Pending"
                    ? "bg-warning"
                    : req.status === "Forwarded"
                    ? "bg-info"
                    : req.status === "Rejected"
                    ? "bg-danger"
                    : "bg-success"
                }`}>
                  {req.status}
                </span>
              </td>
              <td>
                {req.status === "Pending" && (
                  <>
                    <button
                      className="btn btn-sm btn-success me-2"
                      onClick={() => updateStatus(req.id, "Forwarded")}
                    >
                      Forward
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => updateStatus(req.id, "Rejected")}
                    >
                      Reject
                    </button>
                  </>
                )}
                {req.status !== "Pending" && <small>No actions</small>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminStockRequests;
