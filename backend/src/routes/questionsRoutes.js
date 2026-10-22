import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  createQuestion,
  getQuestions,
  getQuestion,
  updateQuestion,
  deleteQuestion,
  markAsSolved,
  completeRevision,
  delayRevision,
  updateRevisionDate,
} from "../controllers/questionController.js";

const router = express.Router();


// Create question
router.post(
  "/",
  authMiddleware,
  createQuestion
);


// Get all questions
router.get(
  "/",
  authMiddleware,
  getQuestions
);


// Get one question
router.get(
  "/:id",
  authMiddleware,
  getQuestion
);


// Update question
router.put(
  "/:id",
  authMiddleware,
  updateQuestion
);


// Delete question
router.delete(
  "/:id",
  authMiddleware,
  deleteQuestion
);


// Mark solved
router.patch(
  "/:id/solve",
  authMiddleware,
  markAsSolved
);
// Complete revision

router.patch(
  "/:id/revision",
  authMiddleware,
  completeRevision
);
router.patch(
  "/:id/revision/date",
  authMiddleware,
  updateRevisionDate
);

// Delay revision

router.patch(
  "/:id/revision/delay",
  authMiddleware,
  delayRevision
);


export default router;