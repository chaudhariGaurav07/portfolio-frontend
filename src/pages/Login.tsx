import React, { useState, useEffect } from "react";
import api from "@/lib/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Auto-redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

 const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  try {
    const { data } = await api.post("/auth/login", { email, password });
    const token = data?.data?.token; // Access nested token

    if (token) {
      localStorage.setItem("authToken", token);
      navigate("/admin", { replace: true });
    } else {
      setError("Invalid response from server");
    }
  } catch (err: any) {
    setError(err.response?.data?.message || "Login failed");
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="p-6 bg-white rounded-lg shadow-lg w-80 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Admin Login</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-400 outline-none"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-400 outline-none"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
