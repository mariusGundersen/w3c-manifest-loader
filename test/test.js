import test from 'ava';

import w3cManifest from '../dist/index.js';

function runAsync(manifest){
  return new Promise((resolve, reject) => {
    try{
      w3cManifest.call({
        query: '',
        options: {},
        cacheable: () => true,
        async: () => (err, result) => err ? reject(err) : resolve(JSON.parse(result))
      }, JSON.stringify(manifest, null, '  '));
    }catch(e){
      reject(e);
    }
  });
}

test('empty manifest', async (t) => {
  const result = await runAsync({});
  t.deepEqual(result, {icons:[]});
});


test('no icons found', async (t) => {
  const result = await runAsync({
    icons: 'path/does/not/exist/*.png'
  });
  t.deepEqual(result, {icons:[]});
});

test('single file', async (t) => {
  const result = await runAsync({
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
  const result = await runAsync({
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