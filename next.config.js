'use strict';

const withCss = require('@zeit/next-css');
const withProgressBar = require('next-progressbar');


module.exports = withProgressBar(withCss({
  progressBar: { profile: true },
}));
