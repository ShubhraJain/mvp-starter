import React from 'react';
import TodosList from './TodosList.jsx';
import CreateTodo from './CreateTodo.jsx';

const todos = [
  {
    task: 'Groceries',
    isCompleted: false
  },
  {
    task: 'Laundry',
    isCompleted: false
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

  render () {
    return (
      <div>
        <h1>React ToDos App</h1>
        <CreateTodo createTask={this.createTask.bind(this)}/>
        <TodosList 
          todos={this.state.todos}
        />
      </div>
    )
  }
}

export default App;