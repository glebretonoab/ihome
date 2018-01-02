const path = require('path');
const express = require('express');
const webpack = require('webpack');
const app = express();

var config = require('../config/webpack.prod.js');
var port = process.env.PORT || 8080;
app.set("port", port);

webpack(config, function(err, stats) {
  if (err) throw err
  
  var appPath = path.join(__dirname, '/../../dist');  
  console.log('dirName =  ' + __dirname);
  console.log('appPath =  ' + appPath);
  app.use(express.static(appPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(appPath, '/index.html'));
  });
  app.listen(port, () => console.log('Listening on port ' + port + ' !'));
})
