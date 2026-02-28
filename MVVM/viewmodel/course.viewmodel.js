// course.viewmodel.js
const Course = require("../models/courses.models");

class CourseViewModel {
  async getCoursesPageState() {
    try {
      const courses = await Course.find();
      return { status: 200, view: "courses", courses, errors: [], redirect: null };
    } catch (err) {
      return { status: 500, view: "courses", courses: [], errors: [{ msg: err.message }], redirect: null };
    }
  }

  async addCourseFromFormState(dto, validationErrors) {
    try {
      if (validationErrors && validationErrors.length) {
        const courses = await Course.find();
        return { status: 400, view: "courses", courses, errors: validationErrors, redirect: null };
      }

      await Course.create({
        name: dto.name,
        title: dto.title || "",
        description: dto.description,
      });

      return { status: 302, view: null, courses: null, errors: [], redirect: "/courses/page" };
    } catch (err) {
      const courses = await Course.find().catch(() => []);
      return { status: 500, view: "courses", courses, errors: [{ msg: err.message }], redirect: null };
    }
  }

  async getAllCoursesJsonState() {
    try {
      const courses = await Course.find();
      return { status: 200, json: courses, error: null };
    } catch (err) {
      return { status: 500, json: null, error: err.message };
    }
  }
}

module.exports = CourseViewModel;