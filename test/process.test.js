import "babel-polyfill";

import test from 'ava';

import process from '../dist/process.js';

test('empty manifest', async (t) => {
  const result = await process({}, {
    emitFile: (url, result) => {t.is(url, 'test')},
    options: {}
  }, {
    name: 'test'
  });
});
