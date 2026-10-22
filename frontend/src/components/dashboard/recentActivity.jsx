import { useApp } from "../../context/AppContext";
import ActivityItem from "./activityitem";

function RecentActivity() {
  const { questions } = useApp();

  // =============================
  // Format relative time
  // =============================

  const getTimeAgo = (date) => {

    if (!date) {
      return "Recently";
    }

    const now = new Date();
    const past = new Date(date);

    if (Number.isNaN(past.getTime())) {
      return "Recently";
    }

    const diffInSeconds = Math.floor(
      (now - past) / 1000
    );

    if (diffInSeconds < 60) {
      return "Just now";
    }

    const diffInMinutes = Math.floor(
      diffInSeconds / 60
    );

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${
        diffInMinutes !== 1
          ? "s"
          : ""
      } ago`;
    }

    const diffInHours = Math.floor(
      diffInMinutes / 60
    );

    if (diffInHours < 24) {
      return `${diffInHours} hour${
        diffInHours !== 1
          ? "s"
          : ""
      } ago`;
    }

    const diffInDays = Math.floor(
      diffInHours / 24
    );

    if (diffInDays === 1) {
      return "Yesterday";
    }

    if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    }

    return past.toLocaleDateString();
  };

  // =============================
  // Build Activities
  // =============================

  const activities = [];

  questions.forEach((question) => {

    // Solved activity

    if (
      question.solved &&
      question.solvedAt
    ) {

      activities.push({
        id: `solved-${question._id}`,
        type: "solved",
        title: `Solved ${question.title}`,
        description: `${question.difficulty} • ${question.topic}`,
        time: getTimeAgo(
          question.solvedAt
        ),
        date: question.solvedAt,
      });

    }

    // Revision activities

    const revisionLogs =
      question.revisionLogs || [];

    revisionLogs.forEach(
      (log, index) => {

        if (!log?.date) {
          return;
        }

        activities.push({
          id: `revision-${question._id}-${index}`,
          type: "revision",
          title: `Revised ${question.title}`,
          description: `Revision #${
            index + 1
          } completed successfully.`,
          time: getTimeAgo(log.date),
          date: log.date,
        });

      }
    );

  });

  // Sort newest first

  activities.sort(
    (a, b) =>
      new Date(b.date) -
      new Date(a.date)
  );

  const recentActivities =
    activities.slice(0, 5);

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

      <h2 className="text-xl font-bold text-white">
        Recent Activity
      </h2>

      <p className="text-slate-400 mt-2 text-sm sm:text-base">
        Your latest progress and milestones.
      </p>

      <hr className="border-slate-800 my-5 sm:my-6" />

      <div className="space-y-5 sm:space-y-6">

        {recentActivities.length > 0 ? (

          recentActivities.map(
            (activity) => (
              <ActivityItem
                key={activity.id}
                {...activity}
              />
            )
          )

        ) : (

          <div className="py-8 text-center">

            <p className="text-slate-500">
              No recent activity yet.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default RecentActivity;