const mongoose = require("mongoose");
const { Schema } = mongoose;

const database = mongoose.createConnection(
  "mongodb+srv://dm6593120:root@cluster0.5tnzbhd.mongodb.net/courses?retryWrites=true&w=majority"
);

const CourseDataSchema = new Schema({
  coursetitle: {
    type: String,
    required: [true, "Please enter an Course Title"],
  },
  coursesubtitle: {
    type: String,
    required: [true, "Please enter an email"],
  },

  coursedescription: {
    type: String,
  },
  courseduration: {type:  mongoose.Types.Decimal128},
  skilllevel:String,
  price:Number
});

const courseModel = database.model("Coursedatas", CourseDataSchema);
module.exports = courseModel;
