import { useEffect, useState } from "react";
import axiosClient from "../../../services/axios-client";
import { Link } from "react-router-dom";
import SeoHead from "../../../components/SeoHead";

export default function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await axiosClient.get("/articles");
      setArticles(res.data);
    } catch (err) {
      console.error("Failed to fetch articles:", err);
    }
  };

  const deleteArticle = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this article?");
    if (!confirmDelete) return;

    try {
      await axiosClient.delete(`/articles/${id}`);
      fetchArticles(); // refresh list
      alert("Article deleted successfully");
    } catch (err) {
      console.error("Failed to delete article:", err);
      alert("Failed to delete article. Please try again.");
    }
  };

  return (
    <>
      <SeoHead title="Articles" />
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Articles</h1>

        <Link to="/dashboard/articles/new">
          <button className="bg-green-600 text-white px-4 py-2 rounded mb-4">
            + New Article
          </button>
        </Link>

        {articles.length === 0 ? (
          <p>No articles found.</p>
        ) : (
          <div className="space-y-4">
            {articles.map((article) => (
              <div key={article._id} className="border p-4 rounded shadow">
                <h2 className="text-lg font-semibold">{article.title}</h2>
                <p className="text-sm text-gray-600">
                  {article.date ? new Date(article.date).toLocaleDateString() : "No date"}
                </p>
                {article.image && (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-32 h-32 object-cover rounded mt-2 mb-2"
                  />
                )}
                <p className="mt-2">{article.content?.slice(0, 100)}...</p>
                <div className="mt-2 space-x-2">
                  <Link to={`/dashboard/articles/edit/${article._id}`}>
                    <button className="bg-blue-500 text-white px-2 py-1 rounded">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => deleteArticle(article._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
