// views_layer/course.view.js
function createCourseView(res) {
  return {
    renderFromState: (state) => {
      // JSON state
      if (state && Object.prototype.hasOwnProperty.call(state, "json")) {
        if (state.error) return res.status(state.status || 500).json({ message: "Server Error", error: state.error });
        return res.status(state.status || 200).json(state.json);
      }

      // Redirect state
      if (state && state.redirect) {
        return res.redirect(state.redirect);
      }

      // Page render state
      return res.status(state.status || 200).render(state.view || "courses", {
        courses: state.courses || [],
        errors: state.errors || [],
      });
    },
  };
}

module.exports = { createCourseView };