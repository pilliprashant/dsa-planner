import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import { useApp } from "../../context/AppContext";

function WelcomeBanner() {
  const { user, questions } = useApp();

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const pendingRevisions = questions.filter(
    (question) => {

      if (
        !question.solved ||
        question.revisionCompleted ||
        !question.nextScheduled
      ) {
        return false;
      }

      const scheduledDate = new Date(
        question.nextScheduled
      );

      scheduledDate.setHours(0, 0, 0, 0);

      return scheduledDate <= today;
    }
  ).length;

  return (
    <div
      className="
        bg-[#0f172a]
        border
        border-slate-800
        rounded-3xl
        p-5
        sm:p-6
        lg:p-8
        mb-6
        sm:mb-8
      "
    >

      <div
        className="
          flex
          flex-col
          gap-6
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >

        {/* Welcome text */}

        <div className="min-w-0">

          <div className="flex items-start gap-2">

            <h1
              className="
                text-white
                text-2xl
                sm:text-3xl
                lg:text-4xl
                font-bold
                leading-tight
              "
            >
              Welcome back, {user?.name}!
            </h1>

            <Sparkles
              className="text-yellow-400 shrink-0 mt-1"
              size={22}
            />

          </div>

          <p
            className="
              text-slate-400
              mt-3
              sm:mt-4
              text-sm
              sm:text-base
              lg:text-lg
              leading-6
            "
          >
            You have{" "}

            <span className="text-blue-500 font-semibold">
              {pendingRevisions} question
              {pendingRevisions !== 1
                ? "s"
                : ""}
            </span>{" "}

            pending revision
            {pendingRevisions !== 1
              ? "s"
              : ""}{" "}
            today. Keep your streak alive!
          </p>

        </div>

        {/* Add question */}

        <Link
          to="/questions"
          className="
            w-full
            sm:w-fit
            text-center
            bg-blue-600
            hover:bg-blue-700
            text-white
            font-semibold
            px-6
            sm:px-8
            py-3
            sm:py-4
            rounded-2xl
            transition-all
            duration-300
            shrink-0
          "
        >
          Log New Question +
        </Link>

      </div>

    </div>
  );
}

export default WelcomeBanner;