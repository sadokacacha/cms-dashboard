import { useState } from "react";
import axiosClient from "../../../services/axios-client";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosClient.post("/auth/forgot-password", { email });
      setMessage(res.data.message || "Reset code sent to your email.");
    } catch (err) {
      setError(err.response?.data?.message || "Error sending reset email.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded shadow space-y-4">
        <h2 className="text-xl font-bold text-blue-600">Forgot Password</h2>

        {message && <div className="text-green-600">{message}</div>}
        {error && <div className="text-red-600">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="w-full border px-4 py-2 rounded mb-4"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Send Reset Code
          </button>
        </form>
      </div>
    </div>
  );
}
