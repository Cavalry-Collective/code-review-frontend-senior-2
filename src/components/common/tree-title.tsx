import React, { useContext } from 'react';
import { FormOutlined, PlusOutlined } from '@ant-design/icons';

import {
  Button, Col, Row, Space,
} from 'antd';
import { ITreeData } from '../componnts';
import { AppContext } from '../../App';
import ShowComModal from './show-com-modal';

const TreeTitle: React.FC<{ nodeData: ITreeData }> = ({ nodeData }) => {
  const { renderDom }: any = useContext(AppContext);

  /**
   * 添加子任务
   * @param data
   */
  const addChildren = (data: ITreeData) => {
    nodeData.children ? (nodeData.children.push(data))
      : (nodeData.children = [data]);
    renderDom();
  };

  /**
   * 编辑任务
   * @param data
   */
  const editNodeDate = (data:ITreeData) => {
    Object.assign(nodeData, data);
    renderDom();
  };

  return (
    <div>
      <Space>
        <span>
          {nodeData.title}
        </span>

        <ShowComModal onOk={editNodeDate} nodeData={nodeData}>
          <FormOutlined />
        </ShowComModal>
        <ShowComModal onOk={addChildren}>
          <PlusOutlined />
        </ShowComModal>

        <Button type="primary" danger size="small">
          Primary
        </Button>

        {nodeData.date}

      </Space>
    </div>
  );
};

export default TreeTitle;
