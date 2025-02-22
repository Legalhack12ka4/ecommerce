import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import {
  FaShoppingCart,
  FaHeart,
  FaBars,
  FaTimes,
  FaUser,
} from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center relative">
      <Link to="/" className="text-lg font-bold" onClick={closeMenu}>
        E-Commerce
      </Link>

      <button
        className="md:hidden text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div className="hidden md:flex items-center space-x-6">
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
            <FaUser className="text-lg" />
            <span className="text-sm"> {user.email}</span>
            <button
              onClick={logout}
              className="px-4 py-1 bg-red-500 text-white rounded cursor-pointer"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {menuOpen && (
        <div className="absolute top-14 left-0 w-full bg-gray-900 p-4 flex flex-col space-y-4 md:hidden">
          <Link
            to="/cart"
            className="flex items-center space-x-2"
            onClick={closeMenu}
          >
            <FaShoppingCart />
            <span>Cart ({cart.length})</span>
          </Link>
          <Link
            to="/wishlist"
            className="flex items-center space-x-2"
            onClick={closeMenu}
          >
            <FaHeart />
            <span>Wishlist ({wishlist.length})</span>
          </Link>
          {user && (
            <>
              <div className="flex items-center space-x-4">
                <FaUser className="text-lg" />
                <span className="text-sm">{user.email}</span>
              </div>
              <button
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="px-4 py-1 bg-red-500 text-white rounded cursor-pointer"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
