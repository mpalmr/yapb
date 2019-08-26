'use strict';

const createToken = require('../create-token');


test('generates a random token represented as hex', async () => {
  expect(await createToken()).toMatch(/^[\da-f]+$/i);
});


test('default token size of 64 hexedecimal characters', async () => {
  expect(await createToken()).toHaveLength(64);
});


test('can set size in bytes in parameter', async () => {
  expect(await createToken(8)).toHaveLength(16);
});
