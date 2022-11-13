var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dirAPIRouter = require("./routes/dirAPI");
var readFileRouter = require("./routes/readFile");
var moveInstantFileRouter = require("./routes/moveInstantFile");
var moveCompiledFileRouter = require("./routes/moveCompiledFile");
var moveClosedFileRouter = require("./routes/moveClosedFile");
var moveMissedFileRouter = require("./routes/moveMissedFile");
var closedAlertAPIRouter = require("./routes/closedAlertAPI");
var missedAlertAPIRouter = require("./routes/missedAlertAPI");
var dirChangeRouter = require("./routes/dirChange");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/dirAPI", dirAPIRouter);
app.use("/readFile", readFileRouter);
app.use("/moveInstantFile", moveInstantFileRouter);
app.use("/moveCompiledFile", moveCompiledFileRouter);
app.use("/moveClosedFile", moveClosedFileRouter);
app.use("/moveMissedFile", moveMissedFileRouter);
app.use("/closedAlertAPI", closedAlertAPIRouter);
app.use("/missedAlertAPI", missedAlertAPIRouter);
app.use("/dirChange", dirChangeRouter);

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
