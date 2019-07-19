'use strict';

require('dotenv').config();
const express = require('express');
const next = require('next');
const knex = require('knex');
const knexConfig = require('../knexfile');
const api = require('./api');
const errorMiddleware = require('./middleware/error');


// Initialize Next.js
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();
const db = knex(knexConfig);

app
  .prepare()
  .then(() => {
    // Initialize Express and apply middleware
    const server = express();
    server.use(express.json());

    // Apply API routes
    api({ server, db });

    // Default route handler
    server.get('*', handle);
    server.use(errorMiddleware);

    // Start HTTP server
    server.listen(process.env.PORT, (error) => {
      if (error) throw error;
      console.log(`Server started on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error(error.stack);
    process.exit(1);
  });
