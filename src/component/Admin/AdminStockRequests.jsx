import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminStockRequests = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    requestDate: "",
  });

  const [requests, setRequests] = useState([]);

  // Load existing requests on page load
  useEffect(() => {
    axios.get("http://localhost:8080/api/requests")
      .then((res) => {
        setRequests(res.data);
      })
      .catch((err) => {
        console.error("Error fetching requests", err);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      category: "",
      quantity: "",
      requestDate: "",
    });
  };

  const handleSubmit = () => {
    const { name, category, quantity, requestDate } = formData;
    if (name && category && quantity && requestDate) {
      axios.post("http://localhost:8080/api/requests", formData)
        .then((res) => {
          setRequests([...requests, {
            id: res.data.id,
            product: res.data.name,
            category: res.data.category,
            quantity: res.data.quantity,
            date: res.data.requestDate,
            status: res.data.status || "Pending",
          }]);
          handleCancel();
        })
        .catch((err) => {
          console.error("Submit failed", err);
          alert("Failed to submit request.");
        });
    } else {
      alert("Please fill all fields.");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-semibold border-bottom pb-2">Request Product</h2>

      <div className="card p-4 mb-4">
        <h5 className="mb-3">Add Product</h5>
        <div className="row g-3">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Product Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              name="requestDate"
              value={formData.requestDate}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="justify-content-end d-flex gap-2 mb-4">
        <button className="btn btn-secondary" onClick={handleCancel}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Request
        </button>
      </div>

      {requests.length > 0 && (
        <div className="card p-4">
          <h5 className="mb-3">Submitted Requests</h5>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Request Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, index) => (
                <tr key={index}>
                  <td>{req.product}</td>
                  <td>{req.category}</td>
                  <td>{req.quantity}</td>
                  <td>{req.date}</td>
                  <td>{req.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminStockRequests;
