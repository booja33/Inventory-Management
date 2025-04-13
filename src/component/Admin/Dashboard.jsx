// import React from "react";
// import { Bar, Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // Register chart elements
// ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

// const Dashboard = () => {
//   // Dummy Data for Charts
//   const salesData = {
//     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//     datasets: [
//       {
//         label: "Total Sales",
//         data: [1200, 1900, 3000, 5000, 2200, 3300],
//         backgroundColor: "rgba(75, 192, 192, 0.6)",
//       },
//     ],
//   };

//   const ordersData = {
//     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//     datasets: [
//       {
//         label: "Orders",
//         data: [30, 45, 60, 80, 55, 90],
//         borderColor: "rgba(255, 99, 132, 1)",
//         backgroundColor: "rgba(255, 99, 132, 0.2)",
//       },
//     ],
//   };

//   return (
//     <div className="dashboard-container">
//       {/* Summary Cards */}
//       <div className="summary-cards">
//         <div className="card">
//           <h3>Today's Sales</h3>
//           <p>$5,230</p>
//         </div>
//         <div className="card">
//           <h3>Total Products</h3>
//           <p>1,200</p>
//         </div>
//         <div className="card">
//           <h3>Total Orders</h3>
//           <p>3,500</p>
//         </div>
//         <div className="card">
//           <h3>Total Customers</h3>
//           <p>980</p>
//         </div>
//       </div>

//       {/* Charts */}
//       <div className="charts">
//         <div className="chart-box">
//           <h4>Sales Trend</h4>
//           <Bar data={salesData} />
//         </div>
//         <div className="chart-box">
//           <h4>Order Growth</h4>
//           <Line data={ordersData} />
//         </div>
//       </div>

//       {/* Styles */}
//       <style>{`
//         .dashboard-container {
//           padding: 20px;
//           display: flex;
//           flex-direction: column;
//           gap: 20px;
//         }

//         .summary-cards {
//           display: flex;
//           justify-content: space-between;
//         }

//         .card {
//           background: white;
//           padding: 20px;
//           border-radius: 10px;
//           box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
//           text-align: center;
//           width: 23%;
//         }

//         .charts {
//           display: flex;
//           justify-content: space-between;
//         }

//         .chart-box {
//           width: 48%;
//           padding: 20px;
//           background: white;
//           border-radius: 10px;
//           box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Dashboard;
