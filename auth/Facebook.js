const passport = require('passport');
const cookieSession = require('cookie-session');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');
const keys = require('../secret/keys.js');

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(new FacebookStrategy({
  clientID: keys.facebookClientID,
  clientSecret: keys.facebookClientSecret,
  callbackURL: '/auth/facebook/callback',
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ where: { facebookID: profile.id } }).then(existinguser => {
    if (existinguser) {
      //Nothing will happen, the ID already exists
      done(null, existinguser);
    }else {
      User.create({ facebookID: profile.id }).then(user => done(null, user));
    }
  });
}));
