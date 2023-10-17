const coursemodel = require("../Schema/courseschema");

const checkLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()&& req.user.isAdmin) {
      next();
    } else {
      res.status(400).json({ error: 'User not found' });
    }
  };
const createCourse = async (req, res) => {
  try {
    console.log(req.isAuthenticated())
    const course = await coursemodel.create(req.body);
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await coursemodel.find();
    console.log(courses)
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await coursemodel.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  deleteCourse,
  checkLoggedIn,
};
