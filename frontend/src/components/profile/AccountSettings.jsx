import { useState } from "react";
import { Mail, Lock, UserRound } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { changePassword } from "../../api/api";

function AccountSettings() {
  const { user } = useApp();

  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);


  const handlePasswordChange = async (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    // -----------------------------
    // Frontend validation
    // -----------------------------

    if (
      !currentPassword ||
      !password ||
      !confirmPassword
    ) {
      setMessage(
        "Please fill in all password fields."
      );
      setMessageType("error");
      return;
    }

    if (password.length < 6) {
      setMessage(
        "Password must be at least 6 characters."
      );
      setMessageType("error");
      return;
    }

    if (password !== confirmPassword) {
      setMessage(
        "Passwords do not match."
      );
      setMessageType("error");
      return;
    }


    // -----------------------------
    // Backend
    // -----------------------------

    try {
      setLoading(true);

      await changePassword(
        currentPassword,
        password
      );

      setCurrentPassword("");
      setPassword("");
      setConfirmPassword("");

      setMessage(
        "Password changed successfully."
      );

      setMessageType("success");

    } catch (error) {

      console.error(
        "Password change error:",
        error
      );

      setMessage(
        error.message ||
        "Failed to change password."
      );

      setMessageType("error");

    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="rounded-3xl border border-slate-800 bg-[#111827] p-6">

      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-white">
          Account Settings
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Manage your personal account information and password.
        </p>
      </div>


      {/* Account Information */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

        {/* Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-400">
            Full Name
          </label>

          <div className="relative">
            <UserRound
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="text"
              value={user.name}
              readOnly
              className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-10 pr-4 text-sm text-white outline-none"
            />
          </div>
        </div>


        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-400">
            Email Address
          </label>

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="email"
              value={user.email}
              readOnly
              className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-10 pr-4 text-sm text-white outline-none"
            />
          </div>
        </div>

      </div>


      {/* Change Password */}
      <form
        onSubmit={handlePasswordChange}
        className="mt-6 border-t border-slate-800 pt-6"
      >

        <h3 className="text-base font-semibold text-white">
          Change Password
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Choose a new password for your account.
        </p>


        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">

          {/* Current Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-400">
              Current Password
            </label>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                type="password"
                value={currentPassword}
                onChange={(e) =>
                  setCurrentPassword(e.target.value)
                }
                placeholder="Enter current password"
                disabled={loading}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-10 pr-4 text-sm text-white outline-none transition focus:border-blue-500 disabled:opacity-50"
              />
            </div>
          </div>


          {/* New Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-400">
              New Password
            </label>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter new password"
                disabled={loading}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-10 pr-4 text-sm text-white outline-none transition focus:border-blue-500 disabled:opacity-50"
              />
            </div>
          </div>


          {/* Confirm Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-400">
              Confirm Password
            </label>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="Confirm new password"
                disabled={loading}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-10 pr-4 text-sm text-white outline-none transition focus:border-blue-500 disabled:opacity-50"
              />
            </div>
          </div>

        </div>


        {/* Message */}
        {message && (
          <p
            className={`mt-4 text-sm ${
              messageType === "success"
                ? "text-emerald-400"
                : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}


        {/* Save Button */}
        <div className="mt-5 flex justify-end">

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Changing..."
              : "Change Password"}
          </button>

        </div>

      </form>

    </div>
  );
}

export default AccountSettings;