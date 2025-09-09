// seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import UniversityRegistration from "./models/University.js";

dotenv.config();

const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/FMCDB";

const universities = [
  {
    instituteName: "Tech Institute of India",
    type: "Private",
    year: "2005",
    ownership: "Private",
    accreditation: "NAAC A",
    affiliation: "AICTE",
    students: "5000",
    faculty: "300",

    description: "A leading institute offering engineering and management programs.",
    aboutImages: ["https://placehold.co/600x400?text=AboutUs"],

    address: "123, Knowledge Park",
    state: "Maharashtra",
    city: "Mumbai",
    email: "info@tii.ac.in",
    phone: "9876543210",
    website: "https://tii.ac.in",
    socialMedia: "https://facebook.com/tii",

    chancellor: "Dr. Sharma",
    viceChancellor: "Dr. Mehta",

    courses: [
      {
        courseName: "B.Tech Computer Science",
        duration: "4 Years",
        totalFees: "600000",
        yearlyFees: "150000",
        intake: "120",
        applyLink: "https://tii.ac.in/apply",
      },
      {
        courseName: "MBA",
        duration: "2 Years",
        totalFees: "400000",
        yearlyFees: "200000",
        intake: "60",
      },
    ],

    cutoffs: [
      { course: "B.Tech Computer Science", open: "95", general: "90", obc: "85", sc: "75", st: "70" },
    ],

    placements: [
      { year: "2023", companies: "100", placed: "450", highestCTC: "40 LPA", avgCTC: "7 LPA" },
    ],

    branches: [
      { name: "CSE", avgLPA: "7", highestLPA: "40" },
      { name: "ECE", avgLPA: "6", highestLPA: "25" },
    ],

    recruitersLogos: [
      "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
      "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    ],

    admissions: [
      { courseName: "MBA", eligibility: "Graduation", specialization: "Finance", fee: "200000", highestPack: "20 LPA", avgPack: "7 LPA" },
    ],

    admissionDetails: "Admissions are based on merit and entrance exams.",
    scholarships: ["Merit Scholarship", "Sports Scholarship"],

    facilities: [
      { name: "Library", description: "State-of-the-art digital library" },
      { name: "Hostel", description: "Separate hostels for boys and girls" },
      { name: "Sports Complex", description: "Cricket, Football, Basketball courts" },
    ],

    intlStudentOffice: "Yes",
    countriesEnrolled: "15",
    foreignMoUs: "10",
    languageSupport: "English, Hindi",
    visaSupport: "Yes",

    gallery: {
      infraPhotos: ["https://placehold.co/600x400?text=Infra"],
      eventPhotos: ["https://placehold.co/600x400?text=Event"],
      otherPhotos: ["https://placehold.co/600x400?text=Campus"],
    },

    highestPackage: "40 LPA",
    avgPackage: "7 LPA",
    topRecruiters: ["Google", "Amazon", "Microsoft"],
    popularCourses: ["CSE", "MBA"],
    campusSize: "50 Acres",
    hostelFee: "50000",
    nirfRank: "25",
    library: "Central Digital Library",
    sportsFacilities: "Cricket, Football, Gym",
    studentRating: "4.5",

    logo: ["https://placehold.co/100x100?text=Logo"],
    bannerImage: ["https://placehold.co/1200x400?text=Banner"],
    photos: ["https://placehold.co/600x400?text=Campus1"],
    videos: [],
  },
];

async function seedDB() {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("✅ MongoDB connected");

    await UniversityRegistration.deleteMany({});
    console.log("🗑️ Old universities removed");

    await UniversityRegistration.insertMany(universities);
    console.log("🎉 Universities seeded successfully");

    process.exit();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
}

seedDB();
