var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var taskSchema = mongoose.Schema({
  task: String,
  isCompleted: Boolean,
});

var Task = mongoose.model('Task', taskSchema);

var selectAll = function(callback) {
  Task.find({}, function(err, tasks) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, tasks);
    }
  });
};

var addTask = function(task, callback) {
  var newTask = new Task(task);
  newTask.save( function(err, result) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

var updateTask = function(task, callback) {
  Task.findOneAndUpdate({task: task}, entry, {upsert: true, new: true}, function(err, result) {
    if (err) {
      console.log('Error while updating the document', err);
    }
  });
};

var deleteTask = function(task, callback) {
  Task.remove({task: task}, function(err, result) {
    if (err) {
      console.log('Error while removing a document', err);
    }
  });
};

module.exports.selectAll = selectAll;
module.exports.addTask = addTask;
module.exports.updateTask = updateTask;
module.exports.deleteTask = deleteTask;