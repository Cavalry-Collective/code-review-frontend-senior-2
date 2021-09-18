import React, { useContext, useEffect, useState } from 'react';
import { Tree } from 'antd';
import { ITreeData } from '../componnts';
import { AppContext } from '../../App';

const CompletedTreeList: React.FC<{treeData: ITreeData[]}> = ({ treeData }) => {
  const { checkedRender }: any = useContext(AppContext);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  useEffect(() => {
    const keys = treeData.map((i) => i.key);
    localStorage.setItem('checkedKeysValue-done', JSON.stringify(keys));
    setCheckedKeys(keys);
  }, [treeData]);

  const onCheck = (checkedKeysValue: any) => {
    localStorage.setItem('checkedKeysValue-done', JSON.stringify(checkedKeysValue));
    const localUndonekey = localStorage.getItem('checkedKeysValue-undone') || '[]';
    const keys = [...JSON.parse(localUndonekey), ...checkedKeysValue];
    localStorage.setItem('checkedKeysValue-undone', JSON.stringify(keys));

    checkedRender(checkedKeysValue);
    setCheckedKeys([]);
  };

  return (
    <>
      <Tree
        autoExpandParent
        defaultExpandAll
        onCheck={onCheck}
        checkable
        checkedKeys={checkedKeys}
        treeData={treeData}
      />
    </>
  );
};

export default CompletedTreeList;
