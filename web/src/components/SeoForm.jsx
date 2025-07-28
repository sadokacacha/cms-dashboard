// components/SeoForm.jsx
import { useEffect, useState } from "react";
import axiosClient from "../services/axios-client";

export default function SeoForm({ path }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    ogTitle: "",
    ogImage: "",
    keywords: "",
    robots: "",
    canonical: "",
    scripts: [],
  });

  useEffect(() => {
    if (!path) return;
    axiosClient
      .get("/meta", { params: { path } })
      .then((res) => {
        const meta = res.data || {};
        setForm({
          title: meta.title || "",
          description: meta.description || "",
          ogTitle: meta.ogTitle || "",
          ogImage: meta.ogImage || "",
          keywords: meta.keywords || "",
          robots: meta.robots || "",
          canonical: meta.canonical || "",
          scripts: meta.scripts ? JSON.parse(meta.scripts) : [],
        });
      })
      .catch(() => {
        setForm({
          title: "",
          description: "",
          ogTitle: "",
          ogImage: "",
          keywords: "",
          robots: "",
          canonical: "",
          scripts: [],
        });
      });
  }, [path]);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateScript = (index, value) => {
    const updated = [...form.scripts];
    updated[index] = { ...updated[index], script: value };
    setForm((prev) => ({ ...prev, scripts: updated }));
  };

  const addScript = () => {
    setForm((prev) => ({
      ...prev,
      scripts: [...prev.scripts, { script: "" }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post("/meta", {
        path,
        ...form,
        scripts: JSON.stringify(form.scripts),
      });
      alert("✅ SEO metadata saved!");
    } catch (err) {
      console.error("Failed to save SEO:", err);
      alert("❌ Error saving SEO");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Edit SEO for: <code>{path}</code></h2>

      {["title", "description", "ogTitle", "ogImage", "keywords", "robots", "canonical"].map((field) => (
        <input
          key={field}
          type="text"
          className="w-full p-2 border rounded"
          placeholder={field}
          value={form[field]}
          onChange={(e) => updateField(field, e.target.value)}
        />
      ))}

      <div className="space-y-2">
        <label className="block font-semibold">Inline Scripts:</label>
        {form.scripts.map((script, index) => (
          <textarea
            key={index}
            className="w-full p-2 border rounded"
            value={script.script}
            onChange={(e) => updateScript(index, e.target.value)}
            placeholder={`Script #${index + 1}`}
          />
        ))}
        <button type="button" onClick={addScript} className="px-3 py-1 bg-gray-300 rounded">
          ➕ Add Script
        </button>
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        💾 Save SEO
      </button>
    </form>
  );
}
