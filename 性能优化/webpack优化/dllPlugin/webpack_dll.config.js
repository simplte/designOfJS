const path = require('path');
const DllPlugin = require('webpack/lib/DllPlugin');

module.exports = {
  entry: {
    vendor: [
      'fabric',
      'axios',
    ]
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, 'dist-fest'),
    library: '_dll_[name]_[hash]',
  },
  // 全局引入fabric
  plugins: [
    new DllPlugin({
      name: '_dll_[name]_[hash]',
      path: path.join(__dirname, 'dist-fest', '[name].manifest.json'),
    }),
  ],
};
