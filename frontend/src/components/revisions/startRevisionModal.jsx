import { X, FileText } from "lucide-react";
import { useState } from "react";

function StartRevisionModal({
  question,
  onClose,
  onComplete,
}) {
  const [notes, setNotes] = useState("");

  if (!question) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm sm:p-6">

      <div className="my-4 max-h-[calc(100vh-2rem)] w-full max-w-[900px] overflow-y-auto rounded-3xl border border-slate-800 bg-[#0F172A] p-5 sm:my-6 sm:p-7">

        {/* Header */}
        <div className="flex items-start justify-between gap-4">

          <div className="min-w-0">

            <div className="mb-4 flex flex-wrap items-center gap-2 sm:gap-3">

              <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400">
                {question.difficulty}
              </span>

              <span className="rounded-md bg-slate-700 px-3 py-1 text-xs text-slate-300">
                {question.topic}
              </span>

              <span className="text-xs text-slate-400">
                Stage {question.stage}
              </span>

              <span className="text-xs font-semibold text-yellow-400">
                {question.status}
              </span>

            </div>

            <h2 className="break-words text-2xl font-bold text-white sm:text-3xl">
              {question.title}
            </h2>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="shrink-0 text-slate-500 transition hover:text-white"
          >
            <X size={26} />
          </button>

        </div>

        {/* Notes */}
        <div className="mt-6 sm:mt-8">

          <div className="mb-3 flex items-center gap-2">

            <FileText
              size={18}
              className="text-slate-500"
            />

            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Revision Notes
            </h3>

          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#111827] p-4 sm:p-5">

            <p className="text-sm italic leading-7 text-slate-400">
              {question.note
                ? `"${question.note}"`
                : "No revision notes available."}
            </p>

          </div>

        </div>

        <hr className="my-6 border-slate-800 sm:my-8" />

        {/* User Notes */}
        <div>

          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">
            Log Revision Notes & Reflections
          </h3>

          <textarea
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
            rows={5}
            placeholder="How did you solve it? Optimal complexity recalled? Any mistakes? What will you remember next time?"
            className="
              w-full
              resize-y
              rounded-2xl
              border
              border-slate-700
              bg-slate-800
              p-4
              text-sm
              text-white
              placeholder:text-slate-500
              outline-none
              focus:border-blue-500
            "
          />

        </div>

        {/* Footer */}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:mt-8 sm:flex-row sm:items-center sm:justify-end sm:gap-4">

          <button
            type="button"
            onClick={onClose}
            className="
              w-full
              rounded-xl
              border
              border-slate-700
              px-6
              py-3
              text-slate-300
              transition
              hover:bg-slate-800
              sm:w-auto
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => onComplete(notes)}
            className="
              w-full
              rounded-xl
              bg-green-600
              px-7
              py-3
              font-semibold
              text-white
              transition
              hover:bg-green-700
              sm:w-auto
            "
          >
            Complete Revision
          </button>

        </div>

      </div>
    </div>
  );
}

export default StartRevisionModal;