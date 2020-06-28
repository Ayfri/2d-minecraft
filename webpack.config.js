const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const ROOT = path.resolve(__dirname, 'src');
const DESTINATION = path.resolve(__dirname, 'out');

module.exports = {
	context: ROOT,
	mode   : 'development',
	target : 'web',
	
	// IO :
	entry : {
		main: './main.ts'
	},
	output: {
		filename: '[name].bundle.js',
		path    : DESTINATION
	},
	
	// plugins :
	plugins: [
		new CopyWebpackPlugin({
			patterns: [{
				from: 'assets',
				to  : 'assets'
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
			{
				enforce: 'pre',
				test   : /\.ts$/,
				exclude: /node_modules/,
				use    : 'tslint-loader'
			},
			
			// loaders :
			{
				test   : /\.ts$/i,
				exclude: [/node_modules/],
				use    : 'awesome-typescript-loader'
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
		contentBase: 'out',
		port       : 3000,
		headers    : {
			'Access-Control-Allow-Origin' : '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
			'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
		}
	},
	devtool  : 'cheap-module-source-map'
};