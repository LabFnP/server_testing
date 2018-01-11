const express = require('express');
const app = express();
const mysql = require('mysql');
const Sequelize = require('sequelize');
const Window = require('window');

const User = require('./models/User');
const keys = require('./secret/keys.js');
const cookieSession = require('cookie-session');
const passport = require('passport');

require('./auth/Google.js');
require('./auth/Facebook.js');
require('./service/bodyparser.js')(app);
app.use(express.static(__dirname + '/public'));

app.use(
  cookieSession({
    //maxAge shows how long we want the cookies to last, in this case, we want
    //the cookie to last 30 days(24hrs*60mins*60secs*1000 millisec)
    maxAge: 30 * 24 * 60 * 60 * 1000,

    //encrypt the cookie so that no one can fake it
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

const bodyParser = require('./service/bodyparser.js');
bodyParser(app);
const { host, user, password } = require('./secret/db_configure.js');

const connection = mysql.createConnection({
  host, user, password,
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected');
  }
});

const payment = require('./routes/payment');
require('./routes/authRoutes.js')(app);

const authRoutes = require('./routes/authRoutes.js');
authRoutes(app);

app.use('/payment', payment);

app.get('/login', (err, res) => {
  res.render('login.ejs');
});
app.get('/auth/google/callback', (err, res) => {
  res.render('index.ejs');
});
app.get('/auth/facebook/callback', (err, res) => {
  res.render('index.ejs');
});
app.get('/create_perfumes', (err, res) => {
  res.render('perfume.ejs');
});
app.get('/confirm', (err, res) => {
  res.render('confirm.ejs');
});
app.post('/confirm', (request, response, next) => {
  const producername = request.body.producername;
  const productname = request.body.productname;
  const description = request.body.description;
  const drop = request.body.drop;
  const CONFIRM_INFO = {
    producername: producername,
    productname: productname,
    description: description,
    drop: drop,
  };
  response.render('confirm.ejs', { CONFIRM_INFO: CONFIRM_INFO });
});

const PORT = 3000;
app.listen(PORT);
module.exports = app;
