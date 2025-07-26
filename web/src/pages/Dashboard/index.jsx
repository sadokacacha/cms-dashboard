import { useEffect, useState } from "react";
import axiosClient from "../../services/axios-client";
import SeoHead from "../../components/SeoHead";
import { ArrowTrendingUpIcon, DocumentTextIcon, CubeIcon } from "@heroicons/react/24/solid";

export default function DashboardHome() {
  const [stats, setStats] = useState({
    articleCount: 0,
    productCount: 0,
    lastArticle: null,
    lastProduct: null,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [articlesRes, productsRes] = await Promise.all([
          axiosClient.get("/articles"),
          axiosClient.get("/products"),
        ]);

        setStats({
          articleCount: articlesRes.data.length,
          productCount: productsRes.data.length,
          lastArticle: articlesRes.data.slice(-1)[0] || null,
          lastProduct: productsRes.data.slice(-1)[0] || null,
        });
      } catch (err) {
        console.error("Failed to load stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-4">
      <SeoHead />
      <h1 className="text-2xl font-bold mb-6 text-gray-800">📊 Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <DocumentTextIcon className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Articles</p>
              <p className="text-xl font-bold text-blue-700">{stats.articleCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <CubeIcon className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-sm text-gray-500">Products</p>
              <p className="text-xl font-bold text-green-700">{stats.productCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <ArrowTrendingUpIcon className="h-8 w-8 text-yellow-500" />
            <div>
              <p className="text-sm text-gray-500">Total Content</p>
              <p className="text-xl font-bold text-yellow-700">{stats.articleCount + stats.productCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Last Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl shadow border">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">📝 Last Article</h2>
          {stats.lastArticle ? (
            <>
              <p className="text-gray-800">{stats.lastArticle.title}</p>
              <p className="text-sm text-gray-500 mt-1">Created: {new Date(stats.lastArticle.createdAt).toLocaleString()}</p>
            </>
          ) : (
            <p className="text-gray-500 text-sm">No articles yet.</p>
          )}
        </div>

        <div className="bg-white p-5 rounded-xl shadow border">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">📦 Last Product</h2>
          {stats.lastProduct ? (
            <>
              <p className="text-gray-800">{stats.lastProduct.name}</p>
              <p className="text-sm text-gray-500 mt-1">Created: {new Date(stats.lastProduct.createdAt).toLocaleString()}</p>
            </>
          ) : (
            <p className="text-gray-500 text-sm">No products yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
