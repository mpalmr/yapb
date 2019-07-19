'use strict';

require('dotenv').config();
const express = require('express');
const next = require('next');
const api = require('./api');

// Initialize Next.js
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    // Initialize Express and apply middleware
    const server = express();
    server.use(express.json());

    // Apply API routes
    api(server);

    // Default route handler
    server.get('*', (req, res) => {
      return handle(req, res);
    });

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
