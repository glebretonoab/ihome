var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  entry: { 
    polyfills: './src/polyfills.ts',
    vendor: './src/vendor.ts',
    app: ['./src/main.ts']
  },

  resolve: {
    extensions: ['.ts', '.js', '.css']
  },

  module: {
    rules: [
      // PreLoaders
      {
          test: /\.ts$/,
          exclude: /(node_modules)/,
          enforce: 'pre',
          loader: 'tslint-loader',
          options: {
            configFile: helpers.root('src', 'tslint.json')
          }
      },
      // Loaders
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: helpers.root('src', 'tsconfig.json')
            }
          } , 'angular2-template-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|ico)$/,
        loader: 'file-loader?name=assets/images/[name].[hash].[ext]'
      },
      {
        test: /\.(svg|woff|woff2|ttf|eot)$/,
        loader: 'file-loader?name=assets/fonts/[name].[hash].[ext]'
      }
    ]
  },

  plugins: [
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('./src'), // location of your src
      {} // a map of your routes
    ),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),

    new webpack.ProvidePlugin({
        "$": "jquery",
        "jquery": "jquery",
        "jQuery": "jquery",
        "window.jQuery": "jquery"
    })
  ]
};
