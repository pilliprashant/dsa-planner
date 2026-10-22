function DifficultyBadge({ difficulty }) {
  const colors = {
    easy: "bg-green-500/10 text-green-400 border-green-500/20",
    medium:
      "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    hard: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs font-semibold whitespace-nowrap ${
        colors[difficulty?.toLowerCase()] ||
        "bg-slate-500/10 text-slate-400 border-slate-500/20"
      }`}
    >
      {difficulty}
    </span>
  );
}

export default DifficultyBadge;