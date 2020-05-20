
var pg = require('pg');
pg.defaults.ssl = true;

const knex = require('knex');
const configuration = require('../../knexfile');

const env = process.env.NODE_ENV || 'development'
const connection = knex(configuration[env]);

module.exports = connection;