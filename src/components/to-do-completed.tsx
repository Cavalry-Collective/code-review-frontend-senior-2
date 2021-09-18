import React from 'react';

import CompletedTreeList from './common/completed-tree-list';

const ToDoCompleted:React.FC<{completedTodoList:any[]}> = ({ completedTodoList }) => (
  <>
    {
      !!completedTodoList.length
        && (
        <div>
          <h2 className="todo-title">Completed</h2>
          <CompletedTreeList treeData={completedTodoList} />
        </div>
        )
    }

  </>
);

export default ToDoCompleted;
