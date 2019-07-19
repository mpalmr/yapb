'use strict';

if (!process.env.DB_USER) require('dotenv').config(); // eslint-disable-line global-require

module.exports = {
  client: 'pg',
  connection: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
};
