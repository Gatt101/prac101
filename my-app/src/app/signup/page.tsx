"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';


export default function singupPage(){
    const router = useRouter();
    const [user ,setUser] = React.useState({
        email: "",
        username: "",
        password: ""
    })

    const [buttonDisabled , setButtonDisabled] = React.useState(false);

    React.useEffect(() =>{
        if(user.email.length > 0 && user.username.length > 0 && user.password.length > 0){
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    },[user])
  const onSignup = async() => {
    console.log("User data:", user);
  }

    return (
        <div className='flex flex-col items-center justify-center min-h-screen p-4'>
            <h1 className="text-3xl font-bold">Signup Page</h1>
            <form action="" className="flex flex-col gap-4 mt-4 w-full max-w-sm">
               <label htmlFor="email">Email</label>
                <input type="text"
                id= "email"
                value={user.email}
                onChange={
                    (e) => setUser({...user,email: e.target.value})
                }
                placeholder="Enter your email"
                className="border border-gray-300 p-2 rounded" />

                <label htmlFor="username">Username</label>
                <input type="text"
                id="username"
                value={user.username}
                onChange={
                    (e) => setUser({...user,username: e.target.value})
                }
                placeholder="Enter a Username"
                className="border border-gray-300 p-2 rounded" />

                  <label htmlFor="password">Password</label>
                <input type="text"
                placeholder="Enter your password"
                id="password"
                value={user.password}
                onChange={
                    (e) => setUser({...user,password: e.target.value})
                }
                className="border border-gray-300 p-2 rounded"
                 />
                 <button type="button" onClick={onSignup} className="bg-blue-500 text-white p-2 rounded">
                    {buttonDisabled ? "no sign up" : "Signup"}
                 </button>
                 <Link href= "/login" className="text-blue-500 hover:underline">Already have an account? Login</Link>
            </form>
        </div>
    );
}