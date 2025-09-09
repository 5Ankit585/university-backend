import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import UniversityRegistration from "./models/University.js";
import uploadCoursesRoutes from "./routes/uploadCourses.js";
import { fileURLToPath } from "url";

/* -------- Routers -------- */
import cutoffRoutes from "./routes/cutoffRoutes.js";
import universityRoutes from "./routes/university.js";
import uploadCourseRoutes from "./routes/uploadCourses.js"; // ✅ add course upload router
import admissionsRoutes from "./routes/admissions.js";
import recruitersRoutes from "./routes/recruitersRoutes.js";
import placementsRoutes from "./routes/placementsRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";






const app = express();
dotenv.config();

/* ------------------------ Cloudinary config ------------------------ */
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

/* ------------------------ CORS ------------------------ */
const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3000",
  "http://localhost:5173", // Vite
  process.env.FRONTEND_ORIGIN,
].filter(Boolean);

app.use(
  cors({
    origin: ALLOWED_ORIGINS,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.options("*", cors());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

/* ------------------------ __dirname setup ------------------------ */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ------------------------ Uploads folder ------------------------ */
const uploadFolder = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder, { recursive: true });
app.use("/uploads", express.static(uploadFolder));

/* ------------------------ Multer + Cloudinary ------------------------ */
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "universities",
    resource_type: "auto",
  }),
});
const upload = multer({ storage });
const uploadAny = upload.any();

/* ------------------------ Helper ------------------------ */
function getUploadedFilePath(files, fieldName) {
  if (!files) return "";
  if (Array.isArray(files)) {
    const f = files.find((x) => x.fieldname === fieldName);
    return f?.path || "";
  }
  if (files[fieldName]?.[0]) return files[fieldName][0].path || "";
  return "";
}

/* ------------------------ Mongo connection ------------------------ */
const mongoURI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/findmycollege";
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

/* ------------------------ Student Schema ------------------------ */
const studentSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  password: String, // hashed
  address: String,
  pincode: String,
  university: String,
  course: String,
  branch: String,
  academicDetails: String,
  counsellingBook: String,
  documents: String,
  scholarshipDoc: String,
  createdAt: { type: Date, default: Date.now },
});
const Student = mongoose.model("Student", studentSchema);

/* ------------------------ Registration Schema ------------------------ */
const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  location: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const Registration = mongoose.model("Registration", registrationSchema);

/* ------------------------ Routes (inline) ------------------------ */

// Student signup
app.post("/api/students", uploadAny, async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      password,
      address,
      pincode,
      university,
      course,
      branch,
      academicDetails,
      counsellingBook,
    } = req.body || {};

    const missing = [];
    if (!name) missing.push("name");
    if (!email) missing.push("email");
    if (!password) missing.push("password");
    if (!phone) missing.push("phone");
    if (missing.length) {
      return res
        .status(400)
        .json({ success: false, error: `Missing required fields: ${missing.join(", ")}` });
    }

    const documentsPath = getUploadedFilePath(req.files, "documents");
    const scholarshipPath = getUploadedFilePath(req.files, "scholarshipDoc");

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new Student({
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
      documents: documentsPath,
      scholarshipDoc: scholarshipPath,
    });

    await newStudent.save();
    return res
      .status(201)
      .json({ success: true, message: "Student registered successfully!" });
  } catch (err) {
    console.error("Error in /api/students:", err);
    return res
      .status(500)
      .json({ success: false, error: err.message || "Internal server error" });
  }
});

// Registration modal
app.post("/register", async (req, res) => {
  try {
    const { name, mobileNumber, location } = req.body || {};
    if (!name || !mobileNumber || !location) {
      return res.status(400).json({
        success: false,
        message: "All fields are required (name, mobileNumber, location)",
      });
    }

    const reg = new Registration({ name, mobileNumber, location });
    await reg.save();
    return res
      .status(201)
      .json({ success: true, message: "Registration successful", reg });
  } catch (err) {
    console.error("Error in /register:", err);
    return res
      .status(500)
      .json({ success: false, message: "Registration failed", error: err.message });
  }
});

// University Registration
app.post("/api/university-registration", upload.any(), async (req, res) => {
  try {
    console.log("📥 Incoming body:", req.body);

    // ✅ Parse JSON fields
    if (req.body.facilities) {
      try { req.body.facilities = JSON.parse(req.body.facilities); }
      catch { req.body.facilities = []; }
    }
    if (req.body.branches) {
      try { req.body.branches = JSON.parse(req.body.branches); }
      catch { req.body.branches = []; }
    }

    // ✅ Handle Files
    const aboutImages = req.files
      ?.filter(f => f.fieldname === "aboutImages")
      .map(f => f.path);

    const logo = req.files
      ?.filter(f => f.fieldname === "logo")
      .map(f => f.path);

    const bannerImage = req.files
      ?.filter(f => f.fieldname === "bannerImage")
      .map(f => f.path);

    // ✅ Save University
    const newUniversity = new UniversityRegistration({
      ...req.body,
      aboutImages,
      logo,
      bannerImage,
    });

    await newUniversity.save();

    res.status(201).json({
      success: true,
      data: newUniversity,
    });
  } catch (err) {
    console.error("❌ Error registering university:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
  

// Get all universities
app.get("/api/universities", async (req, res) => {
  try {
    const universities = await UniversityRegistration.find();
    res.json({ success: true, universities });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/* ------------------------ Mount Routers ------------------------ */
app.use("/api/universities", universityRoutes);   // university.js ke routes
app.use("/api/universities", uploadCourseRoutes); // uploadCourses.js ke routes
app.use("/api/cutoff", cutoffRoutes);           // 
app.use("/api/admissions", admissionsRoutes);
app.use("/api/recruiters", recruitersRoutes);
app.use("/api/universities", placementsRoutes);
app.use("/api/universities", galleryRoutes);




/* ------------------------ Health check ------------------------ */
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server is running" });
});

/* ------------------------ Error handler ------------------------ */
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ success: false, error: "Internal server error" });
});

/* ------------------------ Start server ------------------------ */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log("Health check available at /api/health");
});
