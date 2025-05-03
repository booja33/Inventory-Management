import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "User",
  });


const navigate = useNavigate();

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSignup = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post("http://localhost:8080/api/auth/signup", formData);

    alert("Signup successful!");
    navigate("/login"); 

  } catch (error) {
    console.error("Signup error:", error);
    if (error.response && error.response.data && error.response.data.message) {
      alert('Signup failed: ${error.response.data.message}');
    } else {
      alert("Signup failed. Please try again.");
    }
  }
};


  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        <h4 className="text-center">Sign Up</h4>
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <div className="input-group">
              <span className="input-group-text"><FaUser /></span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text"><FaEnvelope /></span>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text"><FaLock /></span>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
         
          <div className="mb-3">
            <input type="checkbox" className="form-check-input me-2" required />
            <label className="form-check-label">I agree to the Terms & Conditions</label>
          </div>
          <button type="submit" className="btn btn-dark w-100">Sign Up</button>
        </form>
        <div className="text-center mt-3">
          <p>Already have an account? <Link to="/login" className="text-primary">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;