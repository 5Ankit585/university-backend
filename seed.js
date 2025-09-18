import mongoose from "mongoose";
import Scholarship from "./models/Scholarship.js"; // adjust path if needed

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/scholarshipsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample scholarships
const sampleScholarships = [
  {
    name: "National Merit Scholarship",
    provider: "Govt of India",
    category: "General",
    income: "1L-3L",
    educationLevel: "UG",
    benefits: "₹50,000 per year",
    deadline: "2025-12-31",
    status: "Open",
    description: "Awarded to top-performing students nationwide.",
    eligibility: "Must score above 85% in 12th boards.",
    type: "Merit",
    region: "Delhi",
    generalQuota: "Yes",
    tags: ["merit", "UG", "Delhi"],
  },
  {
    name: "Post Matric OBC Scholarship",
    provider: "State Govt",
    category: "OBC",
    income: "4L-5L",
    educationLevel: "UG",
    benefits: "₹20,000 per year + hostel fee",
    deadline: "2025-10-15",
    status: "Upcoming",
    description: "For OBC students pursuing higher education.",
    eligibility: "OBC category + family income below ₹5L.",
    type: "Need",
    region: "Maharashtra",
    generalQuota: "No",
    tags: ["OBC", "Need", "UG"],
  },
  {
    name: "PhD Research Fellowship",
    provider: "Private University",
    category: "General",
    income: "",
    educationLevel: "PhD",
    benefits: "Full tuition + stipend ₹35,000/month",
    deadline: "2025-09-30",
    status: "Open",
    description: "Funding for PhD candidates in Science & Tech.",
    eligibility: "Must have cleared NET/JRF.",
    type: "Private",
    region: "Karnataka",
    generalQuota: "Yes",
    tags: ["PhD", "Research", "Private"],
  },
];

// Insert data
async function seed() {
  try {
    await Scholarship.deleteMany(); // clear old data
    await Scholarship.insertMany(sampleScholarships);
    console.log("Sample scholarships inserted ✅");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding scholarships:", err);
    mongoose.connection.close();
  }
}

seed();
