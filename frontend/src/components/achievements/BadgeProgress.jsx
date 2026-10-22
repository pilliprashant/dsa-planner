import { Sparkles } from "lucide-react";

function BadgeProgress({
  unlocked = 0,
  total = 7,
}) {
  const percentage =
    total > 0
      ? Math.round((unlocked / total) * 100)
      : 0;

  return (
    <div className="rounded-3xl border border-slate-800 bg-[#111827] px-7 py-6">

      {/* Top Section */}
      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm font-semibold tracking-wide text-slate-500">
            BADGE PROGRESS
          </p>

          <div className="mt-2 flex items-center gap-2">
            <h2 className="text-2xl font-bold text-white">
              Unlocked {unlocked} of {total} Badges
            </h2>

            <Sparkles
              size={22}
              className="text-orange-400"
            />
          </div>
        </div>

        {/* Percentage */}
        <div className="text-right">
          <p className="text-4xl font-bold text-blue-400">
            {percentage}%
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Completion Rate
          </p>
        </div>

      </div>

      {/* Progress Bar */}
      <div className="mt-6 h-3 w-full overflow-hidden rounded-full bg-slate-800">

        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </div>
  );
}

export default BadgeProgress;