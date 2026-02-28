// import for express
const express = require("express");
// call for express
const app = express();
const port = 3000;

// 1) body parsers
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); // مهم عشان form submit

// 2) View Engine (EJS)
// i will use ejs as view engine to render html pages
app.set("view engine", "ejs");
// set the views directory (where ejs files are located)
app.set("views", "./views");

const coursesRouter = require("./router/courses.router");

// API
app.use("/api/courses", coursesRouter);

// VIEW
app.use("/courses", coursesRouter);

// listen to the server
app.listen(port, () => {
  console.log("server is running on port" + port);
});
