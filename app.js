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

mongoose.connect('localhost:27017/hotelroom');
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


app.get('/user', function(req, res){
User.find()
.then(function(data){
  var all_updated = {
      items: data
    };
  res.render('update',all_updated);
})
});

//INSERTS DATA (users) IN MONGODB
app.post('/signup', function(req,res){
var item = {
  firstname: req.body.name,
  lastname: req.body.last,
  age: req.body.age,
  email: req.body.email,
  password: req.body.password,
};
var person = new User(item);
person.save();
res.send("user created!");
});


//GETS DATA FROM MONGODB
app.get('/get-data', function(req, res, next){
User.find()
.then(function(data){
  var all = {
      items: data
    };
  res.render('users',all);
})
});


//SHOWS SPECIFIC DATA FROM DB TABLE
app.get('/user/:id', function(req, res){
var id = req.params.id;
User.findById(id)
.then(data => {
    var one = {
      id:req.params.id,
      name: data.firstname,
      lastname: data.lastname,
      age: data.age,
      email:data.email,
      password:data.password
  };
res.render('show', one);
 });
});



app.put('/user/:id', function(req,res){
var id = req.params.id;
User.update(id, function(data){
data.email = req.body.email;
data.password = req.body.password;
data.save()
res.send('updated!')
})
});


app.delete('/user/:id', function(req, res){
  var id = req.params.id;
  User.findOneAndRemove(id, function(err) {
  if (err) throw err;
res.send("deleted")
});
})

module.exports = app;
