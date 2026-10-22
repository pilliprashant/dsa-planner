import {
  Eye,
  Pencil,
  Trash2,
  CheckCircle,
} from "lucide-react";

import DifficultyBadge from "./difficultyBadge";
import PlatformBadge from "./platFormBadge";

function QuestionRow({
  question,
  setSelectedQuestion,
  setEditingQuestion,
  setQuestions,
  deleteQuestion,
  markAsSolved,
}) {
  return (
    <tr className="border-t border-slate-800 transition hover:bg-slate-900/50">

      {/* Title */}
      <td className="p-6 align-middle">
        <h3 className="text-lg font-semibold text-white">
          {question.title}
        </h3>

        <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
          {question.description}
        </p>
      </td>


      {/* Difficulty */}
      <td className="px-3 align-middle">
        <DifficultyBadge
          difficulty={question.difficulty}
        />
      </td>


      {/* Topic */}
      <td className="px-3 align-middle text-sm font-medium text-slate-300">
        {question.topic}
      </td>


      {/* Revision Count */}
      <td className="px-3 align-middle">
        <span className="whitespace-nowrap text-sm font-semibold text-white">
          {question.revisionCount || 0} times
        </span>
      </td>


      {/* Next Scheduled */}
      <td className="px-3 align-middle">
        <span className="text-sm text-slate-300">
          {question.nextScheduled
            ? new Date(
                question.nextScheduled
              ).toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }
              )
            : "Not scheduled"}
        </span>
      </td>


      {/* Actions */}
      <td className="px-3 align-middle">
        <div className="flex items-center gap-4 text-slate-400">

          {/* Mark as Solved */}
          {!question.solved && (
            <button
              type="button"
              onClick={() =>
                markAsSolved(question._id)
              }
              title="Mark as Solved"
              className="transition hover:text-emerald-400"
            >
              <CheckCircle size={20} />
            </button>
          )}


          {/* View */}
          <button
            type="button"
            onClick={() =>
              setSelectedQuestion(question)
            }
            title="View"
            className="transition hover:text-blue-400"
          >
            <Eye size={20} />
          </button>


          {/* Edit */}
          <button
            type="button"
            onClick={() =>
              setEditingQuestion(question)
            }
            title="Edit"
            className="transition hover:text-yellow-400"
          >
            <Pencil size={20} />
          </button>


          {/* Delete */}
          <button
            type="button"
            onClick={() =>
              deleteQuestion(question._id)
            }
            title="Delete"
            className="transition hover:text-red-400"
          >
            <Trash2 size={20} />
          </button>

        </div>
      </td>

    </tr>
  );
}

export default QuestionRow;