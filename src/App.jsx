import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import AdminNavbar from "./components/AdminNavbar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import Login from "./pages/Login";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Wishlist from "./pages/Wishlist";

function App() {
  const { user } = useAuth();
  return (
    <AuthProvider>
      <Router>
        <Layout />
        <ToastContainer position="top-right" autoClose={2000} />
        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProtectedRoute>
                <ProductDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

const Layout = () => {
  const location = useLocation();
  const isAdminPage =
    location.pathname.startsWith("/admin") ||
    location.pathname === "/admin-login";

  return isAdminPage ? <AdminNavbar /> : <Navbar />;
};

export default App;
