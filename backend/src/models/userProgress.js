import mongoose from "mongoose";

const userProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },

    solved: {
      type: Boolean,
      default: false,
    },

    solvedAt: {
      type: Date,
      default: null,
    },

    revisionStage: {
      type: Number,
      default: 0,
    },

    revisionCount: {
      type: Number,
      default: 0,
    },

    nextScheduled: {
      type: Date,
      default: null,
    },

    revisionCompleted: {
      type: Boolean,
      default: false,
    },

    revisionLogs: {
      type: [
        {
          date: {
            type: Date,
            default: Date.now,
          },

          stage: {
            type: Number,
          },

          result: {
            type: String,
          },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// One progress document per user/question
userProgressSchema.index(
  {
    user: 1,
    question: 1,
  },
  {
    unique: true,
  }
);

const UserProgress = mongoose.model(
  "UserProgress",
  userProgressSchema
);

export default UserProgress;