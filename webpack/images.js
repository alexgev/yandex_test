module.exports = function() {
	return {
		module: {
			rules: [
				{
					test: /\.png$/,
					loader: 'file-loader',
					options: {
						name: '[name].[ext]'
					}
				}
			]
		}
	}
}