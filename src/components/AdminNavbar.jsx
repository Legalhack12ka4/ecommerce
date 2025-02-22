import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin-login");
  };

  return (
    <nav className="bg-gray-900 p-4 text-white flex justify-between items-center">
      <Link to="/admin" className="text-lg font-bold">
        Admin Dashboard
      </Link>

      {isAdmin && (
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default AdminNavbar;
