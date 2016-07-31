import test from 'ava';

import w3cManifest from '../dist/index.js';

function runAsync(manifest){
  return new Promise((resolve, reject) => {
    try{
      w3cManifest.call({
        emitFile: (url, result) => resolve(JSON.parse(result)),
        query: '',
        options: {},
        cacheable: () => true,
        async: () => (err, result) => err ? reject(err) : true
      }, JSON.stringify(manifest, null, '  '));
    }catch(e){
      reject(e);
    }
  });
}

test('simple process', async (t) => {
  const result = await runAsync({});
  t.deepEqual(result, {icons: []});
})