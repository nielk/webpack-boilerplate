var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var jade = require('jade');

module.exports = {
  entry: ifprod('./src/index.js', [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    './src/index.js'
    ]),
  output: {
    path: __dirname + '/dist',
    filename: 'assets/js/bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Clermont-ferrand | Accueil',
      filename: 'index.html',
      templateContent: function(templateParams, compilation) {
        return jade.renderFile('src/index.jade', {
          pretty: true
        });
      }
    }),
    new ExtractTextPlugin('assets/css/style.css', {allChunks: false})
  ],
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader?{browsers:["last 2 version", "Firefox 15"]}!sass-loader')
      },
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.svg$/,
        loader: 'file-loader?name=assets/images/[name].[ext]'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'file-loader?name=assets/images/[name].[ext]'
      }
    ]
  }
};

function ifprod (yes, nope) {
  return process.env.NODE_ENV === 'production' ? yes : nope
}
