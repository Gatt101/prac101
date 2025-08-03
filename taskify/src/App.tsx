import React, { useState } from 'react'
import InputField from './components/InputField';
import type { Todo } from './model/model';
import TodoList from './components/TodoList';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  
  function handleAdd(): (e: React.FormEvent) => void {
    return (e) => {
      e.preventDefault();
      if (todo) {
        const newTodo: Todo = {
          id: Date.now(),
          task: todo,
          isCompleted: false
        };
        setTodos([...todos, newTodo]);
        setTodo("");
      }
    };
  }
  
  
  
  return (
    
    <div className='w-full min-h-screen flex flex-col items-center bg-slate-700 p-4 md:p-8'>
      <h1 className='uppercase text-4xl md:text-5xl my-8 text-white font-bold tracking-wider'>
        Taskify
      </h1>
      
      <div className="w-full max-w-4xl">
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd()} />
        
        <div className="mt-8 w-full">
          <TodoList todos={todos} setTodos={setTodos} />
        </div>
      </div>
    </div>
  )
}

export default App;