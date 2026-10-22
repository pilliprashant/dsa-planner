import { useState } from "react";
import { X } from "lucide-react";

function QuestionFormModal({
  question,
  onClose,
  onSave,
}) {
  const [title, setTitle] = useState(
    question?.title || ""
  );

  const [difficulty, setDifficulty] = useState(
    question?.difficulty || "easy"
  );

  const [topic, setTopic] = useState(
    question?.topic || "Arrays"
  );

  const [description, setDescription] = useState(
    question?.description || ""
  );

  const [link, setLink] = useState(
    question?.link || ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title is required.");
      return;
    }

    const questionData = {
      title: title.trim(),
      difficulty,
      topic,
      description: description.trim(),
      link: link.trim(),
    };

    onSave(questionData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm sm:p-6">
      <div className="my-4 max-h-[calc(100vh-2rem)] w-full max-w-[700px] overflow-y-auto rounded-3xl border border-slate-800 bg-[#0F172A] p-5 sm:my-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            {question ? "Edit Question" : "Add Question"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="shrink-0 text-slate-400 transition hover:text-white"
          >
            <X size={26} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5 sm:mt-8 sm:space-y-6"
        >
          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Question Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Two Sum"
              className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none focus:border-blue-500 sm:text-base"
            />
          </div>

          {/* Difficulty + Topic */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Difficulty
              </label>

              <select
                value={difficulty}
                onChange={(e) =>
                  setDifficulty(e.target.value)
                }
                className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none sm:text-base"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Topic
              </label>

              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none sm:text-base"
              >
                <option value="Arrays">Arrays</option>
                <option value="Strings">Strings</option>
                <option value="Linked List">
                  Linked List
                </option>
                <option value="Stack">Stack</option>
                <option value="Queue">Queue</option>
                <option value="Trees">Trees</option>
                <option value="Graphs">Graphs</option>
                <option value="Heap">Heap</option>
                <option value="DP">DP</option>
              </select>
            </div>
          </div>

          {/* Link */}
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Practice Link
            </label>

            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://leetcode.com/problems/..."
              className="w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none focus:border-blue-500 sm:text-base"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Notes / Description
            </label>

            <textarea
              rows={5}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Explain your approach, edge cases, or revision notes..."
              className="w-full resize-y rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none focus:border-blue-500 sm:text-base"
            />
          </div>

          {/* Footer */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:gap-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-2xl border border-slate-700 px-6 py-3 text-slate-300 transition hover:bg-slate-800 sm:w-auto"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-full rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
            >
              {question ? "Save Changes" : "Add Question"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default QuestionFormModal;