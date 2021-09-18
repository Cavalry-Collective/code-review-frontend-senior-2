import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import moment from 'moment';
import {
  DatePicker, Input, message, Modal,
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
    setTitle(nodeData.title || '');
    setDate(nodeData.date ? moment(nodeData.date) : null);
  };

  useEffect(() => {
    isModalVisible && dataFormat();
  }, [isModalVisible]);

  const handleOk = () => {
    if (!title) {
      message.warning('请输入任务名');
      return;
    }

    const childrenNode: ITreeData = {
      key: nanoid(),
      ...nodeData,
      title,
      date: date ? moment(date).format() : null,
    };
    setIsModalVisible(false);
    onOk(childrenNode);
  };

  const handleClick = (visible: boolean) => () => setIsModalVisible(visible);

  return (
    <>
      <span onClick={() => setIsModalVisible(true)}>
        {children}
      </span>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleClick(false)}
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

    </>
  );
};

export default ShowComModal;
