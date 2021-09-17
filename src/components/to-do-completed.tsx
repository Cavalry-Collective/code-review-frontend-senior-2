import React from 'react';
import { Empty } from 'antd';
import TreeList from './common/tree-list';

const ToDoCompleted:React.FC<{completedTodoList:any[]}> = ({ completedTodoList }) => (
  <div>
    <h2 className="todo-title">Completed</h2>
    {
      completedTodoList.length
        ? <TreeList treeData={completedTodoList} />
        : <Empty description={false} />
    }

  </div>
);

export default ToDoCompleted;
