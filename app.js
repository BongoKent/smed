var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const i18n = require('i18n');
i18n.configure({
   locales: ['pl', 'en'], 
   directory: path.join(__dirname, 'locales'), 
   objectNotation: true, 
   defaultLocale: "en",
   cookie: 'acme-hr-lang',
});

const indexRouter = require('./routes/index');
const docRouter = require('./routes/docRoute');
const visitRouter = require('./routes/visitRouter');
const patientRouter = require('./routes/patientRouter');
const medicalServiceRouter = require('./routes/medicalServiceRouter')
const realizationRouter = require('./routes/realizationRouter')

const docApiRouter = require('./routes/api/DoctorApiRoute');
const session = require('express-session');
const authUtils = require('./util/authUtils')

var app = express();
app.use(cookieParser('secret'));
app.use((req, res, next) => {
  if(!res.locals.lang) {
      const currentLang = req.cookies['acme-hr-lang'];
      res.locals.lang = currentLang;
  }
  next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(i18n.init);
app.use(session({
  secret: 'password',
  resave: false
}))
app.use((req, res, next) => {
  const loggedUser = req.session.loggedUser;
  const isAdmin = req.session.isAdmin;
  res.locals.isAdmin = isAdmin;
  res.locals.loggedUser = loggedUser;
  if (!res.locals.loginError) {
    res.locals.loginError = undefined;
  }
  next();
})
app.use('/', indexRouter);
app.use('/realizations',authUtils.permitAuthenticatedUser,realizationRouter)
app.use('/medicalService',authUtils.permitAuthenticatedUser,medicalServiceRouter)
app.use('/doctors',authUtils.permitAuthenticatedUser,docRouter);
app.use('/visits',authUtils.permitAuthenticatedUser,visitRouter);
app.use('/patients',authUtils.permitAuthenticatedUser,patientRouter);
app.use('/api/doctors',docApiRouter);
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
