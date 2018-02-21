require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const cors = require('cors')

const mongo_url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds127132.mlab.com:27132/purwadb`
let db

app.set('view engine', 'ejs')
app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

/*
  The urlencoded method within body-parser tells
  body-parser to extract data from the <form> element
  and add them to the body property in the request object.


  Then, we have to tell Express to make this public folder accessible to the public by using a built-in middleware called express.static
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

app.put('/quotes/:id', (req, res) => {
  // db.collections('quotes').findOneAndUpdate(
  //   query, => filter
  //   update, => perubahan
  //   options, => misal sorting, upsert (update & insert)
  //   callback => fungsi setelah sukses
  // )
  console.log(req.body)

  db.collection('quotes')
    .findOneAndUpdate({"_id": ObjectID(`${req.params.id}`)}, {
      $set: {
        name: req.body.name,
        quote: req.body.quote
      }
    }, {
      // sort: {_id: -1},
      // upsert: false
    }, (err, quote) => {
      console.log('---------------------------------------')
      console.log(err)
      console.log(quote)
      if (err) return res.send({err: err})
      res.send(quote)
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







