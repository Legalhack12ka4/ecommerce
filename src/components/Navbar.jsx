import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { FaShoppingCart, FaHeart } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <Link to="/" className="text-lg font-bold">
        E-Commerce
      </Link>

      <div className="flex items-center space-x-6">
        <Link to="/cart" className="relative flex items-center">
          <FaShoppingCart className="text-2xl" />
          {cart.length > 0 && (
            <span className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cart.length}
            </span>
          )}
        </Link>

        <Link to="/wishlist" className="relative flex items-center">
          <FaHeart className="text-2xl" />
          {wishlist.length > 0 && (
            <span className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {wishlist.length}
            </span>
          )}
        </Link>

        {user && (
          <div className="flex items-center space-x-4">
            <span className="text-sm">{user.email}</span>
            <button
              onClick={logout}
              className="px-4 py-1 bg-red-500 text-white rounded"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
