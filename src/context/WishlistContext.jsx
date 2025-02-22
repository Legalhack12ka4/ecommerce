import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  const getWishlistKey = () =>
    user ? `wishlist_${user.email}` : "wishlist_guest";

  useEffect(() => {
    if (user) {
      const storedWishlist = localStorage.getItem(getWishlistKey());
      if (storedWishlist) {
        try {
          setWishlist(JSON.parse(storedWishlist));
        } catch (error) {
          console.error("Error parsing wishlist:", error);
        }
      } else {
        setWishlist([]);
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(getWishlistKey(), JSON.stringify(wishlist));
    }
  }, [wishlist, user]);

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      if (prev.some((item) => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
