import Image from "next/image";
import useHabitStore from "./store/store";


export default function Home() {
  const store = useHabitStore();
  console.log(store);
 return(
  <div className="flex flex-col items-center justify-center min-h-screen py-2">
   <h1 className="text-4xl font-bold">Start page</h1>
   </div>
 )
}
