import bcrypt from "bcryptjs";
import User from "../models/user.js";


// ======================================
// GET PROFILE
// ======================================
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      user,
    });

  } catch (error) {
    console.error("Get profile error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// ======================================
// UPDATE PROFILE
// ======================================
export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Validate
    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required",
      });
    }

    // Check if another user already has this email
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
      _id: { $ne: req.user.userId },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already in use",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      {
        name,
        email: email.toLowerCase(),
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });

  } catch (error) {
    console.error("Update profile error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// ======================================
// UPDATE PREFERENCES
// ======================================
export const updatePreferences = async (req, res) => {
  try {
    const {
      notifications,
      revisionReminders,
    } = req.body;

    const updates = {};

    if (typeof notifications === "boolean") {
      updates["preferences.notifications"] =
        notifications;
    }

    if (typeof revisionReminders === "boolean") {
      updates["preferences.revisionReminders"] =
        revisionReminders;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "No valid preferences provided",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      {
        $set: updates,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Preferences updated successfully",
      preferences: user.preferences,
    });

  } catch (error) {
    console.error(
      "Update preferences error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};


// ======================================
// CHANGE PASSWORD
// ======================================
export const changePassword = async (req, res) => {
  try {
    const {
      currentPassword,
      newPassword,
    } = req.body;

    // Validate
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message:
          "Current password and new password are required",
      });
    }

    // Password length
    if (newPassword.length < 6) {
      return res.status(400).json({
        message:
          "New password must be at least 6 characters",
      });
    }

    // Find user
    const user = await User.findById(
      req.user.userId
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check current password
    const passwordCorrect =
      await bcrypt.compare(
        currentPassword,
        user.password
      );

    if (!passwordCorrect) {
      return res.status(401).json({
        message: "Current password is incorrect",
      });
    }

    // Hash new password
    const hashedPassword =
      await bcrypt.hash(newPassword, 10);

    // Save
    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      message: "Password changed successfully",
    });

  } catch (error) {
    console.error(
      "Change password error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};