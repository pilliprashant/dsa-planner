import {
  BookOpen,
  CalendarCheck,
  Clock3,
  Flame,
} from "lucide-react";

import StatCard from "./statCard";
import { useApp } from "../../context/AppContext";

function StatSection() {
  const { questions, user } = useApp();

  // =============================
  // Solved Questions
  // =============================

  const solvedQuestions = questions.filter(
    (question) => question.solved === true
  );

  const totalSolved = solvedQuestions.length;

  // =============================
  // Topics Covered
  // =============================

  const topicsCovered = new Set(
    solvedQuestions.map(
      (question) => question.topic
    )
  ).size;

  // =============================
  // Due Revisions
  // =============================

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const dueRevisions = questions.filter(
    (question) => {

      if (
        question.solved !== true ||
        question.revisionCompleted === true ||
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

  // =============================
  // Current Streak
  // =============================

  const streak = user?.streak || 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">

      {/* Total Solved */}

      <StatCard
        title="TOTAL SOLVED"
        value={totalSolved}
        subtitle="questions"
        progress={Math.min(
          (totalSolved / 50) * 100,
          100
        )}
        description={`${Math.min(
          Math.round(
            (totalSolved / 50) * 100
          ),
          100
        )}% of mid-tier target (50)`}
        icon={<BookOpen size={24} />}
        color="blue"
      />

      {/* Topics Covered */}

      <StatCard
        title="TOPICS COVERED"
        value={topicsCovered}
        subtitle="/ 16 topics"
        progress={Math.min(
          (topicsCovered / 16) * 100,
          100
        )}
        description={`${Math.min(
          Math.round(
            (topicsCovered / 16) * 100
          ),
          100
        )}% total coverage`}
        icon={<CalendarCheck size={24} />}
        color="green"
      />

      {/* Due Revisions */}

      <StatCard
        title="DUE REVISIONS"
        value={dueRevisions}
        subtitle="questions"
        progress={Math.min(
          (dueRevisions / 16) * 100,
          100
        )}
        description="Spaced repetition logs"
        icon={<Clock3 size={24} />}
        color="red"
      />

      {/* Current Streak */}

      <StatCard
        title="CURRENT STREAK"
        value={streak}
        subtitle="days active"
        progress={Math.min(
          (streak / 14) * 100,
          100
        )}
        description="Keep your streak going"
        icon={<Flame size={24} />}
        color="yellow"
      />

    </div>
  );
}

export default StatSection;