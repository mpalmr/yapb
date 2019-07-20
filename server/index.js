'use strict';

require('dotenv').config();
const next = require('next');
const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const knex = require('knex');
const knexConfig = require('../knexfile');
const api = require('./api');
const errorMiddleware = require('./middleware/error');


// Initialize Next.js
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();
const db = knex(knexConfig);
const sessionStore = new KnexSessionStore({ knex: db });

app
  .prepare()
  .then(() => {
    // Initialize Express and apply middleware
    const server = express();
    server.use(helmet());
    server.use(express.json());

    server.use(session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      store: sessionStore,
      cookie: {
        maxAge: 1200000, // 20 minutes
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      },
    }));

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
