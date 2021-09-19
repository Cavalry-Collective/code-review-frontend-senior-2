import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/header';
import ToDoBacklog from './components/to-do-backlog';
import ToDoCompleted from './components/to-do-completed';
import { ITreeData } from './components/componnts';

export const AppContext = React.createContext({});

function App() {
  const todoData = localStorage.getItem('todo-list');
  const data: ITreeData[] = todoData ? JSON.parse(todoData) : [];
  const [todoList, setTodoList] = useState<ITreeData[]>(data);
  const [backlogTreeData, setBacklogTreeData] = useState<ITreeData[]>([]);
  const [completedTreeData, setCompletedTreeData] = useState<ITreeData[]>([]);

  const renderDom = () => {
    const list: ITreeData[] = [...backlogTreeData, ...completedTreeData];
    localStorage.setItem('todo-list', JSON.stringify(list));
    setTodoList(list);
  };

  const checkedRender = (value?:string[]) => {
    const undoneList: ITreeData[] = [];
    const doneList :ITreeData[] = [];
    const checkedKeysValue = localStorage.getItem('checkedKeysValue-done') || '[]';
    const checkedList: any = JSON.parse(checkedKeysValue);
    if (value) {
      checkedList.push(...value);
    }
    todoList.forEach((i) => {
      if (checkedList.includes(i.key)) doneList.push(i);
      else undoneList.push(i);
    });
    !undoneList.length && localStorage.removeItem('checkedKeysValue-undone');
    setBacklogTreeData(undoneList);
    setCompletedTreeData(doneList);
  };
  //
  useEffect(() => {
    checkedRender();
  }, [todoList]);

  return (
    <div className="App">
      <AppContext.Provider value={{
        renderDom, checkedRender,
      }}
      >
        <Header title="Multi-level Todo List" />
        <ToDoBacklog backlogTodoList={backlogTreeData} />
        <ToDoCompleted completedTodoList={completedTreeData} />
      </AppContext.Provider>
    </div>
  );
}
export default App;
