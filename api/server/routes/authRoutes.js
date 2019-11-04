import extendTimeoutMiddleware from '../middleware/extendTimeoutMiddleware'

const router = require("express").Router();
const passport = require("passport");
const CLIENT_HOME_PAGE_URL = process.env.CLIENT_HOME_PAGE_URL || "http://localhost:3000";

// when login is successful, retrieve user info
router.get("/login/success", extendTimeoutMiddleware, (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies
    });
  } else {
    res.json({
      success: false,
      message: "user not authenticated",
    });
  }
});

// When logout, redirect to client
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_HOME_PAGE_URL);
});

// auth with facebook
router.get("/facebook", passport.authenticate("facebook"));
router.get('/facebook/callback', extendTimeoutMiddleware, passport.authenticate('facebook', {
  failureRedirect: '/login',
  successRedirect: CLIENT_HOME_PAGE_URL,
}), () => {
});

module.exports = router;
