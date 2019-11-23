var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '4808',
  database: 'grocery-list'
})

connection.connect()

module.exports = connection
