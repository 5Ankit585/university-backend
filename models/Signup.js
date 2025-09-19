// models/Signup.js
import mongoose from "mongoose";

const signupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed password
  address: String,
  pincode: String,
  university: String,
  course: String,
  branch: String,
  academicDetails: String,
  counsellingBook: String,
  documents: String,       // Cloudinary file URL
  scholarshipDoc: String,  // Cloudinary file URL
  createdAt: { type: Date, default: Date.now },
});

const Signup = mongoose.model("Signup", signupSchema);

export default Signup;
