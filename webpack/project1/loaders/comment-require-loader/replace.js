function replace(source) {
  // replace
  // @require '../style/index.css'
  // to
  // require('../style/index.css');
  console.log('123123123');
  const result = source.replace(/(\/\/ *@require) +(('|").+('|")).*/, 'require($2);');
  console.log(result);
  return result;
}

module.exports = replace;
