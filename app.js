var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var engines = require('consolidate');
var app = express();
const session = require('express-session');
const mustacheExpress = require('mustache-express');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'html');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.render('index');
});

app.get('/error', function(req, res){
  res.render('error');
});



module.exports = app;
