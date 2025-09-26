import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    courseTitle: { type: String, required: true },
    shortName: { type: String, required: true },
    description: String,
    duration: String,
    fees: String,
    mode: String,
    level: String,
    highlights: String,
    internship: String,
    placement: String,
    specializations: [
      {
        name: { type: String, required: true },
        image: String,
        description: String,
      },
    ],
    eligibility: String,
    admissionProcess: String,
    curriculum: String,
    topInstitutes: String,
    careerRoles: String,
    scholarships: String,
    abroadOptions: String,
    faqs: String,
    applyLink: String,
    topInstituteImages: [
      {
        url: { type: String, required: true },
        description: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);