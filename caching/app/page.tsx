'use client'
import AddHabit from "./components/AddHabit";
import DisplayHabit from "./components/DisplayHabit";
import useHabitStore from "./store/store";


export default function Home() {
  const store = useHabitStore();
  console.log(store);
 return(
  <div className="flex flex-col min-h-screen py-2 items-center m-4 gap-3.5">
    <h1 className="text-4xl font-bold">Habit Tracker</h1>
    <AddHabit />
    <DisplayHabit />
   </div>
 )
}
