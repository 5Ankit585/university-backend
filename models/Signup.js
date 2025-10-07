// models/Signup.js
import mongoose from "mongoose";

const signupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // hashed password
  firebaseId: { type: String }, // optional, used for Google login
  address: String,
  pincode: String,
  university: String,
  course: String,
  branch: String,
  academicDetails: String,
  counsellingBook: String,
  documents: String,       // Cloudinary file URL
  scholarshipDoc: String,  // Cloudinary file URL
  savedCourses: [  // ✅ New field for saved courses
    {
      courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
      courseTitle: String,
      eligibility: String,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Signup = mongoose.model("Signup", signupSchema);

export default Signup;