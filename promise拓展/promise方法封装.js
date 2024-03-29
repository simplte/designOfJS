//依次执行每个Promises
const runPromisesInSeries = (ps) => ps.reduce((p, next) => p.then(next), Promise.resolve());
// 延迟执行
const delay1 = (d) => new Promise((r) => setTimeout(r, d));

runPromisesInSeries([() => delay1(1000), () => delay1(2000)]);

// 转换异步函数以返回一个承诺。
const promisify = (func) => {
  return (...args) =>
    new Promise((resolve, reject) => {
      return func(...args, (err, result) => (err ? reject(err) : resolve(result)));
    });
};
const delay = promisify((d, cb) => setTimeout(cb, d));
delay(2000).then(() => console.log('Hi!')); //-> Promise resolves after 2s

/**
 * 文件夹遍历
 */
const recursive = (dir, handler) => {
  return runPromisesInSeries(
    require('fs')
      .readdirSync(dir)
      .map((name) => async () => {
        const filename = require('path').join(dir, name);
        const stats = require('fs').statSync(filename);
        if (stats.isFile()) {
          await handler(filename);
        } else if (stats.isDirectory()) {
          await recursive(filename, handler);
        }
      })
  );
};
let dir = recursive('../../JSMODEL', (res) => {
  console.log(res);
});
dir();
