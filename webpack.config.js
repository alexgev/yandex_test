const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const PATHS = {
	source: path.join(__dirname, "source"),
	build: path.join(__dirname, "build")
};

module.exports = {
	entry: PATHS.source + '/index.js',
	output: {
		path: PATHS.build,
		filename: '[name].js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: PATHS.source + '/index.html'
		})
	],
	module: {
		rules: [
			{
				test: /\.html$/,
				loader: 'html-loader',
				options: {

				}
			}
		]
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					{loader: 'style-loader'},
					{
						loader: 'css-loader',
						options: {
							minimize: true
						}
					},
					{loader: 'sass-loader'}
				]
			}
		]
	}
}