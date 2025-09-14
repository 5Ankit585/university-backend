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
    specializations: String,
    eligibility: String,
    admissionProcess: String,
    curriculum: String,
    topInstitutes: String,
    careerRoles: String,
    scholarships: String,
    abroadOptions: String,
    faqs: String,
    applyLink: String,

    // NEW FIELDS
    specializationImages: [
      {
        url: String,
        description: String,
      },
    ],
    topInstituteImages: [
      {
        url: String,
        description: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
