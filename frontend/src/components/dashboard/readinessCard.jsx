import { Award } from "lucide-react";
import { useApp } from "../../context/AppContext";

function InterviewReadiness() {
  const { user, questions } = useApp();

  // -----------------------------
  // Questions Solved
  // -----------------------------
  const totalQuestions = questions.length;

  const solvedQuestions = questions.filter(
    (question) => question.solved
  );

  const solvedCount = solvedQuestions.length;

  const questionScore =
    totalQuestions > 0
      ? Math.round(
          (solvedCount / totalQuestions) * 100
        )
      : 0;

  // -----------------------------
  // Revision Coverage
  // -----------------------------
  const revisedQuestions = solvedQuestions.filter(
    (question) => question.revisionCount > 0
  );

  const revisionScore =
    solvedCount > 0
      ? Math.round(
          (revisedQuestions.length / solvedCount) * 100
        )
      : 0;

  // -----------------------------
  // Streak Status
  // -----------------------------
  const streak = user?.streak || 0;

  const streakScore = Math.min(
    Math.round((streak / 14) * 100),
    100
  );

  // -----------------------------
  // Overall Readiness
  // -----------------------------
  const readiness = Math.round(
    questionScore * 0.4 +
      revisionScore * 0.4 +
      streakScore * 0.2
  );

  return (
    <div className="bg-[#091328] border border-slate-800 rounded-3xl p-8">

      {/* Heading */}
      <div className="flex items-center justify-between">
        <h3 className="text-slate-400 font-semibold tracking-wider">
          INTERVIEW READINESS
        </h3>

        <Award
          className="text-slate-500"
          size={22}
        />
      </div>

      {/* Circular Progress */}
      <div className="flex justify-center mt-10">
        <div
          className="relative flex items-center justify-center rounded-full"
          style={{
            width: "180px",
            height: "180px",
            background: `conic-gradient(
              #2563eb ${readiness * 3.6}deg,
              #e2e8f0 ${readiness * 3.6}deg
            )`,
          }}
        >
          <div className="absolute w-[145px] h-[145px] rounded-full bg-[#091328] flex flex-col items-center justify-center">

            <h1 className="text-5xl font-bold text-white">
              {readiness}%
            </h1>

            <p className="text-slate-400 tracking-widest text-sm mt-2">
              READY SCORE
            </p>

          </div>
        </div>
      </div>

      {/* Message Box */}
      <div className="mt-10 rounded-2xl border border-orange-500/30 bg-orange-500/5 p-5 text-center">

        <h4 className="text-orange-400 text-2xl font-semibold">
          {readiness >= 80
            ? "Interview Ready"
            : readiness >= 60
            ? "Almost There"
            : "Getting There"}
        </h4>

        <p className="text-orange-300 mt-2">
          {readiness >= 80
            ? "Great work! Keep practicing and maintaining your consistency."
            : "Consistency is key. Keep solving and revising your questions."}
        </p>

      </div>

      {/* Breakdown */}
      <div className="mt-10 border-t border-slate-800 pt-6 space-y-4">

        {/* Questions Solved */}
        <div className="flex justify-between text-slate-300">
          <span>
            Questions Solved (40%)
          </span>

          <span className="font-semibold text-white">
            {questionScore}/100
          </span>
        </div>

        {/* Revision Coverage */}
        <div className="flex justify-between text-slate-300">
          <span>
            Revision Coverage (40%)
          </span>

          <span className="font-semibold text-white">
            {revisionScore}/100
          </span>
        </div>

        {/* Streak */}
        <div className="flex justify-between text-slate-300">
          <span>
            Streak Status (20%)
          </span>

          <span className="font-semibold text-white">
            {streakScore}/100
          </span>
        </div>

      </div>

    </div>
  );
}

export default InterviewReadiness;