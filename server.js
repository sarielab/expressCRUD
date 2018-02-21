require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient

const mongo_url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds127132.mlab.com:27132/purwadb`
let db

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
/*
  The urlencoded method within body-parser tells
  body-parser to extract data from the <form> element
  and add them to the body property in the request object.
*/

app.get('/', (req, res) => {
  // console.log(cursor)
  let cursor = db.collection('quotes').find().toArray((err, quotes) => {
    if (err) {res.send(err)}
    res.render('index.ejs', {quotes: quotes})
  })



})

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to db')
    res.redirect('/')
  })
})

MongoClient.connect(mongo_url, (err, client) => {
  if (err) return console.log(err)
  console.log('Connected to mongodb')

  db = client.db('purwadb') //dbname

  app.listen(3000, function() {
    console.log('Listening on port 3000')
  })

})







