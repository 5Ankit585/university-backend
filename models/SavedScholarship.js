import mongoose from "mongoose";

const savedScholarshipSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true }, // user identifier (email)
    scholarshipId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Scholarship",
      required: true,
    },
    savedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("SavedScholarship", savedScholarshipSchema);
