import config from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import contactRoutes from './server/routes/ContactRoute';
const passport = require("passport");
const passportSetup = require("./server/src/config/passport-setup");
const session = require("express-session");
const authRoutes = require("./server/routes/auth-routes");
const keys = require("./server/src/config/keys");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser"); // parse cookie header
config.config();

const app = express();
const cors = require('cors');

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 8000;

app.use('/api/v1/contacts', contactRoutes);



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
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  })
);

// parse cookies
app.use(cookieParser());

// initalize passport
app.use(passport.initialize());
// deserialize cookie from the browser
app.use(passport.session());





// set up routes
app.use('/auth', authRoutes);

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.status(401).json({
            authenticated: false,
            message: "user has not been authenticated"
        });
    } else {
        next();
    }
};

// if it's already login, send the profile response,
// otherwise, send a 401 response that the user is not authenticated
// authCheck before navigating to home page
app.get("/", authCheck, (req, res) => {
    res.status(200).json({
        authenticated: true,
        message: "user successfully authenticated",
        user: req.user,
        cookies: req.cookies
    });
});










// when a random route is inputed
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to this Contact Manager API.',
}));

app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
});

export default app;
