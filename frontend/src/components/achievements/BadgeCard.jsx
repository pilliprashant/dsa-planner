import { Lock } from "lucide-react";

function BadgeCard({
  title,
  description,
  icon,
  unlocked = false,
  unlockedDate,
  progress,
  target,
}) {
  const progressPercentage =
    progress !== undefined && target
      ? Math.min((progress / target) * 100, 100)
      : 0;

  return (
    <div
      className={`rounded-3xl border p-6 transition-all ${
        unlocked
          ? "border-slate-800 bg-[#111827]"
          : "border-slate-700 bg-[#080F20]"
      }`}
    >
      <div className="flex items-start gap-5">

        {/* Badge Icon */}
        <div
          className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl ${
            unlocked
              ? "bg-gradient-to-br from-blue-500 to-cyan-500"
              : "bg-slate-900"
          }`}
        >
          {unlocked ? (
            icon
          ) : (
            <Lock
              size={28}
              className="text-slate-700"
            />
          )}
        </div>

        {/* Badge Information */}
        <div className="min-w-0 flex-1">

          <div className="flex items-center gap-2">
            <h3
              className={`text-lg font-bold ${
                unlocked
                  ? "text-white"
                  : "text-slate-400"
              }`}
            >
              {title}
            </h3>

            {unlocked && (
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
            )}
          </div>

          <p className="mt-1 text-sm text-slate-500">
            {description}
          </p>

          {/* Unlocked Date */}
          {unlocked && unlockedDate && (
            <p className="mt-3 text-xs text-slate-500">
              Unlocked {unlockedDate}
            </p>
          )}
        </div>
      </div>

      {/* Locked Badge Progress */}
      {!unlocked && progress !== undefined && target && (
        <div className="mt-6 border-t border-slate-800 pt-4">

          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600">
              PROGRESS
            </span>

            <span className="text-xs font-semibold text-slate-500">
              {progress} / {target}
            </span>
          </div>

          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-500"
              style={{
                width: `${progressPercentage}%`,
              }}
            />
          </div>

        </div>
      )}
    </div>
  );
}

export default BadgeCard;