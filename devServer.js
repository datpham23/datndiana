var _ = require('lodash');
var bodyParser = require('body-parser');
var co = require('co');
var express = require('express');
var path = require('path');
var r = require('rethinkdbdash')();
var webpack = require('webpack');
var winston = require('winston');
var http = require('http');
var compress = require('compression');


winston.level = 'debug';
winston.add(winston.transports.File, { filename: 'app.log'});


var nodeEnv = process.env.NODE_ENV;
var port = process.env.PORT || 3000;
var config = nodeEnv === 'PROD'? require('./webpack.config.prod') : require('./webpack.config.dev');


var app = express();
var compiler = webpack(config);

app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.log('Bad JSON');
    next();
  }
});

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static(path.join(__dirname, '/public')));


app.use('/rsvp',require('./src/routes/rsvpRoute'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.server = http.createServer(app);
global.io = require('socket.io')(app.server);

app.server.listen(port, '0.0.0.0', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${port}`);
});

module.exports = app;
