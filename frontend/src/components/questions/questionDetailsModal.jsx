import {
  X,
  ExternalLink,
  Play,
} from "lucide-react";
import { useState } from "react";

function QuestionDetailsModal({
  question,
  onClose,
  updateRevisionDateForQuestion,
}) {
  const [updating, setUpdating] = useState(false);

  const handleScheduleUpdate = async (date) => {
  try {
    setUpdating(true);

    await updateRevisionDateForQuestion(
      question._id,
      date.toISOString()
    );

    onClose();
  } catch (error) {
    console.error(
      "Failed to update revision date:",
      error
    );

    alert(
      error.message ||
        "Failed to update revision date."
    );
  } finally {
    setUpdating(false);
  }
};
  const handleMakeOverdue = () => {
    const yesterday = new Date();

    yesterday.setDate(
      yesterday.getDate() - 1
    );

    handleScheduleUpdate(yesterday);
  };

  const handleMakeDueToday = () => {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    handleScheduleUpdate(today);
  };

  const handlePostpone = () => {
    const nextWeek = new Date();

    nextWeek.setDate(
      nextWeek.getDate() + 7
    );

    handleScheduleUpdate(nextWeek);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm sm:p-6">
      <div className="my-4 max-h-[calc(100vh-2rem)] w-full max-w-[750px] overflow-y-auto rounded-3xl border border-slate-800 bg-[#0F172A] p-5 sm:my-6 sm:p-8">

        {/* Header */}
        <div className="flex items-start justify-between gap-4">

          <div className="min-w-0">

            <div className="mb-5 flex flex-wrap gap-3">

              <span className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1 text-xs font-semibold text-yellow-400">
                {question.difficulty}
              </span>

              <span className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs text-slate-300">
                {question.topic}
              </span>

            </div>

            <h1 className="break-words text-2xl font-bold text-white sm:text-4xl">
              {question.title}
            </h1>

          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={updating}
            className="shrink-0 text-slate-500 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={28} />
          </button>

        </div>

        <hr className="my-6 border-slate-800 sm:my-8" />

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 rounded-3xl bg-slate-800/40 p-5 sm:grid-cols-2 sm:gap-6 sm:p-6">

          <div>
            <p className="text-xs uppercase text-slate-500">
              Date Solved
            </p>

            <p className="mt-2 text-slate-200">
              {question.solvedDate
                ? new Date(
                    question.solvedDate
                  ).toLocaleDateString()
                : "Not Available"}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase text-slate-500">
              Next Revision Date
            </p>

            <p className="mt-2 text-slate-200">
              {question.nextScheduled
                ? new Date(
                    question.nextScheduled
                  ).toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    }
                  )
                : "Not scheduled"}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase text-slate-500">
              Revision Stage
            </p>

            <p className="mt-2 text-slate-200">
              Stage{" "}
              {question.revisionCount || 0}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase text-slate-500">
              Practice Link
            </p>

            {question.link ? (
              <a
                href={question.link}
                target="_blank"
                rel="noreferrer"
                className="mt-2 flex items-center gap-2 text-blue-400 hover:text-blue-300"
              >
                Open Problem
                <ExternalLink size={15} />
              </a>
            ) : (
              <p className="mt-2 text-slate-400">
                No link available
              </p>
            )}
          </div>

        </div>

        {/* Notes */}
        <div className="mt-8">

          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">
            Implementation Notes & Insights
          </h2>

          <div className="rounded-2xl border border-slate-800 p-5 leading-8 text-slate-300 sm:p-6">
            {question.description ||
              "No notes added."}
          </div>

        </div>

        {/* Controls */}
        <div className="mt-8 rounded-2xl border border-dashed border-slate-800 p-5 sm:p-6">

          <h2 className="font-bold text-yellow-400">
            Controls
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Change when this question should appear
            in your revision queue.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap">

            {/* Make Overdue */}
            <button
              type="button"
              onClick={handleMakeOverdue}
              disabled={updating}
              className="
                rounded-xl
                border
                border-red-500/20
                bg-red-500/10
                px-5
                py-3
                text-sm
                font-medium
                text-red-400
                transition
                hover:bg-red-500/20
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {updating
                ? "Updating..."
                : "Make Overdue"}
            </button>

            {/* Make Due Today */}
            <button
              type="button"
              onClick={handleMakeDueToday}
              disabled={updating}
              className="
                rounded-xl
                border
                border-yellow-500/20
                bg-yellow-500/10
                px-5
                py-3
                text-sm
                font-medium
                text-yellow-400
                transition
                hover:bg-yellow-500/20
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {updating
                ? "Updating..."
                : "Make Due Today"}
            </button>

            {/* Postpone */}
            <button
              type="button"
              onClick={handlePostpone}
              disabled={updating}
              className="
                rounded-xl
                border
                border-blue-500/20
                bg-blue-500/10
                px-5
                py-3
                text-sm
                font-medium
                text-blue-400
                transition
                hover:bg-blue-500/20
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {updating
                ? "Updating..."
                : "Postpone 7 Days"}
            </button>

          </div>

        </div>

        {/* Footer */}
        <button
          type="button"
          className="
            mt-8
            flex
            w-full
            items-center
            justify-center
            gap-3
            rounded-2xl
            bg-blue-600
            py-4
            text-base
            font-semibold
            text-white
            transition
            hover:bg-blue-700
            sm:py-5
            sm:text-lg
          "
        >
          <Play size={20} />
          Start Revision Now
        </button>

      </div>
    </div>
  );
}

export default QuestionDetailsModal;