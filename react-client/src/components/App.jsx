import React from 'react';
import TodosList from './TodosList.jsx'

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

  render () {
    return (
      <div>
        <h1>React ToDos App</h1>
        <TodosList todos={this.state.todos}/>
      </div>
    )
  }
}

export default App;