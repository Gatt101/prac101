import React, { useState } from 'react';
import { MdDelete, MdDone } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';
import type { Todo } from '../model/model';

interface Props {
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({ todo, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<string>(todo.task);

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Prevent saving empty tasks
    if (editTask.trim() === '') {
      return;
    }
    setTodos((prev) =>
      prev.map((t) => (t.id === todo.id ? { ...t, task: editTask.trim() } : t))
    );
    setEdit(false);
  };

  const handleCancelEdit = () => {
    setEditTask(todo.task); // Reset to original task
    setEdit(false);
  };

  return (
    <form
      onSubmit={handleEditSubmit}
      className="flex items-center justify-between p-4 border-b border-slate-500 border-2 rounded-2xl mb-2 bg-slate-700 hover:bg-slate-600 transition-all duration-200"
    >
      <div className="flex gap-4 items-center justify-between w-full">
        {edit ? (
          <div className="flex gap-2 items-center w-full">
            <input
              type="text"
              value={editTask}
              onChange={(e) => setEditTask(e.target.value)}
              className="text-lg bg-slate-800 text-white border border-slate-500 rounded p-1 w-full"
              autoFocus
            />
            <button
              type="submit"
              className="text-green-500 hover:text-green-400 transition-all duration-200"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancelEdit}
              className="text-gray-500 hover:text-gray-400 transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            <span
              className={`text-lg ${
                todo.isCompleted ? 'line-through text-slate-400' : 'text-white'
              }`}
            >
              {todo.task}
            </span>
            <div className="flex items-center gap-2">
              <button
                className="text-blue-500 hover:text-blue-400 transition-all duration-200"
                onClick={() => {
                  if (!todo.isCompleted) {
                    setEdit(true);
                  }
                }}
                disabled={todo.isCompleted}
              >
                <AiFillEdit size={20} />
              </button>
              <button
                className="text-green-500 hover:text-green-400 transition-all duration-200"
                onClick={() =>
                  setTodos((prev) =>
                    prev.map((t) =>
                      t.id === todo.id ? { ...t, isCompleted: !t.isCompleted } : t
                    )
                  )
                }
              >
                <MdDone size={20} />
              </button>
              <button
                className="text-red-500 hover:text-red-400 transition-all duration-200"
                onClick={() => setTodos((prev) => prev.filter((t) => t.id !== todo.id))}
              >
                <MdDelete size={20} />
              </button>
            </div>
          </>
        )}
      </div>
    </form>
  );
};

export default SingleTodo;