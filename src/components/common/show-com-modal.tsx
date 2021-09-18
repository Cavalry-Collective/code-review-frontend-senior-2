import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import moment from 'moment';
import {
  Button, DatePicker, Input, Modal, Space,
} from 'antd';
import { ITreeData } from '../componnts';

interface IProps{
  onOk: (data:any)=>void;
  // eslint-disable-next-line react/require-default-props
  nodeData?:ITreeData
}

const ShowComModal:React.FC<IProps> = ({ onOk, nodeData = {}, children }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState<any>('');
  const [date, setDate] = useState<any>(null);

  /**
   * 数据格式化（清空）
   */
  const dataFormat = () => {
    console.log('----date', nodeData.date);
    setTitle(nodeData.title || '');
    setDate(nodeData.date ? moment(nodeData.date) : null);
  };

  useEffect(() => {
    isModalVisible && dataFormat();
  }, [isModalVisible]);

  const handleOk = () => {
    const childrenNode: ITreeData = {
      key: nanoid(),
      ...nodeData,
      title,
    };
    date && (childrenNode.date = moment(date).format());
    setIsModalVisible(false);
    onOk(childrenNode);
  };

  return (
    <Space>

      <Button type="link" onClick={() => setIsModalVisible(true)}>
        {children}
      </Button>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Input
          placeholder="任务名"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <DatePicker
          placeholder="截止日期"
          style={{ width: '100%', marginTop: '10px' }}
          onChange={setDate}
          value={date}
        />
      </Modal>
    </Space>

  );
};

export default ShowComModal;
