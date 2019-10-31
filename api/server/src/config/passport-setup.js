import database from "../models";

const passport = require("passport");
const FacebookStrategy = require("passport-facebook");
const keys = require("./keys");
const User = require("../models/user");

// serialize the user.id to save in the cookie session
// so the browser will remember the user when login
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserialize the cookieUserId to user in the database
passport.deserializeUser((id, done) => {
     database.User.findByPk(id)
    .then(user => {
        console.log(user);
      done(null, user);
    })
    .catch(e => {
      done(new Error("Failed to deserialize an user"));
    });
});

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.FACEBOOK_CONSUMER_KEY,
      clientSecret: keys.FACEBOOK_CONSUMER_SECRET,
      callbackURL: "/auth/facebook/callback"
    },
    async (token, tokenSecret, profile, done) => {
      console.log("profile ==========",profile);
      // // find current user in UserModel
      console.log("id =========",profile.id_str)
        const currentUser = await database.User.findOne({
            where: { id: Number(profile.id) }
        })
      console.log("cu==========================",currentUser);
      // create new user if the database doesn't have this user
      if (!currentUser) {
          const newUser = await database.User.create(
            {
                name: profile.name,
                facebookId: profile.id,
            }
        );
        if (newUser) {
          done(null, newUser);
        }
      }
       done(null, currentUser);
    }
  )
);
