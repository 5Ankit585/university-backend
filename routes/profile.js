// routes/profile.js
import express from "express";
import mongoose from "mongoose"; // ✅ Add this import for ObjectId validation
import Signup from "../models/Signup.js";

const router = express.Router();

// Get user profile by ID
router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    // ✅ Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const user = await Signup.findById(userId).select("-password"); // exclude password
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("GET /api/profile/:id error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update user profile by ID
router.put("/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    // ✅ Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const updateData = req.body;

    const user = await Signup.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    console.error("PUT /api/profile/:id error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;