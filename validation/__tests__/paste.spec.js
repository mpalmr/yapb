'use strict';

const validate = require('../paste');


test('Contents', () => {
  expect(validate({ contents: '' }).contents).toEqual('Required');
  expect(validate({ contents: '   ' }).contents).toEqual('Required');
  expect(validate({ contents: 'a' }).contents).toBeUndefined();
});
