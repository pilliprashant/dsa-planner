import {
  CheckCircle,
  RotateCcw,
  Flame,
  Trophy,
} from "lucide-react";

function ActivityItem({
  type,
  title,
  description,
  time,
}) {
  const activityIcons = {
    solved: {
      icon: <CheckCircle size={22} />,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    revision: {
      icon: <RotateCcw size={22} />,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    streak: {
      icon: <Flame size={22} />,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
    },
    achievement: {
      icon: <Trophy size={22} />,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
  };

  const current = activityIcons[type];

  return (
    <div className="flex gap-4">
      <div
        className={`h-12 w-12 rounded-2xl flex items-center justify-center ${current.bg} ${current.color}`}
      >
        {current.icon}
      </div>

      <div className="flex-1">
        <h3 className="text-white font-semibold">
          {title}
        </h3>

        <p className="text-slate-400 text-sm mt-1">
          {description}
        </p>

        <p className="text-slate-500 text-xs mt-2">
          {time}
        </p>
      </div>
    </div>
  );
}

export default ActivityItem;