const router = require("express").Router();
const passport = require("passport");
const CLIENT_HOME_PAGE_URL = "http://localhost:3000";



// when login is successful, retrieve user info
router.get("/login/success", (req, res) => {;
  if (req.user) {
     res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies
    });
  }

});


// // when login failed, send failed msg
// router.get("/login/failed", (req, res) => {
//
// });

// router.get("/facebook", (req, res) => {
//   res.send("Hi!!!");

// });

// When logout, redirect to client
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_HOME_PAGE_URL);
});

// auth with facebook
router.get("/facebook", passport.authenticate("facebook"));
router.get('/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect: '/login',
      successRedirect: CLIENT_HOME_PAGE_URL,
    }),
    function(req, res) {
      
      // Successful authentication, redirect home.
      //res.redirect('/test');
    });

module.exports = router;
