const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { User } = require("../models/sql");
const bcrypt = require("bcrypt");

// Google OAuth Strategy
const GoogleStrategy = require("passport-google-oauth20").Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists
        let user = await User.findOne({
          where: { googleId: profile.id }
        });

        if (!user) {
          // Check if user exists with same email
          user = await User.findOne({
            where: { email: profile.emails[0].value }
          });

          if (user) {
            // Update existing user with Google ID
            await user.update({
              googleId: profile.id,
              avatar: profile.photos[0]?.value,
              isEmailVerified: true // Google accounts are pre-verified
            });
          } else {
            // Create new user
            user = await User.create({
              name: profile.displayName,
              email: profile.emails[0].value,
              googleId: profile.id,
              avatar: profile.photos[0]?.value,
              isEmailVerified: true,
              passwordHash: await bcrypt.hash(Math.random().toString(36), 10), // Random password for OAuth users
              role: "participant"
            });
          }
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Google OAuth Routes - Using proper OpenID Connect scopes
router.get("/google", passport.authenticate("google", { 
  scope: ["openid", "email", "profile"] 
}));

router.get("/google/callback", 
  passport.authenticate("google", { session: false }),
  (req, res) => {
    try {
      const user = req.user;
      
      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      // Remove password from response
      const userResponse = user.toJSON();
      delete userResponse.passwordHash;

      // Redirect to frontend with token
      const redirectUrl = `${process.env.FRONTEND_URL}/auth-callback?token=${token}&user=${encodeURIComponent(JSON.stringify(userResponse))}`;
      res.redirect(redirectUrl);
    } catch (error) {
      console.error("Google OAuth error:", error);
      res.redirect(`${process.env.FRONTEND_URL}/login?error=oauth_failed`);
    }
  }
);

module.exports = router;
