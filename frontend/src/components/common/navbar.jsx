import {
  Bell,
  BookOpenText,
  User,
  Award,
  LogOut,
  AlertCircle,
  Clock,
  Menu,
  X,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useApp } from "../../context/AppContext";

function Navbar({ sidebarOpen, setSidebarOpen }) {
  const {
    user,
    preferences,
    questions,
    logout,
  } = useApp();

  const navigate = useNavigate();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // -----------------------------
  // Notifications
  // -----------------------------

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const notifications =
    preferences?.notifications &&
    preferences?.revisionReminders
      ? questions
          .filter((question) => {
            return (
              question.solved === true &&
              question.revisionCompleted !== true &&
              question.nextScheduled
            );
          })
          .map((question) => {

            const scheduledDate = new Date(
              question.nextScheduled
            );

            scheduledDate.setHours(0, 0, 0, 0);

            if (scheduledDate < today) {
              return {
                id: `overdue-${question._id}`,
                type: "overdue",
                title: "Revision overdue",
                message: `${question.title} is overdue for revision.`,
              };
            }

            if (
              scheduledDate.getTime() === today.getTime()
            ) {
              return {
                id: `today-${question._id}`,
                type: "today",
                title: "Revision due today",
                message: `It's time to revise ${question.title}.`,
              };
            }

            return null;
          })
          .filter(Boolean)
      : [];

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    navigate("/login");
  };

  return (
    <nav className="h-16 sm:h-[72px] shrink-0 border-b border-slate-800 bg-[#020817] px-4 sm:px-6 lg:px-8 flex items-center justify-between">

      {/* Left Section */}
      <div className="flex items-center gap-3">

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => {
            setSidebarOpen((prev) => !prev);
            setShowProfileMenu(false);
            setShowNotifications(false);
          }}
          className="lg:hidden h-10 w-10 flex items-center justify-center text-slate-400 hover:text-white transition"
        >
          {sidebarOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3">

          <div className="bg-blue-600 p-2 rounded-xl">
            <BookOpenText
              size={22}
              className="text-white"
            />
          </div>

          <div>
            <h1 className="text-white font-bold text-lg sm:text-xl">
              SmartDSA
            </h1>

            <p className="hidden sm:block text-xs text-slate-400">
              Coding Interview Hub
            </p>
          </div>

        </div>

      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">

        {/* Notifications */}
        <div
          ref={notificationRef}
          className="relative"
        >

          <button
            type="button"
            onClick={() => {
              setShowNotifications((prev) => !prev);
              setShowProfileMenu(false);
            }}
            className="relative h-10 w-10 flex items-center justify-center text-slate-400 hover:text-white transition"
          >
            <Bell size={22} />

            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                {notifications.length}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-12 w-[calc(100vw-2rem)] max-w-80 rounded-xl border border-slate-700 bg-[#0f172a] shadow-xl z-50 overflow-hidden">

              <div className="px-4 py-3 border-b border-slate-700">
                <h3 className="text-sm font-semibold text-white">
                  Notifications
                </h3>
              </div>

              {notifications.length === 0 ? (
                <div className="px-4 py-8 text-center">

                  <Bell
                    size={28}
                    className="mx-auto text-slate-600 mb-2"
                  />

                  <p className="text-sm text-slate-400">
                    No new notifications
                  </p>

                </div>
              ) : (
                <div className="max-h-80 overflow-y-auto">

                  {notifications.map((notification) => (

                    <button
                      key={notification.id}
                      type="button"
                      onClick={() => {
                        setShowNotifications(false);
                        navigate("/revisions");
                      }}
                      className="w-full text-left flex gap-3 px-4 py-3 hover:bg-slate-800 transition"
                    >

                      {notification.type === "overdue" ? (
                        <AlertCircle
                          size={20}
                          className="text-red-400 mt-0.5 shrink-0"
                        />
                      ) : (
                        <Clock
                          size={20}
                          className="text-yellow-400 mt-0.5 shrink-0"
                        />
                      )}

                      <div className="min-w-0">

                        <p className="text-sm font-medium text-white">
                          {notification.title}
                        </p>

                        <p className="text-xs text-slate-400 mt-1">
                          {notification.message}
                        </p>

                      </div>

                    </button>

                  ))}

                </div>
              )}

            </div>
          )}

        </div>

        {/* User */}
        <div
          ref={profileRef}
          className="relative"
        >

          <button
            type="button"
            onClick={() => {
              setShowProfileMenu((prev) => !prev);
              setShowNotifications(false);
            }}
            className="h-10 flex items-center gap-2 sm:gap-3 hover:opacity-90 transition"
          >

            <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shrink-0">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            {/* Hide username on mobile */}
            <span className="hidden sm:block font-semibold text-slate-200 max-w-32 truncate">
              {user?.name}
            </span>

          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 top-12 sm:top-14 w-56 rounded-xl border border-slate-700 bg-[#0f172a] shadow-xl z-50 overflow-hidden">

              {/* User Info */}
              <div className="px-4 py-3 border-b border-slate-700">

                <p className="text-sm font-semibold text-white">
                  {user?.name}
                </p>

                <p className="text-xs text-slate-400 truncate">
                  {user?.email}
                </p>

              </div>

              {/* My Profile */}
              <Link
                to="/profile"
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white transition"
              >
                <User size={18} />
                <span>My Profile</span>
              </Link>

              {/* Achievements */}
              <Link
                to="/achievements"
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white transition"
              >
                <Award size={18} />
                <span>Achievements</span>
              </Link>

              {/* Sign Out */}
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-slate-800 hover:text-red-300 transition"
              >
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>

            </div>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;