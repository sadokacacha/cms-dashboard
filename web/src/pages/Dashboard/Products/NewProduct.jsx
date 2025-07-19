import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../../services/axios-client";
import SeoHead from "../../../components/SeoHead";

export default function NewProduct() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    stock: "",
    category: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post("/products", form);
      navigate("/dashboard/products");
    } catch (err) {
      console.error(err);
      setError("Failed to create product");
    }
  };

  return (
    <>
      <SeoHead title="New Product" />
      <div className="p-4 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" required className="w-full p-2 border rounded" />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required className="w-full p-2 border rounded h-24" />
          <input type="text" name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="w-full p-2 border rounded" />
          <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" required className="w-full p-2 border rounded" />
          <input type="number" name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" required className="w-full p-2 border rounded" />
          <input type="text" name="category" value={form.category} onChange={handleChange} placeholder="Category" className="w-full p-2 border rounded" />

          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
            Create Product
          </button>
        </form>
      </div>
    </>
  );
}
