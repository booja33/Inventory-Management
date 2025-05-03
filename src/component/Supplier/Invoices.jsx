import React, { useState } from "react";
import { InputGroup, Form, Table, Badge, Button, Card } from "react-bootstrap";
import {
  FaSearch,
  FaFileInvoice,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Dummy invoice data
const dummyInvoices = [
  {
    id: "INV-001",
    product: "Organic Apples",
    amount: 2400,
    status: "Paid",
    date: "2025-04-10",
  },
  {
    id: "INV-002",
    product: "Steel Rods",
    amount: 5600,
    status: "Unpaid",
    date: "2025-04-12",
  },
  {
    id: "INV-003",
    product: "Cement Bags",
    amount: 1750,
    status: "Pending",
    date: "2025-04-13",
  },
];

// Status badge function
const statusBadge = (status) => {
  const styles = {
    Paid: { bg: "success", icon: <FaCheckCircle className="me-1" /> },
    Unpaid: { bg: "danger", icon: <FaTimesCircle className="me-1" /> },
    Pending: { bg: "warning", icon: <FaClock className="me-1" /> },
  };
  const { bg, icon } = styles[status] || { bg: "secondary", icon: null };
  return (
    <Badge bg={bg}>
      {icon} {status}
    </Badge>
  );
};

const Invoices = () => {
  const generatePDF = (invoice) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Invoice", 14, 22);

    doc.setFontSize(12);
    doc.text(`Invoice ID: ${invoice.id}`, 14, 35);
    doc.text(`Product: ${invoice.product}`, 14, 45);
    doc.text(`Amount: ₹${invoice.amount}`, 14, 55);
    doc.text(`Status: ${invoice.status}`, 14, 65);
    doc.text(`Date: ${invoice.date}`, 14, 75);

    doc.setFontSize(10);
    doc.text("Thank you for your business!", 14, 90);

    doc.save(`${invoice.id}.pdf`);
  };

  const [searchTerm, setSearchTerm] = useState("");

  const filtered = dummyInvoices.filter((item) =>
    `${item.id} ${item.product}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="m-4">
      <h2 className="mb-1 fw-bold">Invoices</h2>
      <p className="text-muted mb-4">Track and download your invoices.</p>

      {/* Search */}
      <InputGroup className="mb-4" style={{ maxWidth: "400px" }}>
        <InputGroup.Text>
          <FaSearch />
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Search by invoice ID or product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      {/* Invoices Table */}
      <Card className="p-3 shadow-sm">
        <Table responsive bordered hover>
          <thead className="table-dark">
            <tr>
              <th>Invoice ID</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Issued Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.product}</td>
                  <td>₹{item.amount.toLocaleString()}</td>
                  <td>{statusBadge(item.status)}</td>
                  <td>{item.date}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-dark"
                      onClick={() => generatePDF(item)}
                    >
                      Download
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No invoices found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default Invoices;
