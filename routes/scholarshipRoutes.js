import express from "express";
import { addScholarship, getScholarships, deleteScholarship } from "../controllers/scholarshipController.js";

const router = express.Router();

// Routes
router.post("/", addScholarship);
router.get("/", getScholarships);
router.delete("/:id", deleteScholarship);

export default router;
