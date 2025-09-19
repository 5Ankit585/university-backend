// models/Student.js
import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  marksheet: String,
  tc: String,
  migration: String,
  photo: String,
  idProof: String,
});

const studentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  gender: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  parentName: { type: String, required: true },
  parentContact: { type: String, required: true },

  board: String,
  stream: String,
  schoolName: String,
  yearOfPassing: String,
  subjects: [String],
  totalPercentage: Number,
  rollNumber: String,

  course: String,
  specialization: String,
  mode: String,
  hostelRequired: { type: String, default: "No" },
  university: String,

  documents: documentSchema,
  paymentReceipt: String,

  declaration: { type: Boolean, default: false },
  studentSignature: String,
  guardianSignature: String,

  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Student", studentSchema);
