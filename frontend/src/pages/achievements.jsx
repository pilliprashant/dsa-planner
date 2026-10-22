import AchievementsHeader from "../components/achievements/AchievementsHeader";
import BadgeProgress from "../components/achievements/BadgeProgress";
import BadgeCard from "../components/achievements/BadgeCard";

import {
  Flag,
  Award,
  Trophy,
  Swords,
  Flame,
  Crown,
  Target,
} from "lucide-react";

import { useApp } from "../context/AppContext";


function Achievements() {
  const { questions, user } = useApp();

  // -----------------------------
  // Basic Stats
  // -----------------------------
  const solvedQuestions = questions.filter(
    (question) => question.solved
  );

  const solvedCount = solvedQuestions.length;

  const streak = user?.streak || 0;

  // -----------------------------
  // Topic Master
  // -----------------------------
  const topicCounts = {};

  solvedQuestions.forEach((question) => {
    topicCounts[question.topic] =
      (topicCounts[question.topic] || 0) + 1;
  });

  const maxTopicSolved =
    Object.values(topicCounts).length > 0
      ? Math.max(...Object.values(topicCounts))
      : 0;

  // -----------------------------
  // Badge Unlock Status
  // -----------------------------
  const badges = [
  {
    title: "First Step",
    description: "Solve your first DSA question",
    unlocked: solvedCount >= 1,
    progress: solvedCount,
    target: 1,
    icon: (
      <Flag
        size={34}
        className="text-white"
      />
    ),
  },

  {
    title: "Decathlon Coder",
    description: "Solve 10 DSA questions",
    unlocked: solvedCount >= 10,
    progress: solvedCount,
    target: 10,
    icon: (
      <Award
        size={34}
        className="text-white"
      />
    ),
  },

  {
    title: "DSA Enthusiast",
    description: "Solve 50 DSA questions",
    unlocked: solvedCount >= 50,
    progress: solvedCount,
    target: 50,
    icon: (
      <Trophy
        size={34}
        className="text-white"
      />
    ),
  },

  {
    title: "LeetCode Slayer",
    description: "Solve 100 DSA questions",
    unlocked: solvedCount >= 100,
    progress: solvedCount,
    target: 100,
    icon: (
      <Swords
        size={34}
        className="text-white"
      />
    ),
  },

  {
    title: "Week on Fire",
    description: "Maintain a 7-day study streak",
    unlocked: streak >= 7,
    progress: streak,
    target: 7,
    icon: (
      <Flame
        size={34}
        className="text-white"
      />
    ),
  },

  {
    title: "Consistency King",
    description: "Maintain a 30-day study streak",
    unlocked: streak >= 30,
    progress: streak,
    target: 30,
    icon: (
      <Crown
        size={34}
        className="text-white"
      />
    ),
  },

  {
    title: "Topic Master",
    description: "Solve 5+ questions in any single topic",
    unlocked: maxTopicSolved >= 5,
    progress: maxTopicSolved,
    target: 5,
    icon: (
      <Target
        size={34}
        className="text-white"
      />
    ),
  },
];

  const unlockedBadges = badges.filter(
    (badge) => badge.unlocked
  ).length;

  return (
    <div className="space-y-8">

      <AchievementsHeader />

      <BadgeProgress
        unlocked={unlockedBadges}
        total={badges.length}
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">

        {badges.map((badge) => (
          <BadgeCard
            key={badge.title}
            title={badge.title}
            description={badge.description}
            unlocked={badge.unlocked}
            icon={badge.icon}
            progress={badge.progress}
            target={badge.target}
          />
        ))}

      </div>

    </div>
  );
}

export default Achievements;