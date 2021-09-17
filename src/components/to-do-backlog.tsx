import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Empty } from 'antd';

export interface IToDoInfo{
  name: string
  docs?:string
}

const ToDoBacklog :React.FC<{backlogTodoList: IToDoInfo[]}> = ({ backlogTodoList }) => (
  <div>
    <h2>
      <span className="todo-title">
        To Do
      </span>
      <PlusOutlined />
    </h2>
    {backlogTodoList.length ? <div>tree</div> : <Empty description={false} />}
  </div>
);

export default ToDoBacklog;
