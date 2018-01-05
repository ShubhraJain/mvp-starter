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

  renderActionSection() {
    if (this.state.isEditing) {
      return (
        <td>
          <button>Save</button>
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

  render() {
    return (
      <tr>
        <td>{this.props.task}</td>
        {this.renderActionSection()}
      </tr>
    )
  }
}

export default TodosListItem;