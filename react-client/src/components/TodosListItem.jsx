import React from 'react';

class TodosListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false
    }
  }

  handleEditClick() {
    this.setState({
      isEditing: true
    })
  }

  handleCancelClick() {
    this.setState({
      isEditing: false
    })
  }

  handleSaveClick(event) {
    event.preventDefault();
    const oldTask = this.props.task;
    const newTask = this.refs.editInput.value;
    this.props.saveTask(oldTask, newTask);
    this.setState({
      isEditing: false
    })
  }

  renderActionSection() {
    if (this.state.isEditing) {
      return (
        <td>
          <button onClick={this.handleSaveClick.bind(this)}>Save</button>
          <button onClick={this.handleCancelClick.bind(this)}>Cancel</button>
        </td>
      )
    }
    return (
      <td>
        <button onClick={this.handleEditClick.bind(this)}>Edit</button>
        <button>Delete</button>
      </td>
    )
  }

  renderTaskSection() {
    const {task, isCompleted} = this.props;

    const taskStyle = {
      color: isCompleted ? 'green' : 'red',
      cursor: 'pointer'
    }

    if (this.state.isEditing) {
      return (
        <td>
          <form onSubmit={this.handleSaveClick.bind(this)}>
            <input type="text" defaultValue={task} ref="editInput"/>
          </form>
        </td>
      )
    }
    return (
      <td style={taskStyle}
          onClick={this.props.toggleTask.bind(this, task)}
      >
        {task}
      </td>
    )
  }

  render() {
    return (
      <tr>
        {this.renderTaskSection()}
        {this.renderActionSection()}
      </tr>
    )
  }
}

export default TodosListItem;