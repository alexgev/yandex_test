module.exports = function (paths) {
	return {
		module: {
			rules: [
				{
					test: /\.html$/,
					include: paths,
					loader: 'html-loader',
					options: {

					}
				}
			]
		}
	}
}	