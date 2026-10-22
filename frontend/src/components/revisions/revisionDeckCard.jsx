import {
  FileText,
  Play,
} from "lucide-react";

function RevisionDeckCard({
  revision,
  onStartRevision,
  onSkip,
}) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-[#0F172A] p-5 sm:p-6">

      {/* Main content */}
      <div>
        {/* Tags */}
        <div className="mb-4 flex flex-wrap items-center gap-2 sm:mb-5 sm:gap-3">

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              revision.difficulty === "easy"
                ? "bg-green-500/10 text-green-400"
                : revision.difficulty === "medium"
                ? "bg-yellow-500/10 text-yellow-400"
                : "bg-red-500/10 text-red-400"
            }`}
          >
            {revision.difficulty}
          </span>

          <span className="rounded-lg bg-slate-700 px-3 py-1 text-xs font-semibold text-slate-300">
            {revision.topic}
          </span>

          <span className="rounded-lg bg-slate-800 px-3 py-1 text-xs font-medium text-slate-400">
            Stage {revision.stage}
          </span>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              revision.status === "Due Today"
                ? "bg-yellow-500/10 text-yellow-400"
                : revision.status === "Overdue"
                ? "bg-red-500/10 text-red-400"
                : revision.status === "Upcoming"
                ? "bg-blue-500/10 text-blue-400"
                : "bg-green-500/10 text-green-400"
            }`}
          >
            {revision.status}
          </span>
        </div>

        {/* Title */}
        <h2 className="break-words text-lg font-bold text-white sm:text-xl">
          {revision.title}
        </h2>

        {/* Next scheduled */}
        {revision.nextScheduled && (
          <p className="mt-2 text-sm text-slate-500">
            Next revision:{" "}
            {new Date(
              revision.nextScheduled
            ).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        )}

        {/* Notes */}
        {revision.note && (
          <div className="mt-4 flex items-start gap-3">
            <FileText
              size={18}
              className="mt-1 shrink-0 text-slate-500"
            />

            <p className="text-sm italic leading-6 text-slate-400">
              "{revision.note}"
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-col gap-3 border-t border-slate-800 pt-5 sm:flex-row sm:justify-end">

        <button
          type="button"
          onClick={() => onSkip(revision)}
          className="
            w-full
            rounded-2xl
            border
            border-slate-700
            px-6
            py-2.5
            text-sm
            text-slate-300
            transition
            hover:bg-slate-800
            hover:text-white
            sm:w-auto
          "
        >
          Skip / Delay
        </button>

        <button
          type="button"
          onClick={() =>
            onStartRevision(revision)
          }
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-blue-600
            px-6
            py-2.5
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-blue-700
            sm:w-auto
          "
        >
          <Play
            size={18}
            fill="white"
          />

          Start Review
        </button>
      </div>
    </div>
  );
}

export default RevisionDeckCard;