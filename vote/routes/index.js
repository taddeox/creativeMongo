var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/questions', { useMongoClient: true }); 

var questionSchema = mongoose.Schema({
Id: Number,
LeftVotes:{type: Number, default: 0},
RightVotes:{type: Number, default: 0},
});

var Question = mongoose.model("Question", questionSchema);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
console.log('Connected');
});

//Question.remove({},function(err){
// console.log("questions gone");
//});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/vote',function(req,res,next){
  Question.find(function(err,question){
  if(err){return err;}
  res.json(question);
});
});

router.post('/question', function(req, res, next) {
console.log("POST question route"); //[1]
var newQuestion = new Question(req.body); //[3]
console.log(newQuestion); //[3]
newQuestion.save(function(err, post) { //[4]
  if (err) return console.error(err);
  console.log(post);
  res.sendStatus(200);
});
});

router.post('/vote', function(req,res,next){
console.log(req.body);
var id = req.body.Id;
var side = req.body.Side;
Question.find({"Id": id},function(err,question){
console.log(question[0]);
if(err) {next(err);}
if(side == 1){question[0].LeftVotes += 1;}
if(side == 2){question[0].RightVotes +=1;}

question[0].save(function(err) {
  if(err){console.err('ERROR!');}
});
res.sendStatus(200);
});

});

module.exports = router;
