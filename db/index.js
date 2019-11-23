var mysql = require('mysql')

let connect

if (process.env.NODE_ENV === 'production') {
  connect = process.env.JAWSDB_URL
} else {
  connect = {
    host: 'localhost',
    user: 'root',
    password: '4808',
    database: 'grocery-list'
  }
}

var connection = mysql.createConnection(connect)

connection.connect()

module.exports = connection
