import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../../services/axios-client";
import SeoHead from "../../../components/SeoHead";
import { getImageUrl } from "../../../utils/imagePath";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axiosClient.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axiosClient.delete(`/products/${id}`);
      fetchProducts(); // refresh list
    } catch (err) {
      console.error("Failed to delete product:", err);
      alert("Delete failed.");
    }
  };

  return (
     <>
    <SeoHead title="Products" />
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link to="/dashboard/products/new">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow">
            + New Product
          </button>
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow p-4">
              {product.image && (
                <img
                  src={getImageUrl("products", product.image)}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded mb-4 hover:scale-105 transition"
                />
              )}
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-500 mb-1">{product.category}</p>
              <p className="text-sm text-gray-700 mb-2">{product.description}</p>
              <p className="font-semibold text-green-700 mb-1">${product.price}</p>
              <p className="text-sm text-gray-600 mb-2">Stock: {product.stock}</p>

              <div className="flex gap-2 mt-3">
                <Link to={`/dashboard/products/edit/${product._id}`}>
                  <button className="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </>
  );
}
