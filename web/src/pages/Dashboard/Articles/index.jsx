import { useEffect, useState } from "react";
import axiosClient from "../../../services/axios-client";
import { Link } from "react-router-dom";
import SeoHead from "../../../components/SeoHead";
import { getImageUrl } from "../../../utils/imagePath";

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
    if (!window.confirm("Are you sure you want to delete this article?")) return;

    try {
      await axiosClient.delete(`/articles/${id}`);
      fetchArticles();
      alert("Article deleted successfully");
    } catch (err) {
      console.error("Failed to delete article:", err);
      alert("Failed to delete article. Please try again.");
    }
  };

  return (
    <>
      <SeoHead title="Articles" />
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">📰 Articles</h1>
          <Link to="/dashboard/articles/new">
            <button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-5 py-2 rounded-lg shadow">
              + New Article
            </button>
          </Link>
        </div>

        {articles.length === 0 ? (
          <p className="text-gray-600">No articles found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <div key={article._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                {article.image && (
                  <img
                    src={getImageUrl("articles", article.image)}
                    alt={article.title}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform"
                  />
                )}
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 truncate">{article.title}</h2>
                  <p className="text-xs text-gray-500 mb-2">
                    {article.date ? new Date(article.date).toLocaleDateString() : "No date"}
                  </p>
                  <p className="text-sm text-gray-700 line-clamp-3">
                    {article.content?.slice(0, 120)}...
                  </p>
                  <div className="flex justify-end gap-2 mt-4">
                    <Link to={`/dashboard/articles/edit/${article._id}`}>
                      <button className="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded">
                        ✏️ Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteArticle(article._id)}
                      className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
