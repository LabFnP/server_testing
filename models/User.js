const Sequelize = require('sequelize');
const mysql = require('mysql');

const connection = new Sequelize('LFP', 'root', '54890971', {
  dialect: 'mysql',
});

const User = connection.define('user', {
  googleID: {
    type: Sequelize.STRING,
  },
  facebookID: {
    type: Sequelize.STRING,
  },
});

connection.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
User.sync({ force: true }).then(() => {
    // Table created
    return User.create({
      googleID: '',
    });
  });

module.exports = User;
