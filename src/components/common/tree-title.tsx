import React from 'react';
import { ITreeData } from '../componnts';

const TreeTitle: React.FC<{nodeData:ITreeData}> = ({ nodeData }) => {
  console.log('---', nodeData);
  return (
    <div>
      nodeData
    </div>
  );
};

export default TreeTitle;
