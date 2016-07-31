module.exports = function(source){
  this.cacheable();
  var callback = this.async();

  callback(null, source);
}