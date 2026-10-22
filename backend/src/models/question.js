import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    topic: {
      type: String,
      required: true,
      trim: true,
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },

    day: {
      type: Number,
      default: null,
    },

    pattern: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    intuition: {
      type: String,
      default: "",
    },

    approach: {
      type: String,
      default: "",
    },

    timeComplexity: {
      type: String,
      default: "",
    },

    spaceComplexity: {
      type: String,
      default: "",
    },

    companies: {
      type: [String],
      default: [],
    },

    hints: {
      type: [String],
      default: [],
    },

    link: {
      type: String,
      default: "",
    },

    // -----------------------------
    // Progress
    // -----------------------------

    solved: {
      type: Boolean,
      default: false,
    },

    solvedAt: {
      type: Date,
      default: null,
    },

    // -----------------------------
    // Spaced Repetition
    // -----------------------------

    revisionStage: {
      type: Number,
      default: 0,
    },

    revisionCount: {
      type: Number,
      default: 0,
    },

    revisionCompleted: {
      type: Boolean,
      default: false,
    },

    nextScheduled: {
      type: Date,
      default: null,
    },

    revisionLogs: [
      {
        date: {
          type: Date,
          default: Date.now,
        },

        notes: {
          type: String,
          default: "",
        },
      },
    ],

    // -----------------------------
    // Ownership
    // -----------------------------

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model(
  "Question",
  questionSchema
);

export default Question;