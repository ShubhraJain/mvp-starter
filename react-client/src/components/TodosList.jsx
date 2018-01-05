import React from 'react';
import TodosListHeader from './TodosListHeader.jsx';
import TodosListItem from './TodosListItem.jsx';
import _ from 'underscore';

class TodosList extends React.Component {
 
 renderItems() {

    const props = _.omit(this.props, 'todos')
    return this.props.todos.map((todo, index) => 
      <TodosListItem
        key={index}
        task={todo.task}
        isCompleted={todo.isCompleted}
        toggleTask={this.props.toggleTask}
        {...props}
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