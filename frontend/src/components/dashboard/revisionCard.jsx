import { Play } from "lucide-react";

function RevisionCard({
  difficulty,
  topic,
  status,
  title,
  revisionNo,
  note,
  onRevise,
}) {
  const difficultyColors = {
    easy: "bg-green-500/15 text-green-400 border border-green-500/20",
    medium:
      "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20",
    hard: "bg-red-500/15 text-red-400 border border-red-500/20",
  };

  const statusColors = {
    "Due Today": "bg-blue-500/15 text-blue-400",
    Overdue: "bg-red-500/15 text-red-400",
    Upcoming: "bg-purple-500/15 text-purple-400",
  };

  return (
    <div className="bg-[#020817] border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all">

      {/* Top badges */}
      <div className="flex items-center gap-2">

        {/* Difficulty */}
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            difficultyColors[difficulty?.toLowerCase()] ||
            "bg-slate-800 text-slate-300"
          }`}
        >
          {difficulty}
        </span>

        {/* Topic */}
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300">
          {topic}
        </span>

        {/* Status */}
        <span
          className={`ml-auto px-3 py-1 rounded-full text-xs font-semibold ${
            statusColors[status] ||
            "bg-slate-800 text-slate-300"
          }`}
        >
          {status}
        </span>

      </div>

      {/* Title */}
      <div className="mt-5 flex items-baseline gap-3">
        <h3 className="text-2xl font-bold text-white leading-tight">
          {title}
        </h3>

        <span className="shrink-0 text-sm font-medium text-slate-500">
          Revision #{revisionNo}
        </span>
      </div>

      {/* Description */}
      {note && (
        <p className="mt-4 text-sm leading-6 text-slate-400 italic">
          "{note}"
        </p>
      )}

      {/* Button */}
      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={onRevise}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-all"
        >
          <Play size={17} />
          Revise
        </button>
      </div>

    </div>
  );
}

export default RevisionCard;