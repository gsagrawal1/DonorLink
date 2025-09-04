import { useState } from "react";
import api from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/login",
        { email, password },
        { withCredentials: true }
      );
      localStorage.setItem("token", response.data.token);
      console.log(response);
      window.location.href = "/";
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-xl w-80 space-y-4 border border-red-300"
      >
        <h2 className="text-3xl font-bold text-center text-red-600">
          DonorLink Login
        </h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* Email */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-red-400 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-red-400 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          required
        />

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
        >
          Login
        </button>

        <p className="text-sm text-center text-gray-600 mt-2">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-red-600 cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
}
