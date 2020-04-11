const knex = require('knex');
const env = process.env.DB_ENV || 'development'
const config = require('../knexfile.js')[env];

module.exports = knex(config);