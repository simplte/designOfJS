const replace = require('./replace');

module.exports = function (content) {
  if (this.cacheable) {
    this.cacheable();
  }
  console.log(content);
  return replace(content);
};
