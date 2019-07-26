'use strict';

const getHighlightLanguage = require('../get-highlight-language');


test('By extension', () => {
  expect(getHighlightLanguage('a-b.js')).toBe('javascript');
  expect(getHighlightLanguage('.js')).toBe('javascript');
  expect(getHighlightLanguage('a.ts')).toBe('typescript');
  expect(getHighlightLanguage('a.rs')).toBe('rust');
});


test('Deafults to textfile', () => {
  expect(getHighlightLanguage('stuff')).toBeNull();
});


test('Makefile', () => {
  expect(getHighlightLanguage('Makefile')).toBe('makefile');
});


test('Dockerfile', () => {
  expect(getHighlightLanguage('Dockerfile')).toBe('docker');
});
