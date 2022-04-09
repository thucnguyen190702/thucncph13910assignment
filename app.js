var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var comicRouter = require('./routes/comics');
var apiComicRouter = require('./routes/api.comic');
var apiUser = require('./routes/api.user');


var app = express();

app.set('process.env.NODE_ENV','production');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json( {limit:'50mb'} ));
app.use(express.urlencoded({ extended: false , limit: '50mb'}));

app.use(session({
    secret: 'fksdfn24235bdInfsdHSNF3414',
    resave: true,
    saveUninitialized: true
}));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/comics', comicRouter);
app.use('/apiComic', apiComicRouter);
app.use('/apiUser', apiUser);


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
