import { useState } from "react";
import useHabitStore from "../store/store";

export default function AddHabiter(){
    const addHabit = useHabitStore(s => s.addHabit)
    const [names ,setNames] = useState('');
    const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly'>('daily');
    const submitFun = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addHabit(names.trim(), frequency);
        setNames("");
        setFrequency("daily");
        console.log("Habit Added");
    }
    return (
        <form onSubmit={submitFun} className="border mt-3 p-4 rounded-lg w-full max-w-md">
            <h1 className="text-3xl text-center">Add Habit</h1>
            <div className=" flex flex-col gap-3.5 mt-8 p-2.5">
               <div className="">
                 <label className="text-xl" htmlFor="habitName">Habit Name : </label>
                <input type="text" id="habitName" className="border rounded px-2 py-1" value={names} onChange={(e) => setNames(e.target.value)} />
               </div>
               <div className="">
                 <label className="text-xl" htmlFor="habitFrequency">Habit Frequency : </label>
                <select id="habitFrequency"
                className="border rounded px-2 py-1" value={frequency} onChange={(e) => setFrequency(e.target.value as 'daily' | 'weekly' | 'monthly')}>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                </select>
               </div>
               <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">Add Habit</button>
            </div>
        </form>
    )
}