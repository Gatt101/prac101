"use client";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Link from "next/link";


export default function VerifyEmailPage() {
    
const[error, setError] = useState(false);
const[token, setToken] = useState("");
const[verified, setVerified] = useState(false);

const verifyUserEmail = async () =>{
    try {
        await axios.post("/api/users/verifyemail", { token });
        setVerified(true);
        
    } catch (error) {
        console.error("Error verifying user email:", error);
        setError(true);
    }
}

 
useEffect(() => {
 const urlToken:string = window.location.search.split("=")[1];
    setToken(urlToken);
}, []);

useEffect(() => {
     if(token.length > 0) {
        verifyUserEmail();
        }
},[token]);


  return (
    <div>
        <h1 className="text-3xl font-bold">
            {verified ? "Email Verified Successfully!" : "Verifying Email..."}
        </h1>
        {error && <p className="text-red-500">Error verifying email. Please try again.</p>}
        {!verified && !error && <p>Please wait while we verify your email...</p>}
        <Link href="/login" className="text-blue-500 hover:underline mt-4">
            Go to Login
        </Link>
    </div>
  );
}
