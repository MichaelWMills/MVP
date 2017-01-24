var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 8000;


mongoose.connect('mongodb://localhost/db');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
  console.log('Successfully connected to DB');
});

var rocketSchema = mongoose.Schema({
  model: String,
  emptyMass: Number,
  fullMass: Number,
  engineisp: Number,
  deltav: Number
});

var Rocket = mongoose.model('Rocket', rocketSchema);

app.use(express.static('./client'));
app.use(bodyParser());

app.listen(port, function() {
  console.log('Server connected on ' + port);
});

app.post('/rocketList', function(req, res) {
  var rocket = new Rocket({
    model: req.body.model,
    emptyMass: req.body.emptyMass,
    fullMass: req.body.fullMass,
    engineisp: req.body.engine,
    deltav: req.body.deltav
  });

  rocket.save(function(err) {
    if(err){
      throw err;
    } else {
      console.log('rocket saved successfully');
    }
  });
});

app.get('/rocketList', function(req, res) {
  Rocket.find({}, function(err, rockets) {
    if (err){
      throw err;
    } else {
      res.send(rockets);
    }
  });
});