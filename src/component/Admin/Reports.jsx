import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Reports = () => {
  const summary = {
    totalItems: 1234,
    totalSuppliers: 12,
    totalRequests: 56,
  };

  const mostRequested = [
    { item: "A4 Paper", quantity: 120 },
    { item: "Ink", quantity: 90 },
    { item: "Pens", quantity: 80 },
    { item: "Notebooks", quantity: 70 },
    { item: "Markers", quantity: 60 },
  ];

  const mostRequestedItems = {
    labels: mostRequested.map((i) => i.item),
    datasets: [
      {
        label: "Quantity Requested",
        data: mostRequested.map((i) => i.quantity),
        backgroundColor: "#007bff",
      },
    ],
  };

  const requestTrends = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Requests",
        data: [10, 25, 20, 30, 45, 35],
        borderColor: "#28a745",
        backgroundColor: "rgba(40, 167, 69, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const csvData = mostRequested.map((item) => ({
    Item: item.item,
    Quantity: item.quantity,
  }));

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Stock Report", 14, 15);

    doc.autoTable({
      startY: 25,
      head: [["Item", "Quantity"]],
      body: mostRequested.map((i) => [i.item, i.quantity]),
    });

    doc.save("Stock_Report.pdf");
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>📊 Reports</h4>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-danger" onClick={generatePDF}>
            📄 Export PDF
          </button>
          <CSVLink
            data={csvData}
            filename="stock_report.csv"
            className="btn btn-outline-success"
          >
            📁 Export CSV
          </CSVLink>
        </div>
      </div>

      <div className="row mb-4">
        {[
          { title: "Total Items", value: summary.totalItems },
          { title: "Total Suppliers", value: summary.totalSuppliers },
          { title: "Total Requests", value: summary.totalRequests },
        ].map((card, idx) => (
          <div className="col-md-4" key={idx}>
            <div className="card text-center">
              <div className="card-body">
                <h6>{card.title}</h6>
                <h3>{card.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Most Requested Items</h5>
              <Bar data={mostRequestedItems} />
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Request Trends (Monthly)</h5>
              <Line data={requestTrends} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
