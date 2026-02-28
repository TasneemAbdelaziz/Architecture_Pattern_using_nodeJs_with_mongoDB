// presenters/course.presenter.js
const Course = require("../models/courses.models");

class CoursePresenter {
  constructor(view) {
    this.view = view; // view = object فيه functions زي renderCourses/showError/redirect
  }

  async showCoursesPage() {
    try {
      const courses = await Course.find();
      this.view.renderCourses(courses, []);
    } catch (err) {
      this.view.showServerError(err);
    }
  }

  async addCourseFromForm(dto, validationErrors) {
    try {
      // لو فيه validation errors (جاية من route)
      if (validationErrors && validationErrors.length) {
        const courses = await Course.find();
        return this.view.renderCourses(courses, validationErrors);
      }

      await Course.create({
        name: dto.name,
        title: dto.title || "",
        description: dto.description,
      });

      return this.view.redirectToCoursesPage();
    } catch (err) {
      this.view.showServerError(err);
    }
  }

  // (اختياري) API JSON بشكل MVP برضو
  async getAllCoursesJson() {
    try {
      const courses = await Course.find();
      this.view.sendJson(courses);
    } catch (err) {
      this.view.showServerError(err);
    }
  }
}

module.exports = CoursePresenter;