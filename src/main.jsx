import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import { CartProvider } from "./context/CartContext";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <WishlistProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </WishlistProvider>
  </AuthProvider>
);
