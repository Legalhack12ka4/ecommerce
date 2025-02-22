import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import showToast from "../components/Toast";
import Loader from "../components/Loader";
import { useWishlist } from "../context/WishlistContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`).then((response) => {
      setProduct(response.data);
    });
  }, [id]);

  if (!product) return <Loader />;

  const handleAddToCart = () => {
    addToCart(product);
    showToast(`${product.title} added to cart!`, "success");
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
    showToast(`${product.title} added to wishlist!`, "info");
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-64 h-64 object-contain"
        />
      </div>

      <div className="text-center mt-4">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <p className="text-2xl text-green-500 font-semibold mt-2">
          ${product.price}
        </p>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row sm:justify-center gap-4">
        <button
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition w-full sm:w-auto cursor-pointer"
          onClick={handleAddToCart}
        >
          Add to Cart 🛒
        </button>

        <button
          className="px-6 py-3 bg-purple-500 text-white font-semibold rounded hover:bg-purple-600 transition w-full sm:w-auto cursor-pointer"
          onClick={handleAddToWishlist}
        >
          Add to Wishlist 💜
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
