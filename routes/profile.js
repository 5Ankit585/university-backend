import express from "express";
import Signup from "../models/Signup.js";

const router = express.Router();

// Get user profile by ID
router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await Signup.findById(userId).select("-password"); // exclude password
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update user profile by ID
router.put("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    const user = await Signup.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password");

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
