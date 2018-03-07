var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');


var book = require('./routes/book');
var app = express();
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
//mongoose.connect('put ur own mongodb')
  // .then(() =>  console.log('connection succesful'))
   //.catch((err) => console.error(err));
mongoose.connect('mongodb://gobotlog:iQydElBfHchbTPoX6sPFHLlSXRoJNld5pKmznbLpKfrjAIkvgqBU9H9s60FNeKvlTWaWBtU8wcgIn3nLXJ6x8w%3D%3D@gobotlog.documents.azure.com:10255/gobotlog?ssl=true&replicaSet=globaldb')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/books', express.static(path.join(__dirname, 'dist')));
app.use('/book', book);
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
  res.render('error');
});
module.exports = app;
