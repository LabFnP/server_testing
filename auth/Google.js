const passport = require('passport');
const cookieSession = require('cookie-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../secret/keys.js');

const User = require('../models/User.js');

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ where: { googleID: profile.id } }).then(existinguser => {
    if (existinguser) {
      //Nothing will happen, the ID already exists
      done(null, existinguser);
    }else {
      User.create({ googleID: profile.id }).then(user => done(null, user));
    }
  });

}));

//How do I know what kind of value will included in the callback
