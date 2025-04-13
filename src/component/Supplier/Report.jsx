import React, { useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Card,
  Row,
  Col,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";
import {
  FaChartLine,
  FaFileAlt,
  FaMoneyBillWave,
  FaShoppingCart,
} from "react-icons/fa";

// Register ChartJS elements
ChartJS.register(
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const Reports = () => {
  const [chartType, setChartType] = useState("bar");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Stock Used",
        data: [120, 90, 150, 100, 80, 130],
        backgroundColor:
          chartType === "pie"
            ? [
                "#36A2EB",
                "#FFCE56",
                "#FF6384",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
              ]
            : "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      tooltip: { enabled: true },
    },
  };

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return <Bar data={chartData} options={chartOptions} />;
      case "line":
        return <Line data={chartData} options={chartOptions} />;
      case "pie":
        return <Pie data={chartData} options={chartOptions} />;
      default:
        return null;
    }
  };

  return (
    <Card className="p-4 shadow-sm bg-white">
      <h2 className="fw-bold mb-2">Reports & Analytics</h2>
      <p className="text-muted mb-4">
        Generate stock, sales, purchase, and expense reports. Use this data to
        make informed business decisions.
      </p>

      {/* Chart Filters */}
      <Card className="p-4 shadow-sm mb-4">
        <h5 className="mb-3">📊 Inventory Overview</h5>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Chart Type</Form.Label>
              <Form.Select
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
              >
                <option value="bar">Bar Chart</option>
                <option value="line">Line Chart</option>
                <option value="pie">Pie Chart</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Chart Display */}
        <div style={{ height: "300px" }}>{renderChart()}</div>
      </Card>

      {/* Report Tiles */}
      <Row className="g-4">
        <Col md={6} lg={3}>
          <Card className="shadow-sm p-3 text-center">
            <FaFileAlt className="text-primary fs-3 mb-2" />
            <h5>Stock Report</h5>
            <p className="text-muted">Current inventory and low stock alerts.</p>
            <Button variant="outline-primary" size="sm">
              Download
            </Button>
          </Card>
        </Col>

        <Col md={6} lg={3}>
          <Card className="shadow-sm p-3 text-center">
            <FaChartLine className="text-success fs-3 mb-2" />
            <h5>Sales Report</h5>
            <p className="text-muted">Sales history and performance.</p>
            <Button variant="outline-success" size="sm">
              Export
            </Button>
          </Card>
        </Col>

        <Col md={6} lg={3}>
          <Card className="shadow-sm p-3 text-center">
            <FaShoppingCart className="text-warning fs-3 mb-2" />
            <h5>Purchase Report</h5>
            <p className="text-muted">Track supplier purchases.</p>
            <Button variant="outline-warning" size="sm">
              View
            </Button>
          </Card>
        </Col>

        <Col md={6} lg={3}>
          <Card className="shadow-sm p-3 text-center">
            <FaMoneyBillWave className="text-danger fs-3 mb-2" />
            <h5>Expense Summary</h5>
            <p className="text-muted">Manage and analyze expenses.</p>
            <Button variant="outline-danger" size="sm">
              Generate
            </Button>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default Reports;
