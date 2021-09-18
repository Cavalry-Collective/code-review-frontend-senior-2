import React, { useState } from 'react';
import { Tree } from 'antd';
import TreeTitle from './tree-title';
import { ITreeData } from '../componnts';

const TreeList:React.FC<{treeData: ITreeData[]}> = ({ treeData }) => {
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);

  const onCheck = (checkedKeysValue: any) => {
    console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };

  return (
    <Tree
      defaultExpandAll
      autoExpandParent
      onCheck={onCheck}
      checkedKeys={checkedKeys}
      checkable
      titleRender={(nodeData) => <TreeTitle nodeData={nodeData} />}
      treeData={treeData}
    />
  );
};

export default TreeList;
