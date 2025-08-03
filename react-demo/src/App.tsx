import { Footer } from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

const App = () => {
  return(
    <div className="flex flex-col min-h-screen bg-slate-900">
      <Navbar />
      <main className="flex-grow">
        <Home />
      </main>
      <Footer />
    </div>
  )
}

export default App


// import React from 'react'
// import TimeGreeting from './components/TimeGreeting'

// function Helloworld() {
//   return <h1 className='text-5xl underline text-white'>Hello, World!</h1>
// }

// const App = () => {
//   return (
//     <div className='flex flex-col gap-10 items-center justify-center min-h-screen bg-slate-900'>
//       <button className='bg-blue-500 text-white px-4 py-2 rounded' onClick={ () => alert('Button clicked!')}>Click me </button>
//       <h1 className='text-5xl underline text-white'>App</h1>
//       <Helloworld />
//       <TimeGreeting timeOfDay="morning" />
//     </div>
//   )
// }

// export default App