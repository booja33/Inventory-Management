import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./component/Supplier/DashBoard";
import Products from "./component/Supplier/Products";
import RestockRequests from "./component/Supplier/RestockRequests";
import Deliveries from "./component/Supplier/Deliveries";
import Chatbot from "./component/Supplier/Chatbot";
import Report from "./component/Supplier/Report";
import SupplierLayout from "./component/Supplier/SupplierLayout";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Supplier Routes with Sidebar */}
      <Route
        path="/dashboard"
        element={
          <SupplierLayout>
            <Dashboard />
          </SupplierLayout>
        }
      />
      <Route
        path="/products"
        element={
          <SupplierLayout>
            <Products />
          </SupplierLayout>
        }
      />
      <Route
        path="/restock-requests"
        element={
          <SupplierLayout>
            <RestockRequests />
          </SupplierLayout>
        }
      />
      <Route
        path="/deliveries"
        element={
          <SupplierLayout>
            <Deliveries />
          </SupplierLayout>
        }
      />
      <Route path="/orders" element={<SupplierLayout></SupplierLayout>} />
      <Route
        path="/chatbot"
        element={
          <SupplierLayout>
            <Chatbot />
          </SupplierLayout>
        }
      />
      <Route path="/invoices" element={<SupplierLayout></SupplierLayout>} />
      <Route path="/payments" element={<SupplierLayout></SupplierLayout>} />
      <Route
        path="/report"
        element={
          <SupplierLayout>
            <Report />
          </SupplierLayout>
        }
      />
      <Route path="/settings" element={<SupplierLayout></SupplierLayout>} />
      <Route path="/logout" element={<SupplierLayout></SupplierLayout>} />
    </Routes>
  );
}

export default App;
