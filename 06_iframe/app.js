//forever start -w -l /home/jovyan/work/node/06_iframe/z.log -a app.js
//tail -f z.log

//iframe 사용, 클라이언트에서 post로 link를 받아 iframe.src에 넣어 사이트 보여줌,
//link를 cheerio와 request로 다운로드
//파싱후 엘리먼트 div로 보여줌.

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

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

var https= require('https')
var fs = require('fs')

var options = {
    key: fs.readFileSync('./key/key.pem'),
    cert: fs.readFileSync('./key/cert.pem')
};

https.createServer(options, app).listen(443, function(){
    console.log('https server listening on port 443');
});