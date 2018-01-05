import React from 'react';
import TodosList from './TodosList.jsx';
import CreateTodo from './CreateTodo.jsx';
import _ from 'lodash';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      todos: []
    }
  }

  componentWillMount() {
    this.getTasks();
  }

  createTask(task) {
    $.ajax({
      url: '/add',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        task: task,
        isCompleted: false
      }),
      success: () => {
        this.getTasks()
      },
      error: (err) => {
        console.log('error inside ajax call while creating task: ', err);
      }
    })

  }

  toggleTask(task) {
    const foundTodo = this.state.todos.find((todo) =>
      todo.task === task
    );
    foundTodo.isCompleted = !foundTodo.isCompleted;
  
    $.ajax({
      url: '/updateStatus',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        task: task,
        isCompleted: foundTodo.isCompleted
      }),
      success: () => {
        this.getTasks();
      },
      error: (err) => {
        console.log('Error while updating status of task', err);
      }
    });
  }

  saveTask(oldTask, newTask) {
    
    $.ajax({
      url: '/updateTask',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        task: oldTask,
        newTask: newTask
      }),
      success: () => {
        this.getTasks()
      },
      error: (err) => {
        console.log('Error while updating the task', err);
      }
    });
  }

  deleteTask(taskToBeDeleted) {
    
    $.ajax({
      url: '/delete',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        task: taskToBeDeleted
      }),
      success: () => {
        this.getTasks()
      },
      error: (err) => {
        console.log('error inside ajax call while deleting task: ', err);
      }
    });
  }

  getTasks() {
    $.ajax({
      url: '/tasks',
      method: 'GET',
      contentType: 'application/json',
      success: (data) => {
        this.setState({
          todos: data
        })
      },
      error: (err) => {
        console.log('error inside ajax call while getting data');
      }
    })
  }

  render () {
    return (
      <div>
        <h1>ToDos App</h1>
        <CreateTodo todos={this.state.todos}createTask={this.createTask.bind(this)}/>
        <TodosList 
          todos={this.state.todos}
          toggleTask={this.toggleTask.bind(this)}
          saveTask={this.saveTask.bind(this)}
          deleteTask={this.deleteTask.bind(this)}
        />
      </div>
    )
  }
}

export default App;