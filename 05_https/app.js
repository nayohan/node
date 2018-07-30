//How To Run
//sudo su
//run forever start -l /home/jovyan/work/node/05_https/a.log -a app.js
//tail -f a.log 

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);

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

//run webserver
var http = require('http')
var https = require('https')
var fs = require('fs')
                 
var options = {  
    key: fs.readFileSync('./key/key.pem'),
    cert: fs.readFileSync('./key/cert.pem')
};

var port1 = 8001;  
var port2 = 443;

http.createServer(app).listen(port1, function(){  
  console.log("Http server listening on port " + port1);
});

https.createServer(options, app).listen(port2, function(){  
  console.log("Https server listening on port " + port2);
});