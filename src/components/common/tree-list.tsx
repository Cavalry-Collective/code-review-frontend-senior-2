import React, {
  useContext, useEffect, useState,
} from 'react';
import { Tree } from 'antd';
import TreeTitle from './tree-title';
import { ITreeData } from '../componnts';
import { AppContext } from '../../App';

const TreeList:React.FC<{treeData: ITreeData[]}> = ({ treeData }) => {
  const { checkedRender }: any = useContext(AppContext);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const allKeys:any = [];
  const handleAllKeys = (list: ITreeData[]) => {
    list.forEach((i) => {
      allKeys.push(i.key);
      i.children && handleAllKeys(i.children);
    });
  };

  useEffect(() => {
    handleAllKeys(treeData);
    const localKeys :any = localStorage.getItem('checkedKeysValue-undone') || '[]';
    const setKey = JSON.parse(localKeys).filter((i:string) => allKeys.includes(i));
    localStorage.setItem('checkedKeysValue-undone', JSON.stringify(setKey));
    setCheckedKeys(setKey);
  }, [treeData]);

  const onCheck = (checkedKeysValue: any) => {
    if (treeData.map((i) => i.key).some((i) => checkedKeysValue.includes(i))) {
      checkedRender(checkedKeysValue);
      setCheckedKeys([]);
    } else {
      setCheckedKeys(checkedKeysValue);
      localStorage.setItem('checkedKeysValue-undone', JSON.stringify(checkedKeysValue));
    }
  };

  return (
    <Tree
      defaultExpandAll
      onCheck={onCheck}
      checkedKeys={checkedKeys}
      checkable
      titleRender={(nodeData) => <TreeTitle nodeData={nodeData} />}
      treeData={treeData}
    />
  );
};

export default TreeList;
