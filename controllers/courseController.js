import Course from "../models/Course.js";

// Get all courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single course by ID
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new course
export const createCourse = async (req, res) => {
  try {
    const { body, files } = req;

    // Handle specialization images
    const specializationImages = (files.specializationImages || []).map((file, idx) => ({
      url: file.path, // path where multer saved the file
      description: Array.isArray(body.specializationDescriptions)
        ? body.specializationDescriptions[idx] || ""
        : body.specializationDescriptions || "",
    }));

    // Handle top institute images
    const topInstituteImages = (files.topInstituteImages || []).map((file, idx) => ({
      url: file.path,
      description: Array.isArray(body.topInstituteDescriptions)
        ? body.topInstituteDescriptions[idx] || ""
        : body.topInstituteDescriptions || "",
    }));

    const course = new Course({
      courseTitle: body.courseTitle,
      shortName: body.shortName,
      description: body.description,
      duration: body.duration,
      fees: body.fees,
      mode: body.mode,
      level: body.level,
      highlights: body.highlights,
      internship: body.internship,
      placement: body.placement,
      specializations: body.specializations,
      eligibility: body.eligibility,
      admissionProcess: body.admissionProcess,
      curriculum: body.curriculum,
      topInstitutes: body.topInstitutes,
      careerRoles: body.careerRoles,
      scholarships: body.scholarships,
      abroadOptions: body.abroadOptions,
      faqs: body.faqs,
      applyLink: body.applyLink,
      specializationImages,
      topInstituteImages,
    });

    await course.save();
    res.status(201).json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
