import { X, Clock } from "lucide-react";
import { useState } from "react";

function DelayRevisionModal({ revision, onClose, onDelay }) {
  const [days, setDays] = useState("1");

  if (!revision) return null;

  const handleDelay = () => {
    onDelay(Number(days));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm sm:p-6">
      <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl sm:rounded-3xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 p-5 sm:p-6">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10">
              <Clock className="text-blue-400" size={20} />
            </div>

            <div className="min-w-0">
              <h2 className="text-lg font-bold text-white sm:text-xl">
                Delay Revision
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Postpone this revision to a later date.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="shrink-0 rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          {/* Question */}
          <div className="mb-5 rounded-xl border border-slate-800 bg-slate-950/50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Question
            </p>

            <p className="mt-1 break-words text-sm font-medium text-white sm:text-base">
              {revision.title}
            </p>
          </div>

          {/* Delay selection */}
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Delay by
          </label>

          <select
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="1">1 day</option>
            <option value="3">3 days</option>
            <option value="7">7 days</option>
          </select>

          <p className="mt-3 text-xs leading-5 text-slate-500">
            The next revision will be moved forward by the selected number
            of days.
          </p>
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse gap-3 border-t border-slate-800 p-5 sm:flex-row sm:justify-end sm:p-6">
          <button
            onClick={onClose}
            className="w-full rounded-xl border border-slate-700 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white sm:w-auto"
          >
            Cancel
          </button>

          <button
            onClick={handleDelay}
            className="w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 sm:w-auto"
          >
            Delay Revision
          </button>
        </div>
      </div>
    </div>
  );
}

export default DelayRevisionModal;