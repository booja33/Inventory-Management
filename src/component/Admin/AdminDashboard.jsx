// import React from "react";
import { Line, Bar } from "react-chartjs-2";
import { useLocation } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const location = useLocation();
  const { name, email } = location.state || {};
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Sales",
        data: [4000, 3000, 4500, 5000, 6000, 5800, 7200],
        borderColor: "#007bff",
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  
  const salesOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const revenueData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Revenue",
        data: [13000, 17000, 16000, 20000],
        backgroundColor: "#28a745",
      },
    ],
  };

  const revenueOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="container-fluid bg-light min-vh-100">
      <div className="row">
        {/* Main Content */}
        <div className="col-md-12 p-4">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold">Dashboard</h3>
            <div className="d-flex align-items-center gap-3">
              {/* Notification Bell */}
              <button className="btn btn-light position-relative">
                <i className="bi bi-bell fs-5"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  3<span className="visually-hidden">unread messages</span>
                </span>
              </button>

              {/* Admin Dropdown */}
              <div className="dropdown">
                <button
                  className="btn btn-light dropdown-toggle d-flex align-items-center gap-2"
                  type="button"
                  id="adminMenu"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-circle fs-5"></i>
                  {name}
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="adminMenu"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      Profile
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Settings
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Help
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item text-danger" href="#">
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="row mb-4">
            {[
              {
                title: "Today's Sales",
                value: "$4,289.00",
                desc: "+20.1% from yesterday",
                color: "text-success",
              },
              {
                title: "Total Products",
                value: "1,324",
                desc: "+8 new today",
                color: "text-muted",
              },
              {
                title: "Total Orders",
                value: "567",
                desc: "+12 orders today",
                color: "text-muted",
              },
              {
                title: "Total Suppliers",
                value: "48",
                desc: "+2 new this month",
                color: "text-muted",
              },
              {
                title: "Low Stock Alerts",
                value: "3",
                desc: "Items below threshold",
                color: "text-danger",
              },
            ].map((card, i) => (
              <div className="col-md-2" key={i}>
                <div className="card text-center mb-3 shadow-sm">
                  <div className="card-body">
                    <h6 className="card-title">{card.title}</h6>
                    <h4 className={card.color}>{card.value}</h4>
                    <small className={card.color}>{card.desc}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Sales Trends</h5>
                  <Line data={salesData} options={salesOptions} />
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Revenue by Quarter</h5>
                  <Bar data={revenueData} options={revenueOptions} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
