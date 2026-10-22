import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    streak: {
      type: Number,
      default: 0,
    },
 lastActiveDate: {
  type: Date,
  default: null,
},
    questionsSolved: {
      type: Number,
      default: 0,
    },

    preferences: {
      notifications: {
        type: Boolean,
        default: true,
      },

      revisionReminders: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const User =
  mongoose.models.User ||
  mongoose.model("User", userSchema);

export default User;