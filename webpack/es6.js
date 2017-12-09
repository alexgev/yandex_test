module.exports = function (paths) {
	return {
		module: {
			rules: [
				{
					test: /\.js$/,
					include: paths,
					exclude: /node-modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['es2015']
						}
					}
				}
			]
		}
	};
};