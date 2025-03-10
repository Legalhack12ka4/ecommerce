import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { FaTrash } from "react-icons/fa";

export default function Cart() {
  const { cart, updateCartQuantity, removeFromCart, clearCart } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const total = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [cart]);

  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  const confirmCheckout = () => {
    clearCart();
    setIsModalOpen(false);
    alert("Order placed successfully!");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="mt-4">Your cart is empty.</p>
      ) : (
        <>
          <div className="mt-4 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center justify-between border p-4 rounded-md shadow-md"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-contain"
                  />
                  <div>
                    <h2 className="text-lg font-bold">{item.title}</h2>
                    <p className="text-gray-700">
                      ${item.price} x {item.quantity}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mt-4 md:mt-0">
                  <button
                    className="p-2 bg-gray-300 rounded flex items-center justify-center w-10 h-10 cursor-pointer"
                    onClick={() =>
                      updateCartQuantity(item.id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>

                  <span className="px-3">{item.quantity}</span>

                  <button
                    className="p-2 bg-gray-300 rounded flex items-center justify-center w-10 h-10 cursor-pointer"
                    onClick={() =>
                      updateCartQuantity(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>

                  <button
                    className="p-2 bg-red-500 text-white rounded flex items-center justify-center w-10 h-10 cursor-pointer"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold mt-6">
            Total: ${totalPrice.toFixed(2)}
          </h2>

          <button
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded w-full md:w-auto cursor-pointer"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </>
      )}

      {isModalOpen && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 border">
            <h2 className="text-lg font-bold mb-4">Confirm Checkout</h2>
            <p>Are you sure you want to place the order?</p>

            <div className="flex justify-between mt-6">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer"
                onClick={confirmCheckout}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
