"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
 


export default function SignupPage(){
    const router = useRouter();
    const [user ,setUser] = React.useState({
        email: "",
        username: "",
        password: ""
    })

    const [buttonDisabled , setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() =>{
        if(user.email.trim().length > 0 && user.username.trim().length > 0 && user.password.trim().length > 0){
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    },[user])
  const onSignup = async() => {
    // console.log("User data:", user);
    try {
        const response  = await axios.post(
            "/api/users/signup",
            user
        )
        console.log("Response:", response.data);
        toast.success("Signup successful!");
        router.push("/login");
    } catch (error) {
        toast.error("Error during signup");
        console.error("Error during signup:", error);
    }
    finally {
        setLoading(false);

  }
}

    return (
        <div className='flex m-0 flex-col items-center justify-center min-h-screen p-4'>
            <h1 className="text-3xl font-bold">
                {loading ? "Signing up..." : "Signup"}
            </h1>
            <form action="" className="flex flex-col gap-4 mt-4 w-full max-w-sm">
               <LabelInputContainer>
               <Label htmlFor="email">Email</Label>
                <Input type="text"
                id= "email"
                value={user.email}
                onChange={
                    (e) => setUser({...user,email: e.target.value})
                }
                placeholder="Enter your email"
                className="border border-gray-300 p-2 rounded" />

               </LabelInputContainer>
                <LabelInputContainer>
                <Label htmlFor="username">Username</Label>
                <Input type="text"
                id="username"
                value={user.username}
                onChange={
                    (e) => setUser({...user,username: e.target.value})
                }
                placeholder="Enter a Username"
                className="border border-gray-300 p-2 rounded" />
                </LabelInputContainer>

                  <LabelInputContainer>
                  <Label htmlFor="password">Password</Label>
                <Input type="password"
                placeholder="Enter your password"
                id="password"
                value={user.password}
                onChange={
                    (e) => setUser({...user,password: e.target.value})
                }
                className="border border-gray-300 p-2 rounded"
                 />
                  </LabelInputContainer>
                  
                 <button type="button" onClick={onSignup} className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]">
                    {buttonDisabled ? "Sign up" : "Processing..."}
                    <BottomGradient />
                 </button>
                 <Link href= "/login" className="text-blue-500 hover:underline">Already have an account? Login</Link>
            </form>
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