import React from 'react';
import { Tree } from 'antd';
import TreeTitle from './tree-title';
import { ITreeData } from '../componnts';

const TreeList:React.FC<{treeData: ITreeData[]}> = ({ treeData }) => (
  <Tree
    titleRender={(nodeData) => <TreeTitle nodeData={nodeData} />}
    treeData={treeData}
  />
);

export default TreeList;
