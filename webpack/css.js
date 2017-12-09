module.exports = function(paths) {
	return {
		module: {
			rules: [
				{
					test: /\.css$/,
					include: paths,
					exclude: /node-modules/,
					use: [
						'style-loader',
						'css-loader'
					]
				}
			]
		}
	}
}