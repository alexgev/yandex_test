const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require('webpack-merge');
const html = require('./webpack/html');
const sass = require('./webpack/sass');
const fontsForDev = require('./webpack/fonts-for-development');
const fontsForProd = require('./webpack/fonts-for-production');
const es6 = require('./webpack/es6');

const PATHS = {
	source: path.join(__dirname, "source"),
	build: path.join(__dirname, "build")
};

const common = merge([
	{
		entry: PATHS.source + '/index.js',
		output: {
			path: PATHS.build,
			filename: '[name].js'
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: PATHS.source + '/index.html'
			})
		]
	},
	html(),
	sass(),
]);

module.exports = function(env) {
	if (env === 'production') {
		return merge([
			common,
			fontsForProd(),
			es6()
		]);
	};
	if (env === 'development') {
		return merge([
			common,
			fontsForDev()
		])
	}
}