import React from 'react';

class CreateTodo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      error: null
    }
  }

  renderError() {
    if (!this.state.error) {
      return null
    }

    return (
      <div style={{color: 'red'}}>
        {this.state.error}
      </div>
    );
  }

  handleAdd(event) {
    event.preventDefault();
    var newTodo = this.refs.newTask.value;

    const validateInput = this.validateInput(newTodo);

    if (validateInput) {
      this.setState({
        error: validateInput
      });
      return;
    }

    this.setState({
      error: null
    });

    this.props.createTask(newTodo);
    this.refs.newTask.value = '';
  }

  validateInput(task) {
    if (!task) {
      this.refs.newTask.value = '';
      return 'Please enter a task';
    } else if(_.find(this.props.todos, todo => todo.task === task)) {
      this.refs.newTask.value = '';
      return 'Task already exist';
    } else {
      return null;
    }
  }

  render() {
    return (
      <form onSubmit={this.handleAdd.bind(this)}>
        <input type="text" placeholder="new todo..." ref="newTask" />
        <button>Add</button>
        {this.renderError()}
      </form>
    )
  }
}

export default CreateTodo;