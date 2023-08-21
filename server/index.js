var mysql = require('mysql');
var config = require('./configDB');

var connection = mysql.createConnection(config.databaseOptions);

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });