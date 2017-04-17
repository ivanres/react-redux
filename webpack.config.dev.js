import path from 'path';
import webpack from 'webpack';

export default {
	//devtools: 'eval-source-map',
	entry: [
		'webpack-hot-middleware/client',
		path.join(__dirname, '/client/index.js')
	],
	output: {
		filename: 'bundle.js',
		path: '/',
		publicPath: '/'
	},
	plugins: [
	    new webpack.NoEmitOnErrorsPlugin(),
	    //new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				include: path.join(__dirname, 'client'),
				loaders: [ 'react-hot-loader', 'babel-loader']
			}
		]
	},
	resolve: {
		extensions: [ '.js' ]
	}
}