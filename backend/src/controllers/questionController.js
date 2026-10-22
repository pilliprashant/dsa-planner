import Question from "../models/Question.js";
import UserProgress from "../models/userProgress.js";
import User from "../models/user.js";


// ==========================================
// CREATE QUESTION
// ==========================================

export const createQuestion = async (req, res) => {
  try {
    const {
      title,
      topic,
      difficulty,
      day,
      pattern,
      description,
      intuition,
      approach,
      timeComplexity,
      spaceComplexity,
      companies,
      hints,
      link,
    } = req.body;

    if (!title || !topic || !difficulty) {
      return res.status(400).json({
        message:
          "Title, topic and difficulty are required",
      });
    }

    const question = await Question.create({
      title,
      topic,
      difficulty,
      day,
      pattern,
      description,
      intuition,
      approach,
      timeComplexity,
      spaceComplexity,
      companies,
      hints,
      link,

      // Creator of this question
      createdBy: req.user.userId,
    });

    res.status(201).json({
      message: "Question created successfully",
      question,
    });

  } catch (error) {
    console.error(
      "Create question error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};


// ==========================================
// GET ALL QUESTIONS
// ==========================================

export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .populate(
        "createdBy",
        "name email"
      )
      .sort({
        day: 1,
        createdAt: 1,
      });

    const progress =
      await UserProgress.find({
        user: req.user.userId,
      });

    const questionsWithProgress =
      questions.map((question) => {

        const userProgress =
          progress.find(
            (item) =>
              item.question.toString() ===
              question._id.toString()
          );

       return {
  ...question.toObject(),

  solved: userProgress?.solved ?? false,
  solvedAt: userProgress?.solvedAt ?? null,
  revisionStage: userProgress?.revisionStage ?? 0,
  revisionCount: userProgress?.revisionCount ?? 0,
  nextScheduled: userProgress?.nextScheduled ?? null,
  revisionCompleted:
    userProgress?.revisionCompleted ?? false,
  revisionLogs:
    userProgress?.revisionLogs ?? [],
};
      });

    res.status(200).json({
      questions:
        questionsWithProgress,
    });

  } catch (error) {
    console.error(
      "Get questions error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};


// ==========================================
// GET ONE QUESTION
// ==========================================

export const getQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const question =
      await Question.findById(id)
        .populate(
          "createdBy",
          "name email"
        );

    if (!question) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    const progress =
      await UserProgress.findOne({
        user: req.user.userId,
        question: id,
      });

    res.status(200).json({
      question,

      progress:
        progress || {
          solved: false,
          solvedAt: null,
          revisionStage: 0,
          revisionCount: 0,
          nextScheduled: null,
          revisionCompleted: false,
          revisionLogs: [],
        },
    });

  } catch (error) {
    console.error(
      "Get question error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};


// ==========================================
// UPDATE QUESTION
// ==========================================

export const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const question =
      await Question.findById(id);

    if (!question) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    // System questions cannot be edited
    if (!question.createdBy) {
      return res.status(403).json({
        message:
          "System questions cannot be edited",
      });
    }

    // Only creator can edit
    if (
      question.createdBy.toString() !==
      req.user.userId
    ) {
      return res.status(403).json({
        message:
          "You are not allowed to edit this question",
      });
    }

    const allowedFields = [
      "title",
      "topic",
      "difficulty",
      "day",
      "pattern",
      "description",
      "intuition",
      "approach",
      "timeComplexity",
      "spaceComplexity",
      "companies",
      "hints",
      "link",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        question[field] =
          req.body[field];
      }
    });

    await question.save();

    res.status(200).json({
      message:
        "Question updated successfully",
      question,
    });

  } catch (error) {
    console.error(
      "Update question error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};


// ==========================================
// DELETE QUESTION
// ==========================================

export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const question =
      await Question.findById(id);

    if (!question) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    // System question
    if (!question.createdBy) {
      return res.status(403).json({
        message:
          "System questions cannot be deleted",
      });
    }

    // Only creator can delete
    if (
      question.createdBy.toString() !==
      req.user.userId
    ) {
      return res.status(403).json({
        message:
          "You are not allowed to delete this question",
      });
    }

    await Question.findByIdAndDelete(id);

    // Remove progress belonging to this question
    await UserProgress.deleteMany({
      question: id,
    });

    res.status(200).json({
      message:
        "Question deleted successfully",
    });

  } catch (error) {
    console.error(
      "Delete question error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};
export const updateRevisionDate = async (req, res) => {
  try {
    const { id } = req.params;
    const { nextScheduled } = req.body;

    if (!nextScheduled) {
      return res.status(400).json({
        message: "Revision date is required",
      });
    }

    const progress = await UserProgress.findOne({
      user: req.user.userId,
      question: id,
    });

    if (!progress) {
      return res.status(404).json({
        message: "Question progress not found",
      });
    }

    if (!progress.solved) {
      return res.status(400).json({
        message: "Question has not been solved yet",
      });
    }

    if (progress.revisionCompleted) {
      return res.status(400).json({
        message: "All revisions are already completed",
      });
    }

    progress.nextScheduled = new Date(nextScheduled);

    await progress.save();

    res.status(200).json({
      message: "Revision date updated successfully",
      progress,
    });
  } catch (error) {
    console.error(
      "Update revision date error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ==========================================
// MARK QUESTION AS SOLVED
// ==========================================

export const markAsSolved = async (req, res) => {
  try {
    const { id } = req.params;

    // ------------------------------------------
    // Check question
    // ------------------------------------------

    const question = await Question.findById(id);

    if (!question) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    // ------------------------------------------
    // Check existing progress
    // ------------------------------------------

    const existingProgress =
      await UserProgress.findOne({
        user: req.user.userId,
        question: id,
      });

    // If already solved, don't count it again
    if (existingProgress?.solved) {
      return res.status(200).json({
        message: "Question is already solved",
        progress: existingProgress,
      });
    }

    // ------------------------------------------
    // Get current user
    // ------------------------------------------

    const user = await User.findById(
      req.user.userId
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // ------------------------------------------
    // Current date
    // ------------------------------------------

    const solvedAt = new Date();

    // ------------------------------------------
    // Calculate streak
    // ------------------------------------------

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    let streak = user.streak || 0;

    if (!user.lastActiveDate) {
      // First activity ever
      streak = 1;
    } else {
      const lastActive = new Date(
        user.lastActiveDate
      );

      lastActive.setHours(0, 0, 0, 0);

      const differenceInDays =
        Math.floor(
          (today - lastActive) /
            (1000 * 60 * 60 * 24)
        );

      if (differenceInDays === 0) {
        // Already active today
        streak = user.streak || 1;
      } else if (differenceInDays === 1) {
        // Consecutive day
        streak = (user.streak || 0) + 1;
      } else {
        // Missed one or more days
        streak = 1;
      }
    }

    // ------------------------------------------
    // Update user streak
    // ------------------------------------------

    user.streak = streak;
    user.lastActiveDate = solvedAt;

    user.questionsSolved =
      (user.questionsSolved || 0) + 1;

    await user.save();

    // ------------------------------------------
    // First revision after 7 days
    // ------------------------------------------

    const nextScheduled = new Date();

    nextScheduled.setDate(
      nextScheduled.getDate() + 7
    );

    // ------------------------------------------
    // Create / update progress
    // ------------------------------------------

    const progress =
      await UserProgress.findOneAndUpdate(
        {
          user: req.user.userId,
          question: id,
        },

        {
          $set: {
            solved: true,
            solvedAt,
            revisionStage: 1,
            revisionCount: 0,
            nextScheduled,
            revisionCompleted: false,
          },
        },

        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        }
      );

    // ------------------------------------------
    // Response
    // ------------------------------------------

    res.status(200).json({
      message: "Question marked as solved",

      progress,

      streak: user.streak,
    });

  } catch (error) {
    console.error(
      "Mark solved error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};
// ==========================================
// COMPLETE REVISION
// ==========================================

export const completeRevision = async (req, res) => {
  try {
    const { id } = req.params;
    const { notes = "" } = req.body;

    const progress = await UserProgress.findOne({
      user: req.user.userId,
      question: id,
    });

    if (!progress) {
      return res.status(404).json({
        message: "Question progress not found",
      });
    }

    if (!progress.solved) {
      return res.status(400).json({
        message: "Question has not been solved yet",
      });
    }

    if (progress.revisionCompleted) {
      return res.status(400).json({
        message: "All revisions are already completed",
      });
    }

    const intervals = [7, 15, 30, 60];

    const currentStage = progress.revisionStage;

    // Make sure stage is valid
    if (currentStage < 1 || currentStage > 4) {
      return res.status(400).json({
        message: "Invalid revision stage",
      });
    }

    const now = new Date();

    // Save revision log
    progress.revisionLogs.push({
      date: now,
      stage: currentStage,
      result: notes,
    });

    progress.revisionCount += 1;

    // ------------------------------------------
    // FINAL REVISION
    // ------------------------------------------

    if (currentStage === 4) {
      progress.revisionCompleted = true;
      progress.nextScheduled = null;

      await progress.save();

      return res.status(200).json({
        message: "Final revision completed",
        progress,
      });
    }

    // ------------------------------------------
    // NEXT REVISION
    // ------------------------------------------

    const nextStage = currentStage + 1;

    const nextScheduled = new Date();

    nextScheduled.setDate(
      nextScheduled.getDate() + intervals[nextStage - 1]
    );

    progress.revisionStage = nextStage;
    progress.nextScheduled = nextScheduled;
    progress.revisionCompleted = false;

    await progress.save();

    res.status(200).json({
      message: "Revision completed successfully",
      progress,
    });

  } catch (error) {
    console.error(
      "Complete revision error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};


// ==========================================
// DELAY REVISION
// ==========================================

export const delayRevision = async (req, res) => {
  try {
    const { id } = req.params;
    const { days } = req.body;

    const delayDays = Number(days);

    if (!delayDays || delayDays < 1) {
      return res.status(400).json({
        message: "Valid delay days are required",
      });
    }

    const progress = await UserProgress.findOne({
      user: req.user.userId,
      question: id,
    });

    if (!progress) {
      return res.status(404).json({
        message: "Question progress not found",
      });
    }

    if (!progress.solved) {
      return res.status(400).json({
        message: "Question has not been solved yet",
      });
    }

    if (progress.revisionCompleted) {
      return res.status(400).json({
        message: "All revisions are already completed",
      });
    }

    // ------------------------------------------
    // Start from the CURRENT scheduled date
    // ------------------------------------------

    const nextScheduled = progress.nextScheduled
      ? new Date(progress.nextScheduled)
      : new Date();

    // Add delay to the existing revision date
    nextScheduled.setDate(
      nextScheduled.getDate() + delayDays
    );

    progress.nextScheduled = nextScheduled;

    await progress.save();

    res.status(200).json({
      message: "Revision delayed successfully",
      progress,
    });

  } catch (error) {
    console.error(
      "Delay revision error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};