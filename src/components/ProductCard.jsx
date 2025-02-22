import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  return (
    <motion.div
      className="border p-4 rounded-md shadow-md flex flex-col h-full"
      whileHover={{ scale: 1.05 }}
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="h-48 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full object-contain"
        />
      </div>
      <div className="flex flex-col flex-grow mt-4">
        <h2 className="text-lg font-bold line-clamp-2">{product.title}</h2>
        <p className="text-gray-700 font-semibold">${product.price}</p>
        <p className="text-sm text-yellow-500">⭐ {product.rating.rate} / 5</p>
        <div className="mt-auto">
          <Link
            to={`/product/${product.id}`}
            className="mt-2 block text-center bg-blue-500 text-white py-2 rounded w-full"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
