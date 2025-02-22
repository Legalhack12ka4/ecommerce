import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
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
    if (!newProduct.title || !newProduct.price || !newProduct.image) {
      toast.error("Please fill all fields!");
      return;
    }
    try {
      const res = await axios.post(
        "https://fakestoreapi.com/products",
        newProduct
      );
      setProducts([...products, res.data]);
      toast.success("Product added successfully!");
      setNewProduct({ title: "", price: "", image: "" });
    } catch (error) {
      toast.error("Failed to add product.");
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="sm:p-6 p-2 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white sm:p-6 p-2 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Admin Dashboard
        </h1>

        <div className="bg-gray-50 p-4 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            ➕ Add New Product
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Title"
              value={newProduct.title}
              onChange={(e) =>
                setNewProduct({ ...newProduct, title: e.target.value })
              }
              className="border p-2 rounded w-full"
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              className="border p-2 rounded w-full"
            />

            <div className="col-span-1 md:col-span-2">
              <label className="block text-gray-700 font-semibold mb-1">
                Upload Image
              </label>
              <div className="border p-3 rounded flex flex-col items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="fileUpload"
                />
                <label
                  htmlFor="fileUpload"
                  className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
                >
                  Choose Image
                </label>

                {newProduct.image && (
                  <img
                    src={newProduct.image}
                    alt="Preview"
                    className="mt-3 w-24 h-24 object-cover rounded"
                  />
                )}
              </div>
            </div>
          </div>

          <button
            onClick={handleAddProduct}
            className="mt-4 bg-green-500 text-white px-6 py-2 rounded w-full md:w-auto hover:bg-green-600 transition"
          >
            Add Product
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          🛍️ Product List
        </h2>

        {loading ? (
          <div className="text-center text-gray-700 text-lg font-semibold">
            🔄 Loading Products...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-24 h-24 object-contain mb-2"
                />
                <h2 className="text-lg font-semibold text-gray-800">
                  {product.title}
                </h2>
                <p className="text-gray-600 font-medium">${product.price}</p>
                <button
                  className="mt-2 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
