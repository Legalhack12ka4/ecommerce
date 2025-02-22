import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  const getCartKey = () => (user ? `cart_${user.email}` : "cart_guest");

  useEffect(() => {
    if (user) {
      const storedCart = localStorage.getItem(getCartKey());
      if (storedCart) {
        try {
          setCart(JSON.parse(storedCart));
        } catch (error) {
          console.error("Error parsing cart:", error);
        }
      } else {
        setCart([]);
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(getCartKey(), JSON.stringify(cart));
    }
  }, [cart, user]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const updateCartQuantity = (id, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: quantity > 0 ? quantity : 1 }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateCartQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
