import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../../services/axios-client";
import SeoHead from "../../../components/SeoHead";

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
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;

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
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Products</h1>

        <Link to="/dashboard/products/new">
          <button className="bg-green-600 text-white px-4 py-2 rounded mb-4">
            + New Product
          </button>
        </Link>

        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product._id} className="border p-4 rounded shadow">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-sm text-gray-600 mb-1">{product.category}</p>
                {product.image && (
                  <img
                    src={`http://localhost:5000/uploads/products/${product.image}`}
                    alt={product.name}
                    className="w-32 h-32 object-cover rounded mb-2"
                  />
                )}
                <p>{product.description}</p>
                <p className="mt-2 font-bold">Price: ${product.price}</p>
                <p>Stock: {product.stock}</p>

                <div className="mt-2 space-x-2">
                  <Link to={`/dashboard/products/edit/${product._id}`}>
                    <button className="bg-blue-500 text-white px-2 py-1 rounded">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
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
