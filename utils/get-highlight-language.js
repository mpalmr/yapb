'use strict';

const languageMap = {
  bash: 'shell',
  bat: 'batch',
  c: 'c',
  coffee: 'coffee',
  csharp: 'csharp',
  css: 'css',
  go: 'go',
  hs: 'haskell',
  haml: 'haml',
  html: 'html',
  js: 'javascript',
  json: 'json',
  less: 'less',
  lua: 'lua',
  matlab: 'matlab',
  py: 'python',
  rs: 'rust',
  rb: 'ruby',
  sass: 'sass',
  sh: 'shell',
  scala: 'scala',
  scss: 'scss',
  sql: 'sql',
  stylus: 'stylus',
  swift: 'swift',
  tcl: 'tcl',
  toml: 'toml',
  ts: 'typescript',
  twig: 'twig',
  yml: 'yaml',
};


module.exports = function getHighlightLanguage(fileName) {
  if (fileName === 'Makefile') return 'makefile';
  if (fileName === 'Dockerfile') return 'docker';

  const splitFileName = fileName.split('.');
  const extension = splitFileName[splitFileName.length - 1];
  return languageMap[extension] || null;
};
