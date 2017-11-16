var webpack = require('webpack')
var config = require('../config/webpack.dev.js')
var webpackDevServer = require('webpack-dev-server')
var port = 8080;
config.entry.app.unshift(
  "webpack-dev-server/client?http://" + process.env.IP + ":" + process.env.PORT + "/",
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
