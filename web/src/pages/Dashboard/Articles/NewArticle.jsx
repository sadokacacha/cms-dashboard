import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../../services/axios-client";
import SeoHead from "../../../components/SeoHead";

export default function NewArticle() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    tags: "",
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
    for (const key in form) formData.append(key, form[key]);
    if (image) formData.append("image", image);

    try {
      await axiosClient.post("/articles", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
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
        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          <input
            name="title"
            placeholder="Title"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            value={form.title}
            required
          />
          <textarea
            name="content"
            placeholder="Content"
            className="w-full p-2 border rounded h-24"
            onChange={handleChange}
            value={form.content}
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
            name="tags"
            placeholder="Tags"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            value={form.tags}
          />
          <input
            name="category"
            placeholder="Category"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            value={form.category}
          />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
            Create Article
          </button>
        </form>
      </div>
    </>
  );
}
