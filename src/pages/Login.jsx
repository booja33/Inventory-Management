import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [role, setRole] = useState("");
  // const navigate = useNavigate();

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post("http://localhost:8080/api/auth/login", {
  //       email,
  //       password,
  //       role,
  //     });


  //     // Assuming the response contains user info (email, role, etc.)
  //     const  user  = response.data;
  //     email = user.email;
  //     name = user.name;
  //     console.log(user.role);
      

  //     // Store user info in localStorage
  //     localStorage.setItem('user', JSON.stringify(user));

  //     // Redirect based on the user's role
  //     if (user.role === "ADMIN") {
  //       navigate("/AdminDashboard",{name:name,email:email});
  //       alert("Login successful!");

  //     } else {
  //       navigate("/dashboard");
  //       alert("Login successful!");

  //     }
  //   } catch (error) {
  //     console.error(error);
  //     alert("Login failed. Please check your credentials.");
  //   }
  // };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
        role,
      });

      const user = response.data;
      const userEmail = user.email;
      const userName = user.name;
      const userRole = user.role;

      console.log(userRole);

      // Store user info in localStorage
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect based on the user's role
      if (userRole === "ADMIN") {
        navigate("/AdminDashboard", { state: { name: userName, email: userEmail } });
        alert("Login successful!");
      } else {
        navigate("/dashboard");
        alert("Login successful!");
      }
    } catch (error) {
      console.error(error);
      alert("Login failed. Please check your credentials.");
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
          <div>
            <div className="mb-3">
              <label className="form-label">Role</label>
              <select className="form-select"
                value={role} 
                onChange={(e) => setRole(e.target.value)} required>
                <option value="" disabled>Select your role</option>
                <option value="ADMIN">Admin</option>
                <option value="user">User</option>
              </select>
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
        </div>
      </div>
    </div>
  );
};

export default Login;
