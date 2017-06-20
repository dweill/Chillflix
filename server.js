/* eslint no-console: 0 */
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient();
const path = require('path');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT;
console.log(PORT, 'this is port');
const MONGOURI = process.env.MONGO_URI;
console.log(MONGOURI, 'mongo');
let db;
MongoClient.connect(MONGOURI, (err, database) => {
  if (err) return console.log(err);
  db = database;
  return app.listen(PORT, () => {
    console.log('I am working');
  });
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/+json' }));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '/signup.html'));
});

app.post('/signup', (req, res) => {
  console.log(req.body, 'hey');
  db.connect('users').save(req.body, (err, results) => {
    if (err) return console.log(err);
    console.log('Account Created!');
    res.redirect('/');
  });
});
