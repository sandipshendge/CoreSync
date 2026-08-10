import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/Context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("jk");
  const [password, setPassword] = useState("ss");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }

    setLoading(true);
    setError("");

    const res = await login({ uname: username, upassword: password });
    console.log(res);
    if (res.success) {
      navigate("/dashboard", { replace: true });
    } else {
      setError("Failed to Login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-gray-200 p-8 shadow-xl border border-gray-200">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>

            <p className="mt-2 text-sm text-gray-500">
              Please sign in to your CoreSync account
            </p>
          </div>
          {error && (
            <div className="mt-6 rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200">
              {error}
            </div>
          )}
          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>

              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError("");
                }}
                placeholder="Enter your username"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Enter your password"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center rounded-lg bg-indigo-600 py-2.5 px-4 text-sm font-semibold text-white shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
