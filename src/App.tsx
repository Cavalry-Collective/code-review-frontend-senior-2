import React from 'react';
import './App.css';
import Header from './components/header';
import ToDoBacklog from './components/to-do-backlog';
import ToDoCompleted from './components/to-do-completed';

function App() {
  return (
    <div className="App">
      <Header title="Multi-level Todo List" />
      <ToDoBacklog backlogTodoList={[]} />
      <ToDoCompleted completedTodoList={[]} />
    </div>
  );
}
export default App;
