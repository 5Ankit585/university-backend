import mongoose from "mongoose";

const scholarshipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  provider: { type: String },
  category: { type: String },
  income: { type: String },
  educationLevel: { type: String },
  benefits: { type: String },
  deadline: { type: String },
  status: { type: String },
  description: { type: String },
  eligibility: { type: String },
  type: { type: String },
  region: { type: String },
  generalQuota: { type: String },
  tags: [String],
}, { timestamps: true });

export default mongoose.model("Scholarship", scholarshipSchema);
