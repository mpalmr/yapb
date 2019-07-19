'use strict';

const express = require('express');
const next = require('next');
const router = require('./api');


const app = next({ dev: process.env.NODE_ENV !== 'production' });

app.prepare()
  .then(() => {
    const server = express();

    server.listen(3000, (error) => {
      if (error) throw error;
      console.log(`Server started on port ${3000}`);
    });
  });
