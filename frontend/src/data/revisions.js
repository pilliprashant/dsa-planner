import questions from "./questions";

const revisions = questions
  .filter((question) => question.solved)
  .map((question) => ({
    id: question.id,
    questionId: question.id,
    title: question.title,
    topic: question.topic,
    difficulty: question.difficulty,
    platform: question.platform,
    notes: question.notes,

    revisionStage: question.revisionStage,
    revisionCount: question.revisionCount,

    nextScheduled: question.nextScheduled,

    revisionLogs: [],
  }));

export default revisions;