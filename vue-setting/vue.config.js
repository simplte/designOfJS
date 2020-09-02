const path = require('path');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
module.exports = {
	css: {
		// css预设器配置项
		loaderOptions: {
			postcss: {
				plugins: [
					// px单位转为rem单位，移动端等比缩放适配
					require('postcss-px2rem')({
						remUnit: 37.5
					})
				]
			}
		},
		modules: false,
		// 是否使用css分离插件 ExtractTextPlugin,将样式和脚本分开
		extract: true,
		// 开启 CSS source maps,生成未被压缩的样式(可能是和其他配置冲突了，暂时未发现有用)
		sourceMap: true
	},
	chainWebpack: (config) => {
		const types = [ 'vue-modules', 'vue', 'normal-modules', 'normal' ];
		types.forEach((type) => addStyleResource(config.module.rule('less').oneOf(type))); // 全局引用less文件
	},
	configureWebpack: (config) => {
		// 配置webpack 压缩
		config.plugins.push(
			new CompressionWebpackPlugin({
				test: /\.js$|\.html$|\.css$/,
				// 超过4kb压缩
				threshold: 4096
			})
		);
	}
};
function addStyleResource(rule) {
	rule.use('style-resource').loader('style-resources-loader').options({
		patterns: [ path.resolve(__dirname, './src/assets/less/base.less') ]
	});
}
