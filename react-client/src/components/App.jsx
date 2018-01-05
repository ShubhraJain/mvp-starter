import React from 'react';
import TodosList from './TodosList.jsx';
import CreateTodo from './CreateTodo.jsx';
import _ from 'lodash';
import $ from 'jquery';

const todos = [
  {
    task: 'Groceries',
    isCompleted: false
  },
  {
    task: 'Laundry',
    isCompleted: true
  }
]

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      todos: todos
    }
  }

  componentWillMount() {
    this.getTasks();
  }

  createTask(task) {
    // this.state.todos.push({
    //   task: task, 
    //   isCompleted: false
    // });
    // this.setState({
    //   todos: this.state.todos
    // });
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
    this.setState({
      todos: this.state.todos
    });
  }

  saveTask(oldTask, newTask) {
    const foundTodo = this.state.todos.find((todo) => 
      todo.task === oldTask
    );
    foundTodo.task = newTask;
    this.setState({
      todos: this.state.todos
    });
  }

  deleteTask(taskToBeDeleted) {
    _.remove(this.state.todos, todo => 
      todo.task === taskToBeDeleted
    );
    this.setState({
      todos: this.state.todos
    });
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
        <h1>React ToDos App</h1>
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