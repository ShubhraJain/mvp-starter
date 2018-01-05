import React from 'react';

class CreateTodo extends React.Component {

  handleAdd(event) {
    event.preventDefault();
    var newTodo = this.refs.newTask.value;
    this.props.createTask(newTodo);
    this.refs.newTask.value = '';
  }

  render() {
    return (
      <form onSubmit={this.handleAdd.bind(this)}>
        <input type="text" placeholder="new todo..." ref="newTask" />
        <button>Add</button>
      </form>
    )
  }
}

export default CreateTodo;