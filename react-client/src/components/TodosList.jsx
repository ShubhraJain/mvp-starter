import React from 'react';
import TodosListHeader from './TodosListHeader.jsx';
import TodosListItem from './TodosListItem.jsx';

class TodosList extends React.Component {
 
 renderItems() {

    return this.props.todos.map((todo, index) => 
      <TodosListItem
        key={index}
        task={todo.task}
        isCompleted={todo.isCompleted}
        toggleTask={this.props.toggleTask}
        saveTask={this.props.saveTask}
        deleteTask={this.props.deleteTask}
      />
    )
  }

  render() {
    return (
      <table>
        <TodosListHeader />
        <tbody>
          {this.renderItems()}
        </tbody>
      </table>
    )
  }
}

export default TodosList;