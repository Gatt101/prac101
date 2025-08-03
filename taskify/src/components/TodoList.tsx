import React from 'react';

import SingleTodo from './SingleTodo';
import type { Todo } from '../model/model';

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
  const activeTodos = todos.filter(todo => !todo.isCompleted);
  const completedTodos = todos.filter(todo => todo.isCompleted);
  
  return (
    <div className="w-full flex flex-col md:flex-row gap-6">
      {/* Active Tasks */}
      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-bold text-white mb-4">Active Tasks</h2>
        <div className="flex flex-col">
          {activeTodos.length ? (
            activeTodos.map((todo) => (
              <SingleTodo 
                todo={todo} 
                key={todo.id} 
                setTodos={setTodos} 
              />
            ))
          ) : (
            <p className="text-slate-300">No active tasks</p>
          )}
        </div>
      </div>

      {/* Completed Tasks */}
      <div className="w-full md:w-1/2">
        <h2 className="text-xl font-bold text-white mb-4">Completed Tasks</h2>
        <div className="flex flex-col">
          {completedTodos.length ? (
            completedTodos.map((todo) => (
              <SingleTodo 
                todo={todo} 
                key={todo.id} 
                setTodos={setTodos} 
              />
            ))
          ) : (
            <p className="text-slate-300">No completed tasks</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;