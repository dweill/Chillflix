/* eslint no-console: 0 */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT;
const MONGOURI = process.env.MONGO_URI;
mongoose.connect(MONGOURI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  return app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
});
app.use(cors());
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
  User.find({ username }).exec((err, found) => {
    console.log(found);
    if (found.length > 0) {
      if (found[0].username === username && found[0].password === password) {
        req.session.user = username;
        res.redirect('/');
      } else if (found[0].username === username && found[0].password !== password) {
        res.redirect('/signup');
      }
    } else {
      let user = new User({ username, password, unwatchable: [] })
    .save((error) => {
      if (error) return console.error(err);
      req.session.user = username;
      res.redirect('/');
    });
    }
  });
});
app.put('/hate*', (req, res) => {
  if (req.session.user) {
    User.find({ username: req.session.user }).exec((err, data) => {
      if (err) return console.error(err);
      let id = data[0]._id;
      let currentUnwatchable = data[0].unwatchable;
      User.update({ _id: id }, { $push: { unwatchable: `${req.params['0'].slice(1)}` } }, () => {
        res.send(200);
      });
    });

  }
});

app.get('/user', (req, res) => {
  User.find({ username: req.session.user }).exec((err, data) => {
    if (err) return console.error(err);
    res.send(data);
  });
});
