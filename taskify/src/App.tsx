import React, { useState } from 'react'
import InputField from './components/InputField';
import type { Todo } from './model/model';
import TodoList from './components/TodoList';

const App:React.FC = () => {
  const [todo , setTodo] = useState<string>("");
  const [todos,setTodos] = useState<Todo[]>([]);
  function handleAdd() : ( e: React.FormEvent ) => void {
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
  function handleDelete(id:number) :void {
  
      setTodos(todos.filter(todo => todo.id !== id));
  }
  return (
    <div className='w-full h-screen flex flex-col items-center bg-slate-600 border-rounded shadow-lg p-4'>
      <span className='uppercase text-4xl my-8 text-white z-10 text-center'>Taskify</span>
      <InputField todo = {todo} setTodo = {setTodo} handleAdd={handleAdd()}  />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  )
}

export default App;