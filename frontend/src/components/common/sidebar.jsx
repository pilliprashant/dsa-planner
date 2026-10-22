import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  CalendarClock,
  BarChart3,
  Award,
  User,
  LogOut,
  X,
} from "lucide-react";

import { useApp } from "../../context/AppContext";

const menuItems = [
  {
    title: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Questions",
    path: "/questions",
    icon: BookOpen,
  },
  {
    title: "Revisions",
    path: "/revisions",
    icon: CalendarClock,
  },
  {
    title: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Achievements",
    path: "/achievements",
    icon: Award,
  },
  {
    title: "Profile Settings",
    path: "/profile",
    icon: User,
  },
];

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { user, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setSidebarOpen(false);
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static
          inset-y-0 left-0
          z-50
          w-72 sm:w-80
          bg-[#020817]
          border-r border-slate-800
          text-white
          flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >

        {/* Mobile Close Button */}
        <div className="flex justify-end p-4 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="text-slate-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* User Section */}
        <div className="p-5 sm:p-6 border-b border-slate-800">

          <div className="flex items-center gap-4">

            <div className="h-12 w-12 sm:h-14 sm:w-14 shrink-0 rounded-2xl bg-blue-600 flex items-center justify-center text-xl sm:text-2xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0">

              <h2 className="text-xl sm:text-2xl font-bold truncate">
                {user?.name}
              </h2>

              <p className="text-yellow-400 font-semibold text-sm sm:text-base">
                🔥 {user?.streak || 0} Day Streak
              </p>

            </div>

          </div>

        </div>

        {/* Menu */}
        <nav className="flex-1 px-3 py-5 sm:py-6 overflow-y-auto">

          <ul className="space-y-2 sm:space-y-3">

            {menuItems.map((item) => {

              const Icon = item.icon;

              return (
                <li key={item.title}>

                  <NavLink
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-4 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg font-medium transition-all duration-300 ${
                        isActive
                          ? "bg-slate-900 text-blue-500 border-l-4 border-blue-500"
                          : "text-slate-400 hover:bg-slate-900 hover:text-white"
                      }`
                    }
                  >
                    <Icon size={24} className="shrink-0" />

                    <span>{item.title}</span>
                  </NavLink>

                </li>
              );
            })}

          </ul>

        </nav>

        {/* Logout */}
        <div className="border-t border-slate-800 p-5 sm:p-6">

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-4 text-red-500 hover:text-red-400 text-base sm:text-xl font-medium transition-all"
          >
            <LogOut size={24} />

            <span>Sign Out</span>
          </button>

        </div>

      </aside>
    </>
  );
}

export default Sidebar;