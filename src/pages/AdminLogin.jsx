import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "admin@gmail.com" && password === "admin123") {
      localStorage.setItem("isAdmin", "true");
      alert("Login successful!");
      navigate("/admin");
    } else {
      alert("Invalid admin credentials!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-lg rounded-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
