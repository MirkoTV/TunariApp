process.env.NODE_ENV = 'production';

var app = require('./app');

// Config
var config = require('./config/environment');

/*var server = app.listen(config.serverOptions.port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('TunariApp is running at %s:%d in %s mode', config.serverOptions.host, config.serverOptions.port, config.env);
});*/


var fs = require('fs'),
https = require('https');


https.createServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
  passphrase: 'test'
}, app).listen(8000);
