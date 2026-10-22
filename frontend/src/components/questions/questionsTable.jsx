import QuestionRow from "./questionRow";

function QuestionsTable({
  questions,
  setSelectedQuestion,
  setEditingQuestion,
  deleteQuestion,
  markAsSolved,
}) {
  return (
    <div className="mt-6">
      {questions.length === 0 ? (
        <div className="rounded-3xl border border-slate-800 bg-[#0F172A] px-6 py-16 text-center">
          <p className="text-lg font-semibold text-white">
            No questions found
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Try changing your search or filters.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden overflow-hidden rounded-3xl border border-slate-800 bg-[#0F172A] lg:block">
            <table className="w-full">
              <thead className="border-b border-slate-800 text-sm uppercase text-slate-400">
                <tr>
                  <th className="w-[42%] p-6 text-left font-semibold">
                    Title
                  </th>

                  <th className="w-[10%] px-3 py-6 text-left font-semibold">
                    Difficulty
                  </th>

                  <th className="w-[10%] px-3 py-6 text-left font-semibold">
                    Topic
                  </th>

                  <th className="w-[12%] px-3 py-6 text-left font-semibold">
                    Revision Count
                  </th>

                  <th className="w-[13%] px-3 py-6 text-left font-semibold">
                    Next Scheduled
                  </th>

                  <th className="w-[13%] px-3 py-6 text-left font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {questions.map((question) => (
                  <QuestionRow
                    key={question._id}
                    question={question}
                    setSelectedQuestion={setSelectedQuestion}
                    setEditingQuestion={setEditingQuestion}
                    deleteQuestion={deleteQuestion}
                    markAsSolved={markAsSolved}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile / Tablet Cards */}
          <div className="space-y-4 lg:hidden">
            {questions.map((question) => (
              <QuestionMobileCard
                key={question._id}
                question={question}
                setSelectedQuestion={setSelectedQuestion}
                setEditingQuestion={setEditingQuestion}
                deleteQuestion={deleteQuestion}
                markAsSolved={markAsSolved}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function QuestionMobileCard({
  question,
  setSelectedQuestion,
  setEditingQuestion,
  deleteQuestion,
  markAsSolved,
}) {
  const difficultyColors = {
    easy: "bg-green-500/15 text-green-400 border-green-500/20",
    medium: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
    hard: "bg-red-500/15 text-red-400 border-red-500/20",
  };

  const difficultyClass =
    difficultyColors[question.difficulty?.toLowerCase()] ||
    "bg-slate-800 text-slate-300 border-slate-700";

  const scheduledDate = question.nextScheduled
    ? new Date(question.nextScheduled).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Not scheduled";

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0F172A] p-5">
      {/* Top */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-base font-semibold leading-6 text-white">
            {question.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
            {question.description || "No description added."}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${difficultyClass}`}
        >
          {question.difficulty}
        </span>
      </div>

      {/* Details */}
      <div className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-800 pt-5">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Topic
          </p>

          <p className="mt-1 text-sm font-medium text-slate-300">
            {question.topic}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Revisions
          </p>

          <p className="mt-1 text-sm font-medium text-white">
            {question.revisionCount || 0}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Next Revision
          </p>

          <p className="mt-1 text-sm text-slate-300">
            {scheduledDate}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Status
          </p>

          <p
            className={`mt-1 text-sm font-medium ${
              question.solved
                ? "text-emerald-400"
                : "text-yellow-400"
            }`}
          >
            {question.solved ? "Solved" : "Unsolved"}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-800 pt-5">
        {!question.solved && (
          <button
            type="button"
            onClick={() => markAsSolved(question._id)}
            className="flex-1 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-2.5 text-sm font-medium text-emerald-400 transition hover:bg-emerald-500/20"
          >
            Mark Solved
          </button>
        )}

        <button
          type="button"
          onClick={() => setSelectedQuestion(question)}
          className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-700"
        >
          View
        </button>

        <button
          type="button"
          onClick={() => setEditingQuestion(question)}
          className="rounded-xl border border-yellow-500/20 bg-yellow-500/10 px-4 py-2.5 text-sm font-medium text-yellow-400 transition hover:bg-yellow-500/20"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => deleteQuestion(question._id)}
          className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/20"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default QuestionsTable;