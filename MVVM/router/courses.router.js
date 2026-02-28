// router/courses.router.js
const express = require("express");
const { body, validationResult } = require("express-validator");

const CourseViewModel = require("../viewmodel/course.viewmodel");    
const { createCourseView } = require("../views_layer/course.view");

const router = express.Router();

// ===== VIEW (EJS) - MVVM =====
router.get("/page", async (req, res) => {
  const view = createCourseView(res);
  const vm = new CourseViewModel();

  const state = await vm.getCoursesPageState();
  return view.renderFromState(state);
});

router.post(
  "/page/add",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("description is required"),
  ],
  async (req, res) => {
    const view = createCourseView(res);
    const vm = new CourseViewModel();

    const errors = validationResult(req);
    const errorsArray = errors.isEmpty() ? [] : errors.array();

    const state = await vm.addCourseFromFormState(req.body, errorsArray);
    return view.renderFromState(state);
  }
);

// ===== API (JSON) - MVVM =====
router.get("/", async (req, res) => {
  const view = createCourseView(res);
  const vm = new CourseViewModel();

  const state = await vm.getAllCoursesJsonState();
  return view.renderFromState(state);
});

module.exports = router;