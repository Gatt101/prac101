"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";


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
                 <LabelInputContainer>
                 <Label htmlFor="email">Email</Label>
                <Input type="email"
                placeholder="Enter your email"
                value={user.email}
                onChange={
                    (e) => setUser({...user,email: e.target.value})
                }
                className="border border-gray-300 p-2 rounded" />
                 </LabelInputContainer>
                 <LabelInputContainer>
                 <Label htmlFor="password">Password</Label>
                <Input type="password"
                placeholder="Enter your password"
                value={user.password}
                onChange={
                    (e) => setUser({...user,password: e.target.value})
                }
                className="border border-gray-300 p-2 rounded"
                 />
                 </LabelInputContainer>
                 
                  
                 <button type="button" onClick={onLogin} className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                 >
                    {buttonDisabled ? "Logging in..." : "Login"}
                    <BottomGradient/>
                 </button>
                 <Link href= "/signup" className="text-blue-500 hover:underline">Don&apos;t have an account? Signup</Link>
              </div>
        </div>
    );
}


const LabelInputContainer = ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    return (
      <div className={cn("flex w-full flex-col space-y-2", className)}>
        {children}
      </div>
    );
  };
  const BottomGradient = () => {
    return (
      <>
        <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
        <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
      </>
    );
  };