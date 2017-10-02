const
	path = require('path'),
	webpack = require('webpack');

module.exports = {
	entry: path.resolve(__dirname, 'src/react.js'),
	devtool: 'inline-source-map',
	watch: true,
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: [/node_modules/],
				use: [{
					loader: 'babel-loader',
					options: { presets: ['env', 'react'] }
				}]
			}, {
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			}, {
				test: /\.(sass|scss)$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader'
				]
			}, {
				test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
				use: [
					'file-loader'
				]
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			React: 'react',
			ReactDOM: 'react-dom'
		})
	],
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		compress: false,
		port: 3000
	}
};
