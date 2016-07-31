import "babel-polyfill";

import {createReadStream} from 'fs';
import glob from 'glob';
import {getLoaderConfig} from 'loader-utils';
import path from 'path';
import probeSize from 'probe-image-size';

export default async function w3cManifest(source){
  this.cacheable();
  const callback = this.async();

  try{
    const options = getLoaderConfig(this, 'w3c-manifest');

    const manifest = JSON.parse(source);
    const icons = getIconsArray(manifest);

    const listOfGlobResults = await Promise.all(icons.map(icon => globAsPromised(icon, {})));
    const listOfPaths = listOfGlobResults.reduce((a, b) => ([...a, ...b]), []);
    const listOfIcons = await Promise.all(listOfPaths.map(probeSizeAsPromised));

    manifest.icons = listOfIcons.map(({path, width, height, mime}) => ({
      src: path,
      size: `${width}x${height}`,
      type: mime
    }));

    const result = JSON.stringify(manifest, null, '  ');
    callback(null, result);
  }catch(err){
    callback(err);
  }
}

function getIconsArray(manifest){
  const icons = 'icons' in manifest ? manifest.icons : [];

  return Array.isArray(icons) ? icons : [icons];
}

function globAsPromised(pattern, options){
  return new Promise((resolve, reject) =>
    glob(pattern, options,
      (err, files) => err ? reject(err) : resolve(files)));
}

function probeSizeAsPromised(path){
  const input = createReadStream(path);
  return new Promise(function(resolve, reject){
    probeSize(path, (err, result) => {
      input.destroy();

      return err ? reject(err) : resolve({path:path, ...result});
    });
  });
}
