import "babel-polyfill";

import {getLoaderConfig} from 'loader-utils';

import process from './process.js';

export default async function w3cManifest(source){
  this.cacheable();
  const callback = this.async();

  try{
    const config = getLoaderConfig(this, 'w3c-manifest');

    const manifest = JSON.parse(source);

    const result = await process(manifest, this, config);

    callback(null, result);
  }catch(err){
    callback(err);
  }
}
