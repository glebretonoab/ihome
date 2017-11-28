var webpack = require('webpack')
var config = require('../config/webpack.dev.js')
var webpackDevServer = require('webpack-dev-server')
var port = process.env.PORT || 8080;
var server_url = 'http://localhost';

config.entry.app.unshift(
  "webpack-dev-server/client?" + server_url + ':' + port,
  "webpack/hot/dev-server"
)

var server = new webpackDevServer(webpack(config), {
  hot: true,
  contentBase: './',
  quiet: false,
  noInfo: false,
  publicPath: config.output.publicPath,
  stats: "minimal",
  disableHostCheck: true
});

server.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("J'écoute sur le port " + port);
  }
})
