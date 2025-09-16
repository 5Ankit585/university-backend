import Scholarship from "../models/Scholarship.js";

// ✅ Add Scholarship
export const addScholarship = async (req, res) => {
  try {
    const scholarship = new Scholarship(req.body);
    await scholarship.save();
    res.status(201).json(scholarship);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Get All Scholarships
export const getScholarships = async (req, res) => {
  try {
    const scholarships = await Scholarship.find();
    res.json(scholarships);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete Scholarship
export const deleteScholarship = async (req, res) => {
  try {
    const deleted = await Scholarship.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Scholarship not found" });
    }
    res.json({ message: "Scholarship deleted successfully" });
  } catch (err) {
    console.error("Error deleting scholarship:", err.message);
    res.status(500).json({ error: err.message });
  }
};

