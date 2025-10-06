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

export default router;
