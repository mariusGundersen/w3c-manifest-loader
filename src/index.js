export default function w3cManifest(source){
  this.cacheable();
  const callback = this.async();

  callback(null, source);
}