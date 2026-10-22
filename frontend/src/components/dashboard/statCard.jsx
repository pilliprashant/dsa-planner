function StatCard({
  title,
  value,
  subtitle,
  progress,
  description,
  icon,
  color,
}) {
  const colors = {
    blue: {
      bg: "bg-blue-500/10",
      text: "text-blue-500",
      progress: "bg-blue-500",
    },
    green: {
      bg: "bg-emerald-500/10",
      text: "text-emerald-500",
      progress: "bg-emerald-500",
    },
    red: {
      bg: "bg-rose-500/10",
      text: "text-rose-500",
      progress: "bg-rose-500",
    },
    yellow: {
      bg: "bg-amber-500/10",
      text: "text-amber-500",
      progress: "bg-amber-500",
    },
  };

  const theme = colors[color];

  return (
    <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-7 flex flex-col gap-5">

      
      <div className="flex items-start justify-between">
        <h3 className="text-slate-500 text-sm font-semibold tracking-wider">
          {title}
        </h3>

        <div
          className={`h-12 w-12 rounded-2xl flex items-center justify-center ${theme.bg} ${theme.text}`}
        >
          {icon}
        </div>
      </div>

      
      <div>
        <h1 className="text-5xl font-bold text-white">
          {value}
          <span className="text-lg text-slate-400 font-normal ml-2">
            {subtitle}
          </span>
        </h1>
      </div>

      
      <div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full ${theme.progress} rounded-full`}
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-slate-500 text-sm mt-3">
          {description}
        </p>
      </div>
    </div>
  );
}

export default StatCard;