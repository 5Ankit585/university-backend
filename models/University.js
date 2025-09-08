import mongoose from "mongoose";

/* ---------------- Courses Sub-schema ---------------- */
const courseSchema = new mongoose.Schema({
  courseName: String,
  duration: String,
  totalFees: String,
  yearlyFees: String,
  intake: String,
  applyLink: String,
});

/* ---------------- Cutoff Sub-schema ---------------- */
const cutoffSchema = new mongoose.Schema({
  course: String,
  open: String,
  general: String,
  ews: String,
  obc: String,
  sc: String,
  st: String,
  pwd: String,
});

/* ---------------- Placements Sub-schema ---------------- */
const placementSchema = new mongoose.Schema({
  year: String,
  companies: String,
  placed: String,
  highestCTC: String,
  avgCTC: String,
});

/* ---------------- Admissions Sub-schema ---------------- */
const admissionSchema = new mongoose.Schema({
  courseName: String,
  eligibility: String,
  specialization: String,
  fee: String,
  highestPack: String,
  avgPack: String,
});

const universityRegistrationSchema = new mongoose.Schema({
  // Step 1: Basic Info
  instituteName: String,
  type: String,
  year: String,
  ownership: String,
  accreditation: String,
  affiliation: String,
  students: String,
  faculty: String,
  aboutUs: String,

  // Step 2: Contact & Location
  address: String,
  state: String,
  city: String,
  email: String,
  phone: String,
  website: String,
  socialMedia: String,

  // Step 3: Key Persons
  chancellor: String,
  viceChancellor: String,
  registrar: String,
  deans: String,
  principal: String,
  admissionOfficer: String,
  placementOfficer: String,
  researchHead: String,
  intlRelationsOfficer: String,

  // Step 4: Courses & Cutoffs
  courses: [courseSchema],
  cutoffs: [cutoffSchema],

  // Step 5: Placements
  placements: [placementSchema],
  branches: [
    {
      name: String,
      avgLPA: String,
      highestLPA: String,
    },
  ],
  recruitersLogos: [String],


  // Step 6: Admissions
  admissions: [admissionSchema],
  admissionDetails: String,
  scholarships: [String],

  // Step 7: Facilities
  facilities: [
    {
      name: String,
      description: String,
    },
  ],

  // Step 8: International, Account & Uploads
  intlStudentOffice: String,
  countriesEnrolled: String,
  foreignMoUs: String,
  languageSupport: String,
  visaSupport: String,

  // File uploads
  logo: [String],
  bannerImage: [String],
  galleryImages: [String],
  photos: [String],
  videos: [String],
  courseFiles: [String],
  accreditationDoc: [String],
  affiliationDoc: [String],
  registrationDoc: [String],

  // Auth Section
  emailUsername: String,
  password: String,
  subscriptionPlan: {
    type: String,
    enum: ["free", "standard", "premium"],
    default: "free",
  },

  // Declaration
  declaration: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now },
});

const UniversityRegistration = mongoose.model(
  "UniversityRegistration",
  universityRegistrationSchema
);

export default UniversityRegistration;
