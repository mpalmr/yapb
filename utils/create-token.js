'use strict';

const { promisify } = require('util');
const crypto = require('crypto');

const randomBytes = promisify(crypto.randomBytes);


module.exports = async function createToken(bytes = 64) {
  return randomBytes(bytes).then(a => a.toString('hex'));
};
