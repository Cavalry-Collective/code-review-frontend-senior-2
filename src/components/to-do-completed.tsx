import React from 'react';
import { Empty } from 'antd';

const ToDoCompleted:React.FC<{completedTodoList:any[]}> = ({ completedTodoList }) => (
  <div>
    <h2 className="todo-title">Completed</h2>
    {completedTodoList.length ? <div>tree</div> : <Empty description={false} />}

  </div>
);

export default ToDoCompleted;
