var mysql = require('mysql2');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '8888',  /* port on which phpmyadmin run */
    password: 'root',
    database: 'dbname',
    socketPath: '/Applications/XAMPP/tmp/mysql/mysql.sock' //for mac and linux
});

connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }

    console.log('Connected to the MySQL server.');
  });