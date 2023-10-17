const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const bcrypt = require("bcrypt");

const database = mongoose.createConnection(
  "mongodb+srv://dm6593120:root@cluster0.5tnzbhd.mongodb.net/users?retryWrites=true&w=majority"
);

const userDataSchema = new Schema({
  googleId: String, // To store Google ID for Google users
  username: String,
  email: String,
  password: String, // For non-Google users
  isAdmin: {type:Boolean, default: false},
  photos:String // To store admin status
});


const userDataModel = database.model("useraccountdatas", userDataSchema);
module.exports = userDataModel;
