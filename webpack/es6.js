module.exports = function (paths) {
	return {
		module: {
			rules: [
				{
					test: /\.js$/,
					include: paths,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['es2015']
						}
					}
				}
			]
			// loaders: [
			// 	{
			// 		test: /\.js$/,
			// 		loaders: ['babel-loader']
			// 	}
			// ]
				
		}
	};
};