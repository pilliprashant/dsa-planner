import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpenText } from "lucide-react";

import { useApp } from "../context/AppContext";
import { loginUser } from "../api/api";

function Login() {
  const { login } = useApp();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError(
        "Please enter your email and password."
      );
      return;
    }

    try {
      setLoading(true);

      // -----------------------------
      // Login API
      // -----------------------------

      const data = await loginUser(
        email,
        password
      );


      // -----------------------------
      // Store JWT
      // -----------------------------

      localStorage.setItem(
        "token",
        data.token
      );


      // -----------------------------
      // Update App Authentication
      // -----------------------------

      login(data.user);


      // -----------------------------
      // Go to Dashboard
      // -----------------------------

      navigate("/");

    } catch (error) {

      console.error(
        "Login error:",
        error
      );

      setError(
        error.message ||
        "Invalid email or password."
      );

    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-[#020817] flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">

          <div className="bg-blue-600 p-3 rounded-2xl mb-4">
            <BookOpenText
              size={30}
              className="text-white"
            />
          </div>

          <h1 className="text-2xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="text-slate-400 mt-2">
            Sign in to continue to SmartDSA
          </p>

        </div>


        {/* Login Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Email */}
            <div>

              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter your email"
                disabled={loading}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-blue-500 disabled:opacity-50"
              />

            </div>


            {/* Password */}
            <div>

              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter your password"
                disabled={loading}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-blue-500 disabled:opacity-50"
              />

            </div>


            {/* Error */}
            {error && (
              <p className="text-sm text-red-400">
                {error}
              </p>
            )}


            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition"
            >
              {loading
                ? "Signing in..."
                : "Sign In"}
            </button>

          </form>


          {/* Register */}
          <p className="text-center text-sm text-slate-400 mt-6">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="text-blue-500 hover:text-blue-400 font-medium"
            >
              Create an account
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;