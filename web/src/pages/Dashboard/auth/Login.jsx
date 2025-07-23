import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../../../services/axios-client";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [remember, setRemember] = useState(false);


  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axiosClient.post("/auth/login", {
        email,
        password,
      });
      login(res.data.token, remember);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };


  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-600">CMS Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Admin login</p>

    </div>

        
        {error && (
          <div className="bg-red-100 text-red-700 p-2 text-sm rounded">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
          <div className="flex items-center justify-between">


  <a
    href="/forgot-password"
    className="text-sm text-blue-500 hover:underline"
  >
    Forgot password?
  </a>
</div>
        </form>

        {/* Optional Footer */}
        <div className="text-center text-sm text-gray-400 pt-2">
          © {new Date().getFullYear()} duality agency  ,  All rights reserved.
        </div>
      </div>
    </div>
  );
}
