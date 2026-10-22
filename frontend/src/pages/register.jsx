import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpenText } from "lucide-react";

import { registerUser } from "../api/api";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // -----------------------------
    // Validation
    // -----------------------------

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      // -----------------------------
      // Register with backend
      // -----------------------------

      await registerUser({
        name,
        email,
        password,
      });

      // -----------------------------
      // Registration successful
      // -----------------------------

      // Make sure old authentication
      // does not affect the new account.
      localStorage.removeItem("token");
      localStorage.removeItem("smartdsa_user");

      // Go to login
      navigate("/login");

    } catch (error) {
      console.error("Registration error:", error);

      setError(
        error.message ||
          "Registration failed. Please try again."
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
            Create Your Account
          </h1>

          <p className="text-slate-400 mt-2">
            Start your DSA preparation with SmartDSA
          </p>

        </div>

        {/* Register Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Enter your name"
                disabled={loading}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-blue-500 disabled:opacity-50"
              />
            </div>

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
                placeholder="Create a password"
                disabled={loading}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-blue-500 disabled:opacity-50"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Confirm Password
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="Confirm your password"
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

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition"
            >
              {loading
                ? "Creating account..."
                : "Create Account"}
            </button>

          </form>

          {/* Login */}
          <p className="text-center text-sm text-slate-400 mt-6">

            Already have an account?{" "}

            <Link
              to="/login"
              className="text-blue-500 hover:text-blue-400 font-medium"
            >
              Sign In
            </Link>

          </p>

        </div>

      </div>
    </div>
  );
}

export default Register;