import express from 'express';
import contactRoutes from "./ContactRoute";
const router = express.Router();
const authRoutes = require("./authRoutes");
const authCheck = require('../middleware/authCheck');

// set up routes
router.use('/auth', authRoutes);
router.use('/contacts', contactRoutes);

// if it's already login, send the profile response,
// otherwise, send a 401 response that the user is not authenticated
// authCheck before navigating to home page
router.get("/", authCheck, (req, res) => {
  res.status(200).json({
    authenticated: true,
    message: "user successfully authenticated",
    user: req.user,
    cookies: req.cookies
  });
});

export default router;