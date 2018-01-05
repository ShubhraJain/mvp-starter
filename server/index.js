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
      res.status(200).json(data);
    }
  });
});

app.post('/delete', function(req, res) {
  tasks.deleteTask(req.body.task, function(err, data) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(data);
    }
  });
});

app.post('/updateTask', function(req, res) {
  tasks.updateTask(req.body.task, req.body.newTask, function(err, data) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(data);
    }
  });
});

app.post('/updateStatus', function(req, res) {
  tasks.updateStatus(req.body, function(err, data) {
    if(err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(data);
    }
  });

})

app.post('/add', function(req, res) {
  tasks.addTask(req.body, function(err, data) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(data);
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
