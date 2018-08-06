var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

//WebSocket
var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function (req, res) {
  console.log('Received request for ' + req.url);
  res.writeHead(404);
  res.end();
});

server.listen(8000, function () {
  console.log('Server is listening on port 8000');
});

wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false
});

wsServer.on('request', function (request) {
  var connection = request.accept('example-echo', request.origin);
  connection.on('message', function (message) {
    if (message.type === 'utf8') {
      console.log('Received message: ' + message.utf8Data);
      connection.sendUTF(message.utf8Data);
    }
    else if (message.type === 'binary') {
      connection.sendBytes(message.binaryData);
    }

    connection.on('close', function (reasonCode, description) {
      console.log('Peer ' + connection.remoteAddress + ' disconnected.');
    });
  });
});
