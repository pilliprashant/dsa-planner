import { Bell, CalendarClock, Moon } from "lucide-react";
import { useApp } from "../../context/AppContext";

function Preferences() {
  const {
    preferences,
    updatePreferences,
  } = useApp();

  return (
    <div className="rounded-3xl border border-slate-800 bg-[#111827] p-6">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-white">
          Preferences
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Customize your SmartDSA experience.
        </p>
      </div>

      <div className="space-y-4">

        {/* Notifications */}
        <div className="flex items-center justify-between rounded-2xl bg-slate-900/70 p-4">

          <div className="flex items-center gap-4">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
              <Bell
                size={19}
                className="text-blue-400"
              />
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                Notifications
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Receive updates and activity notifications.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              updatePreferences({
                notifications: !preferences.notifications,
              })
            }
            className={`relative h-6 w-11 rounded-full transition ${
              preferences.notifications
                ? "bg-blue-600"
                : "bg-slate-700"
            }`}
          >
            <span
              className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                preferences.notifications
                  ? "left-6"
                  : "left-1"
              }`}
            />
          </button>

        </div>

        {/* Revision Reminders */}
        <div className="flex items-center justify-between rounded-2xl bg-slate-900/70 p-4">

          <div className="flex items-center gap-4">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10">
              <CalendarClock
                size={19}
                className="text-purple-400"
              />
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                Revision Reminders
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Get reminders when questions are due for revision.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              updatePreferences({
                revisionReminders:
                  !preferences.revisionReminders,
              })
            }
            className={`relative h-6 w-11 rounded-full transition ${
              preferences.revisionReminders
                ? "bg-blue-600"
                : "bg-slate-700"
            }`}
          >
            <span
              className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                preferences.revisionReminders
                  ? "left-6"
                  : "left-1"
              }`}
            />
          </button>

        </div>

        {/* Theme */}
        <div className="flex items-center justify-between rounded-2xl bg-slate-900/70 p-4">

          <div className="flex items-center gap-4">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800">
              <Moon
                size={19}
                className="text-slate-300"
              />
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                Appearance
              </p>

              <p className="mt-1 text-xs text-slate-500">
                SmartDSA is currently using dark mode.
              </p>
            </div>

          </div>

          <span className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-400">
            Dark
          </span>

        </div>

      </div>

    </div>
  );
}

export default Preferences;