// routes/signup.js
import express from "express";
import bcrypt from "bcryptjs";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import Signup from "../models/Signup.js";

const router = express.Router();

/* -------- Multer + Cloudinary -------- */
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "signups",
    resource_type: "auto",
  },
});
const upload = multer({ storage });
const uploadAny = upload.any();

/* -------- Helper: get uploaded file path -------- */
function getUploadedFilePath(files, fieldName) {
  if (!files) return "";
  if (Array.isArray(files)) {
    const f = files.find((x) => x.fieldname === fieldName);
    return f?.path || "";
  }
  return "";
}

/* -------- Signup API -------- */
router.post("/", uploadAny, async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      password,
      address = "",        // optional
      pincode = "",       // optional
      university = "",    // optional
      course = "",        // optional
      branch = "",        // optional
      academicDetails = "", // optional
      counsellingBook = "", // optional
    } = req.body || {};

    // Validation: only required fields
    if (!name || !phone || !email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "Missing required fields" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Handle file uploads (optional)
    const documentsPath = getUploadedFilePath(req.files, "documents") || "";
    const scholarshipPath = getUploadedFilePath(req.files, "scholarshipDoc") || "";

    // Save to DB
    const newSignup = new Signup({
      name,
      phone,
      email,
      password: hashedPassword,
      address,
      pincode,
      university,
      course,
      branch,
      academicDetails,
      counsellingBook,
      documents: documentsPath,    // optional
      scholarshipDoc: scholarshipPath, // optional
    });

    await newSignup.save();
    res
      .status(201)
      .json({ success: true, message: "Signup successful!", data: newSignup });
  } catch (err) {
    console.error("❌ Error in signup:", err);
    res
      .status(500)
      .json({ success: false, error: err.message || "Internal server error" });
  }
});

// POST /api/signup/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Signup.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // ✅ Return MongoDB ID along with name/email
    res.json({
      message: "Login successful",
      userId: user._id,
      name: user.name,
      email: user.email
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Google login route
router.post("/google-login", async (req, res) => {
  try {
    const { email, name, firebaseId } = req.body;

    if (!email || !firebaseId) {
      return res.status(400).json({ message: "Email and Firebase ID are required" });
    }

    // Check if user already exists in MongoDB by email
    let user = await Signup.findOne({ email });

    if (!user) {
      // Create a new user if not found
      user = new Signup({
        name,
        email,
        password: "", // empty because Google login
        firebaseId,
      });

      await user.save();
    }

    // Return MongoDB userId and data
    res.status(200).json({
      userId: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    console.error("Google login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;