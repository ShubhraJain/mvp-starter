import React from 'react';
import TodosList from './TodosList.jsx';
import CreateTodo from './CreateTodo.jsx';
import _ from 'lodash';

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

  componentDidMount() {
    
  }

  createTask(task) {
    this.state.todos.push({
      task: task, 
      isCompleted: false
    })
    this.setState({
      todos: this.state.todos
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
  }

  render () {
    return (
      <div>
        <h1>React ToDos App</h1>
        <CreateTodo createTask={this.createTask.bind(this)}/>
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