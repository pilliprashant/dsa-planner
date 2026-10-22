import AnalyticsHeader from "../components/analytics/analyticsHeader";
import StrengthCard from "../components/analytics/strengthCard";
import TopicDistribution from "../components/analytics/topicDistribution";
import DifficultyBreakdown from "../components/analytics/difficultyBreakdown";
import MonthlyPracticeVelocity from "../components/analytics/monthlyPracticeVelocity";
import RevisionConsistency from "../components/analytics/revisionConsistency";
import { useApp } from "../context/AppContext";

function Analytics() {
  const { questions } = useApp();

  // Group questions by topic
  const topicData = {};

  questions.forEach((question) => {
    if (!topicData[question.topic]) {
      topicData[question.topic] = {
        solved: 0,
        overdue: 0,
        total: 0,
      };
    }

    topicData[question.topic].total += 1;

    if (question.solved) {
      topicData[question.topic].solved += 1;
    }

    if (
      question.solved &&
      question.nextScheduled &&
      !question.revisionCompleted
    ) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const scheduledDate = new Date(question.nextScheduled);
      scheduledDate.setHours(0, 0, 0, 0);

      if (scheduledDate < today) {
        topicData[question.topic].overdue += 1;
      }
    }
  });

  // Strong topics:
  // Topics with at least one solved question and no overdue revisions.
  const strongTopics = Object.entries(topicData)
    .filter(
      ([, data]) =>
        data.solved > 0 && data.overdue === 0
    )
    .sort((a, b) => b[1].solved - a[1].solved)
    .slice(0, 5)
    .map(([topic]) => topic);

  // Weak topics:
  // Topics with unsolved questions or overdue revisions.
  const weakTopics = Object.entries(topicData)
    .filter(
      ([, data]) =>
        data.overdue > 0 ||
        data.solved < data.total
    )
    .sort((a, b) => {
      if (b[1].overdue !== a[1].overdue) {
        return b[1].overdue - a[1].overdue;
      }

      return a[1].solved - b[1].solved;
    })
    .slice(0, 5)
    .map(([topic]) => topic);

  return (
    <div className="space-y-8">

      <AnalyticsHeader />

      {/* Strong / Weak Topics */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        <StrengthCard
          type="strong"
          title="STRONG TOPICS"
          description="Topics where you have solved multiple questions and maintained a perfect revision schedule."
          topics={strongTopics}
        />

        <StrengthCard
          type="weak"
          title="WEAK TOPICS / ACTION REQUIRED"
          description="Topics with overdue revisions, low solve counts, or requiring immediate attention."
          topics={weakTopics}
        />

      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        <TopicDistribution />

        <DifficultyBreakdown />

        <MonthlyPracticeVelocity />

        <RevisionConsistency />

      </div>

    </div>
  );
}

export default Analytics;