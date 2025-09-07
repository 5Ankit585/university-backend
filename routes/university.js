// backend/routes/universities.js
import express from "express";
import University from "../models/University.js";
import { uploadCoursesExcel } from "../controllers/uploadController.js";
import multer from "multer";
import path from "path";

const router = express.Router();

/* ✅ Multer DiskStorage Setup */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder jaha file save hogi
  },
  filename: function (req, file, cb) {
    // unique filename (date + extension)
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

/* ✅ Test route */
router.get("/", (req, res) => {
  res.send("Universities API working!");
});

/* ✅ Get university by ID */
router.get("/:id", async (req, res) => {
  try {
    const university = await University.findById(req.params.id);
    if (!university) {
      return res.status(404).json({ message: "University not found" });
    }
    res.json(university);
  } catch (err) {
    console.error("Error fetching university:", err);
    res.status(500).json({ error: err.message });
  }
});

/* ✅ Upload & parse courses Excel */
// Endpoint: POST /api/universities/:universityId/courses/upload
// Form field name must be: "file"
router.post(
  "/:universityId/courses/upload",
  upload.single("file"),
  uploadCoursesExcel
);

/* ✅ Get all courses of a university */
// Endpoint: GET /api/universities/:id/courses
router.get("/:id/courses", async (req, res) => {
  try {
    const university = await University.findById(req.params.id);
    if (!university) {
      return res.status(404).json({ message: "University not found" });
    }
    res.json({ success: true, courses: university.courses });
  } catch (err) {
    console.error("Error fetching courses:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

export default router;
