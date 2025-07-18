// pages/Dashboard/Articles/EditArticle.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../../services/axios-client";
import SeoHead from "../../../components/SeoHead";

export default function EditArticle() {
  const { id } = useParams();
  const [form, setForm] = useState({
    title: "",
    content: "",
    image: "",
    tags: "",
    category: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axiosClient.get(`/articles/${id}`);
        setForm(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load article");
      }
    };
    fetchArticle();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.put(`/articles/${id}`, form);
      navigate("/dashboard/articles");
    } catch (err) {
      console.error(err);
      setError("Failed to update article");
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <>
      <SeoHead title={`Edit: ${form.title}`} />
      <div className="p-4 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Edit Article</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Title"
            required
          />
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            className="w-full p-2 border rounded h-32"
            placeholder="Content"
            required
          />
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Image URL"
          />
          <input
            type="text"
            name="tags"
            value={form.tags}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Tags"
          />
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Category"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Update Article
          </button>
        </form>
      </div>
    </>
  );
}
