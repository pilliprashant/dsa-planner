import "dotenv/config";
import mongoose from "mongoose";

import Question from "./models/Question.js";
import PROBLEMS from "./data/questions.js";

const dburl = process.env.ATLAS_DB_URL;

async function seedQuestions() {
  try {
    await mongoose.connect(dburl);

    console.log("MongoDB connected");

    // Remove existing questions
    await Question.deleteMany({});

    console.log("Existing questions removed");

    // Convert seed data to MongoDB format
    const questions = PROBLEMS.map((problem) => ({
      title: problem.title,
      topic: problem.topic,
      difficulty: problem.difficulty,

      day: problem.day,
      pattern: problem.pattern,

      description: problem.description,
      intuition: problem.intuition,
      approach: problem.approach,

      timeComplexity:
        problem.timeComplexity,

      spaceComplexity:
        problem.spaceComplexity,

      companies:
        problem.companies || [],

      hints:
        problem.hints || [],

      link:
        problem.link || "",

      // -----------------------------
      // Progress
      // -----------------------------

      solved: false,

      solvedAt: null,

      // -----------------------------
      // Spaced Repetition
      // -----------------------------

      revisionStage: 0,

      revisionCount: 0,

      revisionCompleted: false,

      nextScheduled: null,

      revisionLogs: [],

      // -----------------------------
      // Ownership
      // -----------------------------

      // These are system questions
      createdBy: null,
    }));

    await Question.insertMany(questions);

    console.log(
      `Successfully inserted ${questions.length} questions`
    );

    await mongoose.connection.close();

    console.log("Database connection closed");

  } catch (error) {
    console.error(
      "Seed error:",
      error
    );

    process.exit(1);
  }
}

seedQuestions();