// router/courses.router.js

const express = require("express");
const { body, validationResult } = require("express-validator");

const CoursePresenter = require("../presenters/course.presenter");
const { createCourseView } = require("../views_layer/course.view");

const router = express.Router();

// ===== VIEW (EJS) - MVP =====
router.get("/page", (req, res) => {
  const view = createCourseView(res);
  const presenter = new CoursePresenter(view);
  presenter.showCoursesPage();
});

router.post(
  "/page/add",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("description is required"),
  ],
  (req, res) => {
    const view = createCourseView(res);
    const presenter = new CoursePresenter(view);

    const errors = validationResult(req);
    const errorsArray = errors.isEmpty() ? [] : errors.array();

    presenter.addCourseFromForm(req.body, errorsArray);
  }
);

// ===== API (JSON) - MVP =====
router.get("/", (req, res) => {
  const view = createCourseView(res);
  const presenter = new CoursePresenter(view);
  presenter.getAllCoursesJson();
});

module.exports = router;