import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold text-primary">SmartInventory</span>
          <div>
            <Link to="/login" className="btn btn-outline-primary me-2">Login</Link>
            <Link to="/signup" className="btn btn-primary">Sign Up</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container text-center my-5">
        <h1 className="display-4 fw-bold">Smart Inventory. Smarter Business.</h1>
        <p className="lead text-muted">
          Optimize your stock, predict demand, and simplify inventory management with AI-powered insights.
        </p>
        <div className="mt-4">
          <Link to="/" className="btn btn-primary me-3">Get Started</Link>
          <a href="#features" className="btn btn-outline-secondary">Learn More</a>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="container my-5">
        <div className="row text-center">
          <div className="col-md-4">
            <h4>AI Stock Prediction</h4>
            <p className="text-muted">Predict low-stock items before they happen and restock smarter.</p>
          </div>
          <div className="col-md-4">
            <h4>Real-time Analytics</h4>
            <p className="text-muted">View live sales, stock movement, and trends in one dashboard.</p>
          </div>
          <div className="col-md-4">
            <h4>Multi-Role Access</h4>
            <p className="text-muted">Secure login for Admin & Staff with role-based access control.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-light py-3 text-center text-muted">
        <small>© 2025 SmartInventory. All rights reserved.</small>
      </footer>
    </div>
  );
}
