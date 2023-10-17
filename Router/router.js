const router = require("express").Router();
const passport = require("passport");
const {
  createCourse,
  getAllCourses,
  deleteCourse,
  checkLoggedIn,
} = require("../Controller/Coursecontroller.js");

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.SITE,
    failureRedirect: "/login/failed",
  })
);

router.get("/login/failed", (req, res) => {
  res.status(404).json({
    message: "Login failed!",
    error: true,
  });
});

router.get("/login/success", (req, res) => {
  if (req.user) {
    console.log(req.user)
    console.log(req.isAuthenticated())
    res.status(200).json({
      message: "Login Success",
      error: false,
      user: req.user,
    });
  } else {
    res.status(404).json({
      message: "No User Found",
      error: true,
    });
  }
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      // Handle any errors that occurred during logout
      console.error(err);
    }
    // Redirect after successful logout or error handling
    res.redirect(process.env.SITE);
  });
});
// router.post("/login");
router.post("/courses",checkLoggedIn, createCourse);
router.get("/courses", getAllCourses);
router.delete("/courses/:id",checkLoggedIn, deleteCourse);
module.exports = router;
