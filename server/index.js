var express = require('express');
var bodyParser = require('body-parser');
var tasks = require('../database-mongo');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/tasks', function (req, res) {
  tasks.selectAll(function(err, data) {
    if(err) {
      res.status(500);
    } else {
      console.log('inside server/index.js');
      res.status(200).json(data);
    }
  });
});

app.post('/delete', function(req, res) {
  console.log(req);
  // tasks.deleteTask()
});

app.post('/update', function(req, res) {

});

app.post('/add', function(req, res) {
  console.log(req.body);
  tasks.addTask(req.body, function(err, data) {
    if (err) {
      console.log('error adding task: ',err)
      res.status(500).send(err);
    } else {
      res.status(200).json(data);
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
