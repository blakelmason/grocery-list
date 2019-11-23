//native modules
const path = require('path')

//foreign modules
const express = require('express')
const bodyParser = require('body-parser')

//native files
const db = require('../db')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')))

app.get('/groceries', (req, res) => {
  db.query('select * from groceries', (err, data) => {
    res.send(data)
  })
})

app.post('/groceries', (req, res) => {
  db.query('insert into groceries set ?', req.body, (err, data) => {
    if (err) throw err
    res.send('hello!')
  })
})

app.delete('/groceries', (req, res) => {
  db.query('delete from groceries where id = ?', req.query.id, (err, data) => {
    if (err) throw err
    res.send('deleted')
  })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`))
