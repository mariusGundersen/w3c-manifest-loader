import "babel-polyfill";

import { getOptions } from 'loader-utils';

import process from './process.js';

export default async function w3cManifest(source){
  this.cacheable();
  const callback = this.async();

  try{
    const config = getOptions(this);

    const manifest = JSON.parse(source);

    const result = await process(manifest, this, config);

    callback(null, result);
  }catch(err){
    callback(err);
  }
}
