/* eslint no-console: 0 */
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient();
const path = require('path');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT;
const MONGOURI = process.env.MONGO_URI;
let db;
MongoClient.connect(MONGOURI, (err, database) => {
  if (err) return console.log(err);
  db = database;
  return app.listen(PORT, () => {
    console.log('I am working');
  });
});
app.use(express.static('/client'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/+json' }));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/index.html'));
});
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/signup.html'));
});
app.get('/client/components/app.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/components/app.js'));
});
app.get('/client/services/random.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/services/random.js'));
});

app.post('/users', (req, res) => {
  console.log(req.body, 'hey');
  db.collection('users').save(req.body, (err) => {
    if (err) return console.log(err);
    console.log('Account Created!');
    res.redirect('/');
  });
});
