var express = require('express');
var app = express();

var port = process.env.PORT || 8000;

app.use(express.static('./client'));

app.listen(port, function() {
  console.log('Server connected on ' + port);
});