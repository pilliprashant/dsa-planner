import { Trophy } from "lucide-react";

function AchievementsHeader() {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3">
        <Trophy
          size={30}
          className="text-blue-500"
        />

        <h1 className="text-3xl font-bold text-white">
          Gamification & Badges
        </h1>
      </div>

      <p className="mt-2 text-base text-slate-400">
        Challenge yourself! Stay consistent, solve questions, and maintain
        study streaks to unlock exclusive developer badges.
      </p>
    </div>
  );
}

export default AchievementsHeader;