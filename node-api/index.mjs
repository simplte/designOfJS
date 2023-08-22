// const execa = require('execa');
// async function init() {
//   const { stdout } = await execa('ls', ['-l']);
//   console.log(stdout);
// }
// init();
import { execa } from 'execa';
(async () => {
  const { stdout } = await execa('ls', ['-l']);
  console.log(stdout);
})();
