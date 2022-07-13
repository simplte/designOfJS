class EndWebpackPlugin {
  constructor(doneCallback, failCallback) {
    this.doneCallback = doneCallback;
    this.failCallback = failCallback;
  }
  apply(compiler) {
    compiler.hooks.done.tap('done', (stats) => {
      this.doneCallback(stats);
    });
    compiler.hooks.failed.tap('failed', (err) => {
      this.failCallback(err);
    });
  }
}
module.exports = EndWebpackPlugin;
