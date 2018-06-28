// import { log } from 'util';

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
var request = require('request');
var querystring = require('querystring');
var Axios = require('axios');
require('dotenv').config()

const app = express();

const users = require('./api/users.js')
const vaults = require('./api/vaults.js')

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === "OPTIONS") 
        res.send(200);
    else (next())
}
app.use(allowCrossDomain)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/users', users);
app.use('/vaults', vaults);
//test
app.post('/auth/github', (req, res, next) => {
  const code = req.body.code
  if (!code) {
    return next()
  }

  request.post('https://github.com/login/oauth/access_token', {
    headers: {
      "accept": "application/json"
    },
    form: {
      code,
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET
    }
  }, (err, response, body) => {
    if (err) return next(err)
    console.log('RESPONSE', response)
    console.log('BODY', body)
    const github = JSON.parse(body)
    res.json({testKey: true, accessToken: github.access_token})
  })
})
//test
// app.get('/auth/github/:code', (req, res, next) => {
  // const code = req.params.code
  // if (!code) {
  //   return next()
  // }

  // request.post('https://github.com/login/oauth/access_token', {
  //   headers: {
  //     "accept": "application/json"
  //   },
  //   form: {
  //     code,
  //     client_id: process.env.GITHUB_CLIENT_ID,
  //     client_secret: process.env.GITHUB_CLIENT_SECRET
  //   }
  // }, (err, response, body) => {
  //   if (err) return next(err)
  //   console.log('RESPONSE', response)
  //   console.log('BODY', body)
  //   const github = JSON.parse(body)
  //   res.json({testKey: true, accessToken: github.access_token})
  // })
// })




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log('EXPRESS ERROR:', err)
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
