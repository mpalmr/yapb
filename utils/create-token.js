'use strict';

const { promisify } = require('util');
const crypto = require('crypto');

const randomBytes = promisify(crypto.randomBytes);


module.exports = async function createToken(size = 64) {
  const bytes = await randomBytes(size);
  return bytes.toString('hex');
};
