"use client";

import Link from "next/link";
import React from "react";


export default function loginPage(){
    const [user ,setUser] = React.useState({
        email: "",
        password: ""
    })
    const onLogin = async() => {
        console.log("User data:", user);
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-3xl font-bold">Login Page</h1>
            <form action="" className="flex flex-col gap-4 mt-4 w-full max-w-sm">
               <label htmlFor="email">Email</label>
                <input type="text"
                placeholder="Enter your email"
                value={user.email}
                onChange={
                    (e) => setUser({...user,email: e.target.value})
                }
                className="border border-gray-300 p-2 rounded" />
                  <label htmlFor="password">Password</label>
                <input type="text"
                placeholder="Enter your password"
                value={user.password}
                onChange={
                    (e) => setUser({...user,password: e.target.value})
                }
                className="border border-gray-300 p-2 rounded"
                 />
                 <button type="button" onClick={onLogin} className="bg-blue-500 text-white p-2 rounded">
                    Login
                 </button>
                 <Link href= "/signup" className="text-blue-500 hover:underline">Don't have an account? Signup</Link>
            </form>
        </div>
    );
}