var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 8000;

//mongoose.connect('mongodb://localhost/db');
mongoose.connect('mongodb://heroku_f88v656k:g3e52am2q3bb4iraatdqgjmkdf@ds127949.mlab.com:27949/heroku_f88v656k');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
  console.log('Successfully connected to DB');
});

var rocketSchema = mongoose.Schema({
  model: String,
  drymass: Number,
  fullmass: Number,
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
  console.log(req.body);
  var rocket = new Rocket({
    model: req.body.model,
    drymass: req.body.drymass,
    fullmass: req.body.fullmass,
    engineisp: req.body.engineisp,
    deltav: req.body.deltav
  });

  rocket.save(function(err, rocket) {
    if(err){
      throw err;
    } else {
      console.log('rocket saved successfully');
    }
  })
  .then(function(rocket){
    res.send(rocket);
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

app.delete('/rocketList', function(req, res) {
  Rocket.remove({}, function(err) {
    console.log('History successfully deleted');
  })
  .then(function(rocket){
    res.send(rocket);
  });
});