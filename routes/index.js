var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var mongoose = require(mongoose);
mongoose.connect('localhost:27017/hotelroom')
var Schema = mongoose.Schema;

var UserDataSchema = new Schema({
 firstName: {type:String, required:true},
 lastNameName: {type:String, required:true},
 age: {type:Number, required:true},
 email: {type:String, required:true},
 password: {type:String, required:true}
},{collection:'hotelroom'});

var User = mongoose.model("User", UserDataSchema);




router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/get-data', function(req, res, next){
User.find()
.then(function(doc){
  res.render('users',{items:doc});
})
});


router.post('/insert', function(req,res,next){
var item ={
  firstName:req.body.name,
  lastName:req.body.last,
  age:req.body.age,
  email:req.body.email,
  password:req.body.password
};
var data = new User(item);
data.save();
res.send("User signed up!")
});



router.post('/update', function(req,res,next){

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


router.post('/delete', function(req, res, next){
  var id = req.body.id;
  UserDataSchema.findByIdAndRemove(id).exec();
res.send("deleted")
});

module.exports = router;
