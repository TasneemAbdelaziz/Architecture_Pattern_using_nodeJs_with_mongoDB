const mongoose = require('mongoose');

const url = 'mongodb+srv://tasneem:nodejs-mongo@nodejs-mongo.ldg0yrd.mongodb.net/CSE474_DB?appName=nodejs-mongo;'
mongoose.connect(url).then(()=>{
  console.log("connected to the database successfully");
});

const courseSchema = new  mongoose.Schema({
  name:String,
  title:String,
  description:String
});

const Course = mongoose.model("Course",courseSchema);

module.exports = Course;