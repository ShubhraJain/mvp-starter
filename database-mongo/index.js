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
  state: Boolean,
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
  Task.create(task, function(err, task) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, task);
    }
  });
};

var updateTask = function(task, callback) {
  entry = {
    task: task
  }
  Task.findOneAndUpdate({task: task}, entry, {upsert: true, new: true}, function(err, result) {
    if (err) {
      console.log('Error while updating the document', err);
    }
  });
};

var deleteTask = function(callback) {
  Task.remove({task: task}, function(err, result) {
    if (err) {
      console.log('Error while removing a document', err);
    }
  });
};

module.exports.selectAll = selectAll;
module.exports.addTask = addTask;
module.exports.updateTask = updateTask;
module.exports.delete = deleteTask;