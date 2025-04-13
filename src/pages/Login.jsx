import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  // const handleLogin = async (e) => {
  //   e.preventDefault();
  
  //   try {
  //     const response = await fetch("http://localhost:8080/api/auth/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });
  
  
  //     if (response.ok) {
  //       const data = await response.json();
  //       localStorage.setItem("token", data.token);
  //       localStorage.setItem("role", data.role); // Optional, if you still need roles
  

  //       navigate("/home");
  //     } else {
  //       alert("Invalid credentials!");
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error);
  //   }
  // };


const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post("http://localhost:8080/api/auth/login", {
      email,
      password,
    });

    const data = response.data;

    // ✅ Store token and role in localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role); // Optional, if your backend returns role

    // ✅ Redirect to home page
    navigate("/dashboard"); // Change this to your desired route

  } catch (error) {
    if (error.response && error.response.status === 401) {
      alert("Invalid credentials!");
    } else {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    }
  }
};

  
  

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        <h4 className="text-center">Sign In</h4>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text"><FaEnvelope /></span>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <input type="checkbox" className="form-check-input me-2" />
              <label className="form-check-label">Remember me</label>
            </div>
            <a href="#" className="text-primary">Forgot password?</a>
          </div>
          <button type="submit" className="btn btn-dark w-100">Sign In</button>
        </form>
        <div className="text-center mt-3">
          <p>Don't have an account? <Link to="/signup" className="text-primary">Sign Up</Link></p>
          {/* <p>Or With</p>
          <div className="d-flex justify-content-center">
            <button className="btn btn-outline-dark me-2">
              <img src="https://img.icons8.com/color/20/000000/google-logo.png" alt="Google" /> Google
            </button>
            <button className="btn btn-outline-dark">
              <img src="https://img.icons8.com/ios-filled/20/000000/mac-os.png" alt="Apple" /> Apple
            </button> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
