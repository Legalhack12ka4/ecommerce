import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleRemove = (id) => {
    if (
      window.confirm(
        "Are you sure you want to remove this item from your Wishlist?"
      )
    ) {
      removeFromWishlist(id);
      toast.error("Removed from Wishlist");
    }
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item.id);
    toast.success(`${item.title} added to cart!`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Your Wishlist</h1>

      {wishlist.length === 0 ? (
        <p className="mt-4">Your wishlist is empty.</p>
      ) : (
        <div className="mt-4 space-y-4">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border p-4 rounded-md shadow-md"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-contain"
                />
                <div>
                  <h2 className="text-lg font-bold">{item.title}</h2>
                  <p className="text-gray-700">${item.price}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  className="px-2 py-1 bg-green-500 text-white rounded"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </button>

                <button
                  className="px-2 py-1 bg-red-500 text-white rounded"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>

                <Link
                  to={`/product/${item.id}`}
                  className="px-2 py-1 bg-blue-500 text-white rounded"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
