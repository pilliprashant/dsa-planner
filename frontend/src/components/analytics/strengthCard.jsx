import { CheckCircle2, AlertCircle } from "lucide-react";

function StrengthCard({
  title,
  description,
  topics,
  type,
}) {
  const isStrong = type === "strong";

  return (
    <div
      className={`rounded-3xl border p-5 ${
        isStrong
          ? "border-green-900/50 bg-[#0F172A]"
          : "border-red-900/50 bg-[#0F172A]"
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-3">

        <div
          className={`flex h-8 w-8 items-center justify-center rounded-xl ${
            isStrong
              ? "bg-green-500/10"
              : "bg-red-500/10"
          }`}
        >
          {isStrong ? (
            <CheckCircle2
              size={22}
              className="text-green-400"
            />
          ) : (
            <AlertCircle
              size={22}
              className="text-red-400"
            />
          )}
        </div>

        <h2
          className={`text-lg font-bold ${
            isStrong
              ? "text-green-400"
              : "text-red-400"
          }`}
        >
          {title}
        </h2>

      </div>

      {/* Description */}
      <p className="mt-3 text-slate-400 leading-6 text-sm">
        {description}
      </p>

      {/* Topic Pills */}
      <div className="mt-6 flex flex-wrap gap-3">

        {topics.map((topic) => (
          <span
            key={topic}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              isStrong
                ? "bg-green-500/10 text-green-400"
                : "bg-red-500/10 text-red-400"
            }`}
          >
            {topic}
          </span>
        ))}

      </div>

    </div>
  );
}

export default StrengthCard;