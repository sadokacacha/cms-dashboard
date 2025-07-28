// components/SeoList.jsx
import { useState, useEffect } from "react";
import SeoForm from "./SeoForm";
import axiosClient from "../services/axios-client";

export default function SeoList() {
  const [seoEntries, setSeoEntries] = useState([]);
  const [selectedPath, setSelectedPath] = useState("");

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const res = await axiosClient.get("/meta/all");
      setSeoEntries(res.data);
    } catch (err) {
      console.error("Error fetching meta list", err);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📋 SEO Entries</h1>
      <ul className="space-y-2 mb-6">
        {seoEntries.map((entry) => (
          <li
            key={entry.path}
            className="p-3 border rounded hover:bg-gray-100 cursor-pointer"
            onClick={() => setSelectedPath(entry.path)}
          >
            <div className="font-semibold">{entry.title || "No title"}</div>
            <div className="text-sm text-gray-600">{entry.path}</div>
          </li>
        ))}
      </ul>

      {selectedPath && (
        <div className="border-t pt-6 mt-6">
          <SeoForm path={selectedPath} />
        </div>
      )}
    </div>
  );
}
