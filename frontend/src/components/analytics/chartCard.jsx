function ChartCard({
  title,
  icon,
  children,
}) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-[#0F172A] p-6">

      {/* Header */}
      <div className="mb-6 flex items-center gap-3">

        <div className="text-slate-500">
          {icon}
        </div>

        <h2 className="text-lg font-bold uppercase tracking-wide text-slate-400">
          {title}
        </h2>

      </div>

      {/* Chart */}
      <div className="h-[320px]">
        {children}
      </div>

    </div>
  );
}

export default ChartCard;