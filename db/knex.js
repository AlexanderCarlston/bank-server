const environment = process.env.NODE_ENV || 'development';

const knex = require('knex');

const config = require('../knexfile');

const environmentConfig = config[environment];
const connection = knex(environmentConfig);

// var bookshelf = require('bookshelf')(connection)
module.exports = connection;
