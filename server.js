/* eslint no-console: 0 */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT;
const MONGOURI = process.env.MONGO_URI;
mongoose.connect(MONGOURI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  return app.listen(PORT, () => {
    console.log('Listening on 3000');
  });
});
app.use(express.static('/client'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/+json' }));
app.use(session({
  secret: 'cookie cat',
  cookie: {
    maxAge: 60000,
  },
}));

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  unwatchable: [String],
});
const User = mongoose.model('User', userSchema);

app.get('/', (req, res) => {
  if (!req.session.user) {
    res.redirect('/signup');
  }
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
app.get('/styles.css', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/styles.css'));
});

app.post('/signup', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  User.find({ username, password }).exec((err, found) => {
    if (found.length > 0) {
      if (found[0].username === username) {
        req.session.user = username;
        res.redirect('/');
      }
    } else {
    let user = new User({ username, password, unwatchable: [] })
    .save((err) => {
      if (err) return console.error(err);
      console.log('account created!');
      req.session.user = username;
      res.redirect('/');
    });
    }
  });
});
app.put('/hate*', (req, res) => {
  if(req.session.user) {
    User.find({ username: req.session.user }).exec((err, data) => {
      if (err) return console.error(error);
      let id = data[0]._id;
      let currentUnwatchable = data[0].unwatchable;
      User.update({ _id: id }, { $set: { unwatchable: `${currentUnwatchable}   ${req.url}` } }, () => {
        res.send(200);
      });
    });

  }
});
// app.get('/user', (req, res) => {
//   User.find({ username: req.session.user }).exec((err, data) => {
//     let hate = data[0].currentUnwatchable;
//     console.log(hate);
//     res.send(hate);
//   });
// });

