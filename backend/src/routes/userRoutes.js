import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  getProfile,
  updateProfile,
  updatePreferences,
  changePassword,
} from "../controllers/userController.js";

const router = express.Router();


// ======================================
// PROFILE
// ======================================

// Get logged-in user's profile
router.get(
  "/profile",
  authMiddleware,
  getProfile
);


// Update logged-in user's profile
router.put(
  "/profile",
  authMiddleware,
  updateProfile
);


// ======================================
// PREFERENCES
// ======================================

router.put(
  "/preferences",
  authMiddleware,
  updatePreferences
);


// ======================================
// PASSWORD
// ======================================

router.put(
  "/password",
  authMiddleware,
  changePassword
);


export default router;