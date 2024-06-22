var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var mahasiswaRouter = require('./routes/mahasiswa');
var authRouter = require('./routes/auth');
var adminRouter = require('./routes/admin');
var pengajuanRouter = require('./routes/pengajuan');
var session = require('express-session');

var app = express();

// Session middleware
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 360000 }
}));

// view engine setup
app.set('views', [
  path.join(__dirname, 'views/User'),
  path.join(__dirname, 'views/Admin'),
  path.join(__dirname, 'views'),
]);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/node_modules/preline/dist')));

app.use('/', indexRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/', mahasiswaRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/admin', pengajuanRouter)

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
