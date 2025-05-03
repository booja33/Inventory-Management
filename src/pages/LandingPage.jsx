import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 sticky-top shadow-sm">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold text-primary">InventPro</span>
          <div className="d-flex align-items-center">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row">
              <li className="nav-item mx-2">
                <a href="#home" className="nav-link">Home</a>
              </li>
              <li className="nav-item mx-2">
                <a href="#about" className="nav-link">About</a>
              </li>
              <li className="nav-item mx-2">
                <a href="#contact" className="nav-link">Contact</a>
              </li>
            </ul>
            <Link to="/login" className="btn btn-outline-primary me-2">Login</Link>
            <Link to="/signup" className="btn btn-primary">Sign Up</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
  className="d-flex flex-column justify-content-center align-items-center text-center text-white"
  id="home"
  style={{
    minHeight: "100vh",
    padding: "4rem 1rem",
    background: "linear-gradient(to right, #0d6efd, #6610f2)",
  }}
>
  <div className="container">
    <img
      src="https://cdn-icons-png.flaticon.com/512/2292/2292342.png"
      alt="Inventory Illustration"
      style={{ width: "120px", marginBottom: "20px" }}
    />
    <h1 className="display-4 fw-bold"> Inventory Management</h1>
    <p className="lead">
      Track, predict, and optimize — all in one platform built for modern businesses.
    </p>
    <p className="fw-light fst-italic">From small retailers to large warehouses, manage it all effortlessly.</p>
    <Link to="/signup" className="btn btn-light btn-lg mt-3 px-4 shadow">
      Get Started for Free
    </Link>
  </div>
</section>



      {/* Features Section */}
      <section id="about" className="bg-light py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-4">Features You’ll Love</h2>
          <div className="row text-center">
            {[
              ["📦", "Real-Time Inventory", "Monitor stock in real time to avoid over or under stocking."],
              ["📊", "Smart Forecasting", "Predict demand and prepare ahead using AI analytics."],
              ["🔒", "Secure User Roles", "Control access with Admin, Staff, and Supplier roles."],
              ["📈", "Reports & Insights", "Get detailed analytics to improve business decisions."],
              ["🤝", "Supplier Portal", "Easily coordinate with suppliers through an integrated portal."],
              ["🚚", "Warehouse Optimization", "Improve order picking and inventory storage."],
            ].map(([icon, title, desc], idx) => (
              <div key={idx} className="col-md-4 mb-4">
                <div className="p-4 shadow-sm rounded bg-white h-100">
                  <div className="fs-2">{icon}</div>
                  <h5 className="fw-bold mt-3">{title}</h5>
                  <p className="text-muted">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="bg-primary text-white text-center py-5">
        <div className="container">
          <h2 className="fw-bold">Ready to transform your inventory management?</h2>
          <p>Join hundreds of businesses already using InventPro to streamline their operations.</p>
          <Link to="/signup" className="btn btn-light mt-3">Create Your Free Account</Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container py-5">
        <h2 className="text-center fw-bold mb-4">What Our Users Say</h2>
        <div className="row text-center">
          {[
            ["Emily, Store Manager", "InventPro helped reduce stock loss by 40%!"],
            ["Raj, Supplier", "Super easy to manage and respond to stock requests."],
            ["Lucas, Admin", "The forecasting feature saved us during the seasonal rush."],
          ].map(([name, review], i) => (
            <div key={i} className="col-md-4 mb-4">
              <div className="shadow-sm p-4 bg-light rounded h-100">
                <p className="text-muted fst-italic">"{review}"</p>
                <h6 className="fw-bold mt-3">{name}</h6>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container py-5">
        <h2 className="text-center fw-bold">Contact Us</h2>
        <p className="text-muted text-center mb-4">
          Need help or want to learn more? We're just a message away.
        </p>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" required />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea className="form-control" id="message" rows="4" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-100">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-light text-center py-3 mt-4 text-muted">
        <small>© 2025 InventPro. All rights reserved.</small>
      </footer>
    </div>
  );
}
