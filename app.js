var createError = require('http-errors');
var path = require('path');
var logger = require('morgan');
const ejs = require('ejs');
var routes = require('./core/route/coreRouter');

var express = require('express');

var  app = express(),
  port = process.env.PORT || 3000,
  bodyParser = require('body-parser');



app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
ejs.delimiter = '?';

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', routes);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Content-Type', 'application/json');
  next();
});

app.use(function(req, res, next) {
  console.log("Inside 404 Handler");
    next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log("Inside Error Handler");
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

 //importing route
//routes(app); //register the route

app.listen(port);

console.log('Pay API RESTful API server started on: ' + port);

module.exports = app;
