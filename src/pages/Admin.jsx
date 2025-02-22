import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete product.");
    }
  };

  const handleAddProduct = async () => {
    try {
      const res = await axios.post(
        "https://fakestoreapi.com/products",
        newProduct
      );
      setProducts([...products, res.data]);
      toast.success("Product added successfully!");
    } catch (error) {
      toast.error("Failed to add product.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Add Product</h2>
        <input
          type="text"
          placeholder="Title"
          value={newProduct.title}
          onChange={(e) =>
            setNewProduct({ ...newProduct, title: e.target.value })
          }
          className="border p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={(e) =>
            setNewProduct({ ...newProduct, image: e.target.value })
          }
          className="border p-2 mr-2"
        />
        <button
          onClick={handleAddProduct}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-2">Product List</h2>
      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between border p-4 rounded-md shadow-md"
          >
            <div className="flex items-center space-x-4">
              <img
                src={product.image}
                alt={product.title}
                className="w-16 h-16 object-contain"
              />
              <div>
                <h2 className="text-lg font-bold">{product.title}</h2>
                <p className="text-gray-700">${product.price}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                className="px-2 py-1 bg-red-500 text-white rounded"
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
