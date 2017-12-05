module.exports = function(paths) {
	return {
		module: {
			rules: [
				{
					test: /\.(eot|svg|ttf|woff|woff2)$/,
					include: paths,
					loader: 'url-loader?name=/fonts/[name]/[name].[ext]'
				}
			]
		}
	}
}