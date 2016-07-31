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