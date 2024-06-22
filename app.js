var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var sequelize = require('./models').sequelize;
var SequelizeStore = require('connect-session-sequelize')(session.Store);

var adminRouter = require('./routes/admin.route');
var mhsRouter = require('./routes/mhs.route');
var umumRouter = require('./routes/umum.route');
var authRouter = require('./routes/auth.route');
var indexRouter = require('./routes/index');

var app = express();

var sessionStore = new SequelizeStore({
  db: sequelize,
  tableName: 'sessions', 
  checkExpirationInterval: 15 * 60 * 1000,
  expiration: 24 * 60 * 60 * 1000
});

app.use(session({
  secret: 'pentagon',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));




sequelize.sync()


app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set("views", [
  path.join(__dirname, "/views/admin"),
  path.join(__dirname, "/views/relawan"),
  path.join(__dirname, "/views"),
]);

app.use('/admin', adminRouter);
app.use('/user', mhsRouter);
app.use('/user', umumRouter);
app.use('/auth', authRouter);
app.use('/', indexRouter);

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
