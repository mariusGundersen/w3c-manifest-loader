import "babel-polyfill";

import test from 'ava';

import parseIcons from '../dist/parseIcons.js';

test('empty manifest', async (t) => {
  const result = await parseIcons({});
  t.deepEqual(result, {icons:[]});
});

test('no icons found', async (t) => {
  const result = await parseIcons({
    icons: 'path/does/not/exist/*.png'
  });
  t.deepEqual(result, {icons:[]});
});

test('single file', async (t) => {
  const result = await parseIcons({
    icons: 'samples/cc.png'
  });
  t.deepEqual(result, {
    icons: [
      {
        src:'__webpack_public_path__/samples/cc.png',
        size: '64x64',
        type:'image/png'
      }
    ]
  });
});

test('multiple files', async (t) => {
  const result = await parseIcons({
    icons: 'samples/*.png'
  });
  t.deepEqual(result, {
    icons: [
      {
        src:'__webpack_public_path__/samples/cc.large.png',
        size: '384x384',
        type:'image/png'
      },
      {
        src:'__webpack_public_path__/samples/cc.png',
        size: '64x64',
        type:'image/png'
      }
    ]
  });
});