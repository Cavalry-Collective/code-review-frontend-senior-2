import React, { useContext } from 'react';
import { FormOutlined, PlusOutlined } from '@ant-design/icons';

import {
  Button, Space,
} from 'antd';
import moment from 'moment';
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
    <div className="item-wrap">
      <div className="title-wrap">
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
        </Space>

      </div>
      {nodeData.date && (
      <div className="date-wrap">
        { moment(nodeData.date).isBefore(moment()) && (
        <Button type="primary" danger size="small" style={{ marginRight: '10px' }}>
          Overdue
        </Button>
        )}
        { `Due ${moment(nodeData.date).format('YYYY-MM-DD')}` }
      </div>
      )}

    </div>
  );
};

export default TreeTitle;
