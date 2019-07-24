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
const pages = require('./pages');
const errorMiddleware = require('./middleware/error');


// Initialize Next.js
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();


app
  .prepare()
  .then(() => {
    // Initialize Express and apply middleware
    const server = express();
    const db = knex(knexConfig);

    server.use(helmet());

    server.use(session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      store: new KnexSessionStore({ knex: db }),
      cookie: {
        maxAge: 1200000, // 20 minutes
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      },
    }));

    // Apply routers
    api({ server, db });
    pages({ server, db, handle });

    // Default route handlers
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
