"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";


export default function LoginPage(){
    const router = useRouter();

    const [loading, setLoading] = React.useState(false);
    const [buttonDisabled , setButtonDisabled] = React.useState(false);
    const [user ,setUser] = React.useState({
        email: "",
        password: ""
    })
 

    React.useEffect(() =>{
        if(user.email.trim().length > 0 && user.password.trim().length > 0){
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    },[user])

       const onLogin = async() => {
       try {
        setLoading(true);
        const response = await axios.post(
            "/api/users/login",
            user
        )
        console.log("Response:", response.data);
        toast.success("Login successful!");
        router.push("/profile");
       } catch (error) {
            console.error("Error during login:", error);
            toast.error("Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
        
       }
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-3xl font-bold">
                {loading ? "Logging in..." : "Login" }
            </h1>
              <div className="flex flex-col gap-4 mt-4 w-full max-w-sm">
                 <label htmlFor="email">Email</label>
                <input type="email"
                placeholder="Enter your email"
                value={user.email}
                onChange={
                    (e) => setUser({...user,email: e.target.value})
                }
                className="border border-gray-300 p-2 rounded" />
                  <label htmlFor="password">Password</label>
                <input type="password"
                placeholder="Enter your password"
                value={user.password}
                onChange={
                    (e) => setUser({...user,password: e.target.value})
                }
                className="border border-gray-300 p-2 rounded"
                 />
                 <button type="button" onClick={onLogin} className="bg-blue-500 text-white p-2 rounded">
                    {buttonDisabled ? "Logging in..." : "Login"}
                 </button>
                 <Link href= "/signup" className="text-blue-500 hover:underline">Don&apos;t have an account? Signup</Link>
              </div>
        </div>
    );
}