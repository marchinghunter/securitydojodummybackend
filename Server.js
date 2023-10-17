const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const passportSetup = require("./Passport");
const cookieSession = require("cookie-session");
const session = require("express-session");
const PORT = process.env.PORT || 8080;
const authroute = require("./Router/router");
require('dotenv').config()
const {
  checkLoggedIn
} = require("./Controller/coursecontroller");

app.use(
  cors({
    origin: process.env.SITE,
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    name: 'SecurityDojo', // Session name
    secret: 'Random', // Session secret (replace with your own secret)
    resave: true, // Don't save the session if it hasn't changed
    saveUninitialized: true, // Don't save uninitialized sessions
    cookie: {
      maxAge: 48 * 60 * 60 * 1000, // 24 hours (session expiration time)
      secure: false, // Set to true in a production environment with HTTPS
    }
  }));
app.use(passport.initialize());
app.use(passport.session());


app.use("/auth", authroute);

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
