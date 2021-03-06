import express from 'express';
import config from 'dotenv';
import bodyParser from 'body-parser';
import indexRoutes from './server/routes/indexRoute';
const passport = require("passport");
const passportSetup = require("./server/src/config/passport-setup");
const session = require("express-session");
const keys = require("./server/src/config/keys");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser"); // parse cookie header
config.config();
const app = express();
const cors = require('cors');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const port = process.env.PORT || 8000;

app.use(
    cookieSession({
        name: "session",
        keys: [keys.COOKIE_KEY],
        maxAge: 24 * 60 * 60 * 100
    })
);

// set up cors to allow us to accept requests from our client
app.use(
  cors({
    origin: process.env.CLIENT_HOME_PAGE_URL || "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through,
  })
);

// parse cookies
app.use(cookieParser());

// initialize passport
app.use(passport.initialize());

// deserialize cookie from the browser
app.use(passport.session());

//routes
app.use('/api/v1', indexRoutes);

app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
});

export default app;
