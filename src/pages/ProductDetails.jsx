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
    <div className="p-4">
      <img
        src={product.image}
        alt={product.title}
        className="w-64 h-64 object-contain mx-auto"
      />
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <p>{product.description}</p>
      <p className="text-xl text-green-500">${product.price}</p>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>

      <button
        className="mt-4 px-4 py-2 bg-purple-500 text-white rounded"
        onClick={handleAddToWishlist}
      >
        Add to Wishlist
      </button>
    </div>
  );
};

export default ProductDetails;
