import React from 'react'
import { MdDelete } from "react-icons/md";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { Todo } from '../model/model';
import { MdDone } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';
interface Props {
    todo: Todo;
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const SingleTodo: React.FC<Props> = ({ todo, setTodos }) => {
  return (
    <div className='flex items-center justify-between p-4 border-b border-slate-500 border-2 rounded-2xl mb-2 bg-slate-700 hover:bg-slate-600 transition-all duration-200'>
      <div className="flex gap-4  align-middle  justify-between w-full">
        <span className={`text-lg ${todo.isCompleted ? 'line-through text-slate-400' : 'text-white'}`}>{todo.task}</span>
       <div className=" flex items-center gap-2">
        <button className='text-blue-500 hover:text-blue-400 transition-all duration-200 ' onClick={
            () => { // Handle edit functionality here
                const newTask:Todo = { ...todo, task: 'New Task' };
                setTodos((prev) => prev.map((t) => (t.id === todo.id ? newTask : t)));
            }
        }>
            <AiFillEdit size={20} className='text-blue-500 hover:text-blue-400 transition-all duration-200' />
        </button>
        <button className='text-green-500 hover:text-green-400 transition-all duration-200 ' onClick={() => setTodos((prev) => prev.map((t) => t.id === todo.id ? { ...t, isCompleted: !t.isCompleted } : t))}>
          <MdDone size={20} />
        </button>
         <button className="text-red-500 hover:text-red-400 transition-all duration-200 " onClick={() => setTodos((prev) => prev.filter((t) => t.id !== todo.id))}>
          <MdDelete size={20} />
        </button>
       </div>
      </div>
    </div>
  )
}

export default SingleTodo