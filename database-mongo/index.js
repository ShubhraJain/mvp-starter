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
  Task.find({}, callback);
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

var updateTask = function(oldTask, newTask, callback) {
  var entry = {
    task: newTask
  };
  Task.findOneAndUpdate({task: oldTask}, entry, {upsert: true, new: true}, callback);
};

var updateStatus = function(task, callback) {
  Task.findOneAndUpdate({task: task.task}, task, {upsert: true}, callback);
};

var deleteTask = function(task, callback) {
  Task.remove({task: task}, callback);
};

module.exports.selectAll = selectAll;
module.exports.addTask = addTask;
module.exports.updateTask = updateTask;
module.exports.deleteTask = deleteTask;
module.exports.updateStatus = updateStatus;