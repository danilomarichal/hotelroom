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


/*
app.use(session({
  secret: 'HABITACION',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
*/


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

//I LIKE MY ROUTES HERE :)
app.get('/', function(req, res){
  res.render('index');
});
app.get('/error', function(req, res){
  res.render('error');
});

app.get('/signup', function(req, res){
res.render('signup');
});

app.get('/login', function(req, res){
  res.render('login')
})

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
res.redirect("/login");
});


//COMPARES AND GETS USER'S INFO FROM DB AND SENDS IT TO USERS PAGE
app.post('/login', function(req, res){
let email = req.body.email;
var pass = req.body.password;
User.findOne({email:email, password:pass})
.then(info =>{
  var logged={
      _id:info.id,
      name: info.firstname,
      lastname: info.lastname,
      age: info.age,
  }
res.render('user/index',logged)
});
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


/*
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
*/
module.exports = app;
