import { useState, useEffect } from "react";
import axiosClient from "../../services/axios-client";
import { availableRoutes } from "../../constant/availableRoutes";

export default function SeoManager() {
  const [path, setPath] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    ogTitle: "",
    ogImage: "",
    scripts: []
  });

  useEffect(() => {
    if (path) {
      axiosClient
        .get("/meta", { params: { path } }) // ✅ use query param
        .then(res => {
          const data = res.data || {};
          setForm({
            title: data.title || "",
            description: data.description || "",
            ogTitle: data.ogTitle || "",
            ogImage: data.ogImage || "",
            scripts: data.scripts ? JSON.parse(data.scripts) : []
          });
        })
        .catch(() => {
          setForm({
            title: "",
            description: "",
            ogTitle: "",
            ogImage: "",
            scripts: []
          });
        });
    }
  }, [path]);

  const updateField = (field, value) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const updateScript = (index, value) => {
    const scripts = [...form.scripts];
    scripts[index] = { ...scripts[index], script: value };
    setForm(prev => ({ ...prev, scripts }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await axiosClient.post("/meta", {
      path,
      ...form,
      scripts: JSON.stringify(form.scripts)
    });
    alert("Saved!");
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">SEO Manager</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <select value={path} onChange={e => setPath(e.target.value)} className="w-full p-2 border rounded">
          <option value="">Select a route</option>
          {availableRoutes.map(r => (
            <option key={r.path} value={r.path}>
              {r.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={e => updateField("title", e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={e => updateField("description", e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          placeholder="OG Title"
          value={form.ogTitle}
          onChange={e => updateField("ogTitle", e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          placeholder="OG Image URL"
          value={form.ogImage}
          onChange={e => updateField("ogImage", e.target.value)}
          className="w-full border p-2 rounded"
        />

        {form.scripts.map((s, i) => (
          <textarea
            key={i}
            value={s.script}
            onChange={e => updateScript(i, e.target.value)}
            className="w-full border p-2 rounded"
            placeholder={`Script #${i + 1}`}
          />
        ))}

        <button
          type="button"
          onClick={() =>
            setForm(prev => ({
              ...prev,
              scripts: [...prev.scripts, { pos: "head", script: "" }]
            }))
          }
          className="text-sm px-3 py-1 bg-blue-500 text-white rounded"
        >
          Add Script
        </button>

        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">
          Save SEO
        </button>
      </form>
    </div>
  );
}
