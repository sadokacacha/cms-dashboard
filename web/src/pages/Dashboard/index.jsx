import { useEffect, useState } from "react";
import axiosClient from "../../services/axios-client";
import SeoHead from "../../components/SeoHead"; // ✅ Make sure this path is correct

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
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold text-lg">Articles</h2>
          <p>Total: {stats.articleCount}</p>
          {stats.lastArticle && (
            <p className="text-sm text-gray-500 mt-1">
              Last: {stats.lastArticle.title}
            </p>
          )}
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold text-lg">Products</h2>
          <p>Total: {stats.productCount}</p>
          {stats.lastProduct && (
            <p className="text-sm text-gray-500 mt-1">
              Last: {stats.lastProduct.name}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
