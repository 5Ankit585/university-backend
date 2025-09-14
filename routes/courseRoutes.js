import express from "express";
import multer from "multer";
import { createCourse, getCourses, getCourseById } from "../controllers/courseController.js";

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });
const cpUpload = upload.fields([
  { name: "specializationImages", maxCount: 10 },
  { name: "topInstituteImages", maxCount: 10 },
]);

// Routes
router.post("/", cpUpload, createCourse); // Add new course with images
router.get("/", getCourses);              // Get all courses
router.get("/:id", getCourseById);        // Get single course

export default router;
