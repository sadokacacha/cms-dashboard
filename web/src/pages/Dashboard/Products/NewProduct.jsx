import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../../services/axios-client";
import SeoHead from "../../../components/SeoHead";

export default function NewProduct() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (image) formData.append("image", image);

    try {
      await axiosClient.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
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

        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          <input
            name="name"
            value={form.name}
            placeholder="Name"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            value={form.description}
            placeholder="Description"
            className="w-full p-2 border rounded h-24"
            onChange={handleChange}
            required
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />
          <input
            name="price"
            value={form.price}
            type="number"
            placeholder="Price"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
          <input
            name="stock"
            value={form.stock}
            type="number"
            placeholder="Stock"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
          <input
            name="category"
            value={form.category}
            placeholder="Category"
            className="w-full p-2 border rounded"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Create Product
          </button>
        </form>
      </div>
    </>
  );
}
