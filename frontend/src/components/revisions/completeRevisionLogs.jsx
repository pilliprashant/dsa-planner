import { FileText, CalendarDays } from "lucide-react";

function CompletedRevisionLogs({ revisions }) {
  const completedLogs = revisions.flatMap((revision) =>
    (revision.revisionLogs || []).map((log, index) => ({
      ...log,
      revisionTitle: revision.title,
      stage: log.stage ?? index + 1,
    }))
  );

  if (completedLogs.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-[#0F172A] p-10 text-center">
        <FileText
          size={36}
          className="mx-auto text-slate-600"
        />

        <h3 className="mt-4 text-lg font-semibold text-white">
          No completed revision logs yet
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Complete a revision and your notes will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {completedLogs.map((log, index) => (
        <div
          key={`${log.revisionTitle}-${log.date}-${index}`}
          className="rounded-3xl border border-slate-800 bg-[#0F172A] p-6"
        >
          <div className="flex items-start gap-4">

            {/* Icon */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10">
              <FileText
                size={20}
                className="text-blue-400"
              />
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">

              {/* Question title */}
              <h3 className="text-lg font-bold text-white">
                {log.revisionTitle}
              </h3>

              {/* Stage + Date */}
              <div className="mt-2 flex items-center gap-4 text-xs text-slate-500">

                <span>
                  Revision {log.stage}
                </span>

                <span className="flex items-center gap-1">
                  <CalendarDays size={14} />

                  {new Date(
                    log.date
                  ).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>

              </div>

              {/* Revision Notes */}
              {log.result && (
                <div className="mt-5 rounded-2xl border border-slate-800 bg-[#111827] p-4">
                  <p className="text-sm italic leading-6 text-slate-400">
                    "{log.result}"
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CompletedRevisionLogs;