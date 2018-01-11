const passport = require('passport');
module.exports = (app) => {
  //In here we are going to set the route, when user print the
  //Google Login button, it would run the authentication process
  //immediately, the 'google' is designed by Google wchich allowed
  //webstie to get this string as a verification to run google process
  app.get('/auth/google', passport.authenticate('google', {
    //In here, the scope defines what kind of information we want to get
    //from Google, Google has set different scope for user to access
    scope: ['profile', 'email'],
  }));

  //In the Google.js, we set callbackURL to be auth/google/callback,
  //use the same google strategy to handle the incoming request
  //In here you already have the code for Google to recognize you
  app.get('/auth/google/callback', passport.authenticate('google'));

  //Facebook Part
  app.get('/auth/facebook', passport.authenticate('facebook'));

  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    scope: ['profile', 'email'],
  }));

  //We are going to test our Authentication Flow, so we want to see whether
  //req.user can get what we want
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
  app.use((err, req, res, next) => {
    res.json(err);
  });
};
