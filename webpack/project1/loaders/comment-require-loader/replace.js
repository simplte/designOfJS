function replace(source) {
  // replace
  // @require '../style/index.css'
  // to
  // require('../style/index.css');
  const result = source.replace(/(\/\/ *@require) +(('|").+('|")).*/, 'require($2);');
  return result;
}

module.exports = replace;
