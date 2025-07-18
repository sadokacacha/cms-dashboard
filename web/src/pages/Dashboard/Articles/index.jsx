import { useEffect, useState } from "react";
import axios from "axios";
import SeoHead from "../../../components/SeoHead";

export default function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    const res = await axios.get("http://localhost:5000/api/articles");
    setArticles(res.data);
  };

  const deleteArticle = async (id) => {
    await axios.delete(`http://localhost:5000/api/articles/${id}`);
    fetchArticles(); // refresh list
  };

  return (
    <>
      <SeoHead />
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Articles</h1>

        <div className="space-y-4">
          {articles.map((article) => (
            <div key={article.id} className="border p-4 rounded shadow">
              <h2 className="text-lg font-semibold">{article.title}</h2>
              <p className="text-sm text-gray-600">{article.date}</p>
              <p className="mt-2">{article.content.slice(0, 100)}...</p>
              <div className="mt-2 space-x-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => {/* open edit form modal */}}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => deleteArticle(article.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
