var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var publicroute = require('./publicroute');
var direttore = require('./direttore/routes');
var tabellone = require('./tabellone/routes');
var collaboratore = require('./registrazione/routes');
var cronometro = require('./cronometro/routes');

var app = express();

//TODO sustemare collavoratore in registrazione

// view engine setup
//app.set('views', __dirname); //impostato nei singoli router
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/public', publicroute);
app.use('/direttore', direttore);
app.use('/tabellone', tabellone);
app.use('/collaboratore', collaboratore);
app.use('/cronometro', cronometro);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
  res.end();
});

module.exports = app;
