// views_layer/course.view.js
function createCourseView(res) {
    return {
        renderCourses: (courses, errors) => res.render("courses", { courses, errors }),
        redirectToCoursesPage: () => res.redirect("/courses/page"),
        sendJson: (data) => res.json(data),
        showServerError: (err) =>
        res.status(500).json({ message: "Server Error", error: err.message }),
    };
}

module.exports = { createCourseView };