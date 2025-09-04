import { useState } from "react";
import api from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate()
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Frontend validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
        await api.post("/signup", {
        email,
        password,
        role,
      });
      navigate("/login")
      setSuccess("Account created successfully! You can now log in.");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setRole("USER");
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 font-black">
      <form
        onSubmit={handleSignup}
        className="bg-white p-6 rounded-2xl shadow-lg w-96 space-y-4 border border-red-200"
      >
        <h2 className="text-2xl font-bold text-center text-red-600">
          DonorLink Sign Up
        </h2>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm text-center bg-red-100 p-2 rounded-lg">
            {error}
          </p>
        )}

        {/* Success Message */}
        {success && (
          <p className="text-green-600 text-sm text-center bg-green-100 p-2 rounded-lg">
            {success}
          </p>
        )}

        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full text-gray-800 px-3 py-2 border border-red-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 mt-1"
          />
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full  text-gray-800 px-3 py-2 border border-red-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 mt-1"
          />
        </div>

        {/* Confirm Password Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full  text-gray-800 px-3 py-2 border border-red-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 mt-1"
          />
        </div>

        {/* Role Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full  text-gray-600 px-3 py-2 border border-red-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 mt-1 bg-white"
          >
            <option value="USER">User</option>
            <option value="DONOR">Donor</option>
            <option value="BLOODBANK">Blood Bank</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded-xl hover:bg-red-700 transition"
        >
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-red-600 hover:underline">
            Log In
          </a>
        </p>
      </form>
    </div>
  );
}
