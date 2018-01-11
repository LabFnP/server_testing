const mysql = require('mysql');

const { host, user, password, port } = require('../secret/db_configure.js');

const connection = mysql.createConnection({
  host, user, password, port,
});

module.exports = connection;
