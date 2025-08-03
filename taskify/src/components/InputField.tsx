import React, { useRef } from 'react'
interface Props{
    todo : string;
    setTodo : React.Dispatch<React.SetStateAction<string>>,
    handleAdd : (e: React.FormEvent) => void;
    
}
const InputField = ({todo , setTodo, handleAdd } : Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form className='relative flex w-[90%] items-center' onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
    }}>
      <input 
      ref={inputRef}
      value={todo}
      onChange={
        (e) => {
            setTodo(e.target.value)
        }

      }
        type="text" 
        name="task" 
        id="task" 
        placeholder="Enter a task" 
        className='w-full rounded-3xl py-3 px-6 text-lg border-none shadow-[inset_0_0_5px_grey] focus:shadow-[0_0_10px_1000px_rgba(0,0,0,0.5)] focus:outline-none transition-all duration-200' 
      />
      <button 
        className='absolute right-0 w-10 h-10 m-2 rounded-full border-none bg-primary text-white transition-all duration-200 shadow-md hover:bg-primaryHover active:scale-90 active:shadow-sm' 
        type="submit"     
      >
        Go
      </button>
    </form>
  )
}

export default InputField