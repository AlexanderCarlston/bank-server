const createError = require('http-errors');
const express = require('express');

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const request = require('request');
require('dotenv').config();

const app = express();

const users = require('./api/users.js');
const vaults = require('./api/vaults.js');

const port = 3000;


const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  next();
};

app.use(allowCrossDomain);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => {});

app.use('/users', users);
app.use('/vaults', vaults);

app.post('/auth/github', (req, res, next) => {
  const { code } = req.body;
  if (!code) {
    return next();
  }

  return request.post('https://github.com/login/oauth/access_token', {
    headers: {
      accept: 'application/json',
    },
    form: {
      code,
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      redirect_uri: req.body.redirectUri,
    },
  }, (err, response, body) => {
    if (err) return next(err);
    const github = JSON.parse(body);
    return res.send({ testKey: true, token: github.access_token });
  });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {},
  });
});

module.exports = app;
