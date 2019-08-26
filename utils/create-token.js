'use strict';

const { promisify } = require('util');
const crypto = require('crypto');

const randomBytes = promisify(crypto.randomBytes);


/**
 * Creates a unique cryptographically secure token.
 * @param {number} size of token in bytes
 * @returns {string} token in hex, twice the size in character length then size param
 */
module.exports = async function createToken(size = 32) {
  const bytes = await randomBytes(size);
  return bytes.toString('hex');
};
