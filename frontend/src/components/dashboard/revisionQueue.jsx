import { ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import RevisionCard from "./revisionCard";
import { useApp } from "../../context/AppContext";

function RevisionQueue() {
  const { questions } = useApp();

  const navigate = useNavigate();

  const getRevisionStatus = (
    nextScheduled
  ) => {

    if (!nextScheduled) {
      return "Upcoming";
    }

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const scheduledDate = new Date(
      nextScheduled
    );

    scheduledDate.setHours(0, 0, 0, 0);

    if (scheduledDate < today) {
      return "Overdue";
    }

    if (
      scheduledDate.getTime() ===
      today.getTime()
    ) {
      return "Due Today";
    }

    return "Upcoming";
  };

  const revisions = questions

    .filter((question) => {
      return (
        question.solved === true &&
        question.revisionStage > 0 &&
        !question.revisionCompleted
      );
    })

    .map((question) => {

      return {
        questionId: question._id,

        title: question.title,

        difficulty:
          question.difficulty,

        topic:
          question.topic,

        status:
          getRevisionStatus(
            question.nextScheduled
          ),

        revisionNo:
          (question.revisionCount || 0) +
          1,

        note:
          question.description,
      };

    });

  return (
    <div
      className="
        bg-[#0F172A]
        border
        border-slate-800
        rounded-3xl
        p-5
        sm:p-6
        lg:p-7
      "
    >

      {/* Header */}

      <div className="flex items-center justify-between gap-3">

        <h2 className="text-xl font-bold text-white">
          Revision Queue
        </h2>

        <Link
          to="/revisions"
          className="
            flex
            items-center
            text-blue-500
            hover:text-blue-400
            transition
            shrink-0
            text-sm
            sm:text-base
          "
        >

          <span className="hidden xs:inline">
            View All
          </span>

          <span className="xs:hidden">
            All
          </span>

          <ChevronRight size={20} />

        </Link>

      </div>

      <p className="mt-2 text-slate-400 text-sm sm:text-base leading-6">
        Questions scheduled for review based on spaced repetition.
      </p>

      <hr className="border-slate-800 my-5 sm:my-6" />

      <div
        className="
          space-y-4
          max-h-[500px]
          overflow-y-auto
          pr-1
          sm:pr-2
        "
      >

        {revisions.length > 0 ? (

          revisions.map((revision) => (

            <RevisionCard
              key={revision.questionId}
              {...revision}
              onRevise={() => {
                navigate(
                  "/revisions",
                  {
                    state: {
                      questionId:
                        revision.questionId,
                    },
                  }
                );
              }}
            />

          ))

        ) : (

          <div className="py-10 text-center">

            <p className="text-slate-500">
              No revisions scheduled.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default RevisionQueue;