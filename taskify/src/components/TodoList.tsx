import React from 'react'
import type { Todo } from '../model/model';
import SingleTodo from './SingleTodo';
interface Props{
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
  return (
    <div className="w-full flex-1 p-5">
      {todos.map((todo) => (
        <SingleTodo key={todo.id} todo={todo} setTodos={setTodos} />
      ))}
    </div>
  )
}

export default TodoList