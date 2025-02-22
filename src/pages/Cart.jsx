import React from "react";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";

export default function Cart() {
  const { cart, updateCartQuantity, removeFromCart } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const total = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [cart]);

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
                    <p className="text-gray-700">
                      ${item.price} x {item.quantity}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    className="px-2 py-1 bg-gray-300 rounded"
                    onClick={() =>
                      updateCartQuantity(item.id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    className="px-2 py-1 bg-gray-300 rounded"
                    onClick={() =>
                      updateCartQuantity(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>

                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold mt-6">
            Total: ${totalPrice.toFixed(2)}
          </h2>

          <button
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => alert("Checkout completed! (Mocked Action)")}
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}
