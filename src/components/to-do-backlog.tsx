import React, { useContext } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Empty } from 'antd';
import { nanoid } from 'nanoid';
import TreeList from './common/tree-list';
import { ITreeData } from './componnts';
import { AppContext } from '../App';
import ShowComModal from './common/show-com-modal';

const ToDoBacklog: React.FC<{ backlogTodoList: ITreeData[] }> = ({ backlogTodoList }) => {
  const { renderDom }: any = useContext(AppContext);

  /**
   * 添加节点
   */
  const addNode = (data: ITreeData) => {
    backlogTodoList.push(data);
    renderDom();
  };

  return (
    <div>
      <h2>
        <span className="todo-title">
          To Do
        </span>
        <ShowComModal onOk={addNode}>
          <PlusOutlined />
        </ShowComModal>
      </h2>
      {
        backlogTodoList.length
          ? <TreeList treeData={backlogTodoList} />
          : <Empty description={false} />
      }
    </div>
  );
};

export default ToDoBacklog;
