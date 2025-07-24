// pages/auth/ResetPassword.jsx
import { useState } from "react";
import axiosClient from "../../../services/axios-client";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post("/auth/reset-password", {
        email,
        code,
        newPassword,
      });
      setMessage("✅ Password reset successfully!");
      setTimeout(() => navigate("/auth/login"), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Reset failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Reset code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full p-2 border rounded"
            />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Reset Password
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
