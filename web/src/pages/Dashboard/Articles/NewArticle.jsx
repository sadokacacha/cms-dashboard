// pages/Dashboard/Articles/NewArticle.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../../services/axios-client";
import SeoHead from "../../../components/SeoHead";

export default function NewArticle() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    image: "",
    tags: "",
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
      await axiosClient.post("/articles", form);
      navigate("/dashboard/articles");
    } catch (err) {
      console.error(err);
      setError("Failed to create article");
    }
  };

  return (
    <>
      <SeoHead title="New Article" />
      <div className="p-4 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Add New Article</h1>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="w-full p-2 border rounded"
            value={form.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="content"
            placeholder="Content"
            className="w-full p-2 border rounded h-32"
            value={form.content}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            className="w-full p-2 border rounded"
            value={form.image}
            onChange={handleChange}
          />
          <input
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            className="w-full p-2 border rounded"
            value={form.tags}
            onChange={handleChange}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            className="w-full p-2 border rounded"
            value={form.category}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Create Article
          </button>
        </form>
      </div>
    </>
  );
}
