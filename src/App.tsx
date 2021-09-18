import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/header';
import ToDoBacklog from './components/to-do-backlog';
import ToDoCompleted from './components/to-do-completed';
import { ITreeData } from './components/componnts';

export const AppContext = React.createContext({});

const treeList = [
  {
    title: '0-0',
    key: '0-0',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          { title: '0-0-0-0', key: '0-0-0-0' },
          { title: '0-0-0-1', key: '0-0-0-1' },
          { title: '0-0-0-2', key: '0-0-0-2' },
        ],
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          { title: '0-0-1-0', key: '0-0-1-0' },
          { title: '0-0-1-1', key: '0-0-1-1' },
          { title: '0-0-1-2', key: '0-0-1-2' },
        ],
      },
      {
        title: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: '0-1',
    key: '0-1',
    children: [
      { title: '0-1-0-0', key: '0-1-0-0' },
      { title: '0-1-0-1', key: '0-1-0-1' },
      { title: '0-1-0-2', key: '0-1-0-2' },
    ],
  },
  {
    title: '0-2',
    key: '0-2',
    // children: [
    //   {
    //     key: 'LqnbjySFIDn3ssxyvEzJn',
    //     title: 'test',
    //   },
    // ],
  },
];

function App() {
  const TO_DO_TREE_DATA = 'todo-list-treeData';
  const [treeData, setTreeData] = useState<ITreeData[]>([]);
  useEffect(() => {
    const todoData = localStorage.getItem(TO_DO_TREE_DATA);
    const data: ITreeData[] = todoData ? JSON.parse(todoData) : [];
    setTreeData(data);
  }, []);

  const renderDom = () => {
    localStorage.setItem(TO_DO_TREE_DATA, JSON.stringify(treeData));
    setTreeData([...treeData]);
  };

  return (
    <div className="App">
      <AppContext.Provider value={{
        renderDom,
      }}
      >

        <Header title="Multi-level Todo List" />
        <ToDoBacklog backlogTodoList={treeData} />
        {/* <ToDoCompleted completedTodoList={treeData} /> */}
      </AppContext.Provider>
    </div>
  );
}
export default App;
