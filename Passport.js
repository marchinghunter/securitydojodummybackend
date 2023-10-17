const passport = require("passport");
const User = require("./Schema/userschema");

const GoogleStrategy = require("passport-google-oauth20").Strategy;

GOOGLE_CLIENT_ID = "975154307380-kkk0dg70den4rjhe582q2oupqfn5aqbg.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET = "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"

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
          return done(null, existingUser);
        } else {
          const newUser = new User({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            photos: profile.photos[0].value,
          });
          await newUser.save();

          return done(null, newUser);
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});
