const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const ROOT = path.resolve(__dirname, 'src');
const DESTINATION = path.resolve(__dirname, 'dist');

module.exports = {
	context: ROOT,
	devtool  : 'cheap-module-source-map',
	
	// IO :
	entry : {
		main: './main.ts'
	},
	
	output: {
		filename: 'game.min.js',
		path    : DESTINATION
	},
	
	// plugins :
	plugins: [
		new CopyWebpackPlugin({
			patterns: [{
				from: 'assets/',
				to  : 'assets/'
			}]
		}),
		new HtmlWebpackPlugin({
			template: 'index.html',
			hash: true,
			minify: 'auto'
		})
	],
	
	resolve: {
		extensions: ['.ts', '.js'],
		modules   : [
			ROOT,
			'node_modules'
		]
	},
	
	// modules
	module: {
		rules: [
			// pre-loaders :
			{
				enforce: 'pre',
				test   : /\.js$/,
				use    : 'source-map-loader'
			},
			
			// loaders :
			{
				test   : /\.ts$/i,
				exclude: [/node_modules/],
				use    : 'ts-loader'
			},
			{
				test   : /\.(?:png|svg|jpg|gif)$/i,
				loader : 'file-loader',
				options: {
					outputPath: 'assets/sprites/',
					name      : '[name].[ext]'
				}
			},
			{
				test: '/\.html$/',
				use : 'html-loader'
			}
		]
	},
	
	// serveur local
	devServer: {
		contentBase: DESTINATION,
		port       : 3000,
		headers    : {
			'Access-Control-Allow-Origin' : '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
			'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
		}
	}
};
