import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Empty } from 'antd';
import { DataNode } from 'rc-tree/lib/interface';
import TreeList from './common/tree-list';

const ToDoBacklog: React.FC<{ backlogTodoList: DataNode[] }> = ({ backlogTodoList }) => (
  <div>
    <h2>
      <span className="todo-title">
        To Do
      </span>
      <PlusOutlined />
    </h2>
    {
      backlogTodoList.length
        ? <TreeList treeData={backlogTodoList} />
        : <Empty description={false} />
    }
  </div>
);

export default ToDoBacklog;
