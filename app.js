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


var mongodb = require('mongodb');
var mongoose = require('mongoose');

mongoose.connect('localhost:27017/hotelroom')
var Schema = mongoose.Schema;

var otherSchema = new Schema({
 firstname:String,
 lastname:String,
 age:Number,
 email:String,
 password:String
},{collection:'hotelroom'});

var User = mongoose.model("User", otherSchema);



app.get('/', function(req, res){
  res.render('index');
});
app.get('/error', function(req, res){
  res.render('error');
});

app.get('/signup', function(req, res){
res.render('signup');
});

app.get('/get-data', function(req, res, next){
User.find()
.then(function(data){
  var all = {
      items: data
    };
  res.render('users',all);
})
});


app.post('/signup', function(req,res,next){
var item ={
  firstname: req.body.name,
  lastname: req.body.last,
  age: req.body.age,
  email: req.body.email,
  password: req.body.password,
};
var person = new User(item);
person.save();
res.redirect("user",person);
});


/*
app.post('/update', function(req,res,next){

var id = req.body.id;

User.findById(id, function(err, doc){
  if(err){
    console.error("no entry")
  }
doc.firstName=req.body.name;
doc.lastName=req.body.last;
doc.age=req.body.age;
doc.email=req.body.email;
doc.password=req.body.password;
doc.save();
 })
});
*/

app.post('/delete', function(req, res, next){
  var id = req.body.id;
  UserDataSchema.findByIdAndRemove(id).exec();
res.send("deleted")
});


module.exports = app;
