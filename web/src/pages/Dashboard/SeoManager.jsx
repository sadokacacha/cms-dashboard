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
keywords: "",
robots: "",
canonical: "",
scripts: []
});


useEffect(() => {
if (path) {
axiosClient
.get("/meta", { params: { path } })
.then(res => {
const data = res.data || {};
setForm({
title: data.title || "",
description: data.description || "",
ogTitle: data.ogTitle || "",
ogImage: data.ogImage || "",
keywords: data.keywords || "",
robots: data.robots || "",
canonical: data.canonical || "",
scripts: data.scripts ? JSON.parse(data.scripts) : []
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
<input
  type="text"
  placeholder="Keywords (comma separated)"
  value={form.keywords}
  onChange={e => updateField("keywords", e.target.value)}
  className="w-full border p-2 rounded"
/>

<input
  type="text"
  placeholder='Robots (e.g. "index,follow")'
  value={form.robots}
  onChange={e => updateField("robots", e.target.value)}
  className="w-full border p-2 rounded"
/>

<input
  type="text"
  placeholder="Canonical URL (e.g. https://yoursite.com/page)"
  value={form.canonical}
  onChange={e => updateField("canonical", e.target.value)}
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
      {path && (
  <div className="mt-6 border-t pt-4">
    <h2 className="text-lg font-semibold mb-2">Saved SEO for: <code>{path}</code></h2>

    <ul className="space-y-1 text-sm text-gray-700">
      {form.title && (
        <li>
          <strong>Title:</strong> {form.title}
        </li>
      )}
      {form.description && (
        <li>
          <strong>Description:</strong> {form.description}
        </li>
      )}
      {form.ogTitle && (
        <li>
          <strong>OG Title:</strong> {form.ogTitle}
        </li>
      )}
      {form.ogImage && (
        <li>
          <strong>OG Image:</strong> {form.ogImage}
        </li>
      )}
      {form.scripts.length > 0 && (
        <li>
          <strong>Scripts:</strong>
          <ul className="ml-4 list-disc">
            {form.scripts.map((s, i) => (
              <li key={i}>
                <code className="text-xs text-gray-600 block">{s.script.slice(0, 100)}{s.script.length > 100 ? '...' : ''}</code>
              </li>
            ))}
          </ul>
        </li>
      )}
    </ul>
  </div>
)}

    </div>
  );
}
