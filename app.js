var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

// default endpoint
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// custom endpoint
const authRouter = require('./app/Auth/router');
const userRouter = require('./app/User/router');

var app = express();
const URL = `/api/v1`;
// app.use(cors());  // default cors
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// default route
app.use('/', indexRouter);
app.use('/users', usersRouter);

// custom route
app.use(`${URL}/auth`, authRouter);
app.use(`${URL}/user`, userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
