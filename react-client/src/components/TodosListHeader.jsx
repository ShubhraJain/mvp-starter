import React from 'react';

class TodosListHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <thead>
        <tr>
          <th>Task</th>
          <th>Action</th>
        </tr>
      </thead>
    )
  }
}

export default TodosListHeader;