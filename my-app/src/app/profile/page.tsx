"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function Profile() {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [profile, setProfile] = React.useState("nothing");

    const fetchProfile = async () => {
            try {
                const response = await axios.get('/api/users/me');
                setProfile(response.data.data._id);
                console.log("Profile Response:", response.data);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };
        // // // Send verification email
        //     await sendEmail({
        //       email: user.email,
        //       emailType: "VERIFY",
        //       userId: user._id.toString(), // ✅ ensure it's a string
        //     });

   const changePassword = async () => {
        try {
           const response = await axios.get('/api/users/changepassword');
            console.log("Change Password Response:", response.data);
            toast.success("Password changed successfully!");
        } catch (error) {
            console.error("Error changing password:", error);
            toast.error("Failed to change password");
        }
   }



    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-3xl font-bold">Profile Page</h1>
            <p className="mt-4">Welcome to your profile!</p>
            <div className=" flex flex-col gap-4 mt-4 w-full max-w-sm">
                <button className="mt-4 bg-red-500 text-white py-2 px-4 rounded" 
            onClick={
                async () => {
                    try {
                        setLoading(true);
                        const response = await axios.get('/api/users/logout');
                        console.log("Logout Response:", response.data);
                        toast.success("Logout successful!");
                        router.push('/login');
                    } catch (err) {
                        toast.error("Logout failed.");
                    } finally {
                        setLoading(false);
                    }
                }
            }>
 <span className=" text-amber-50">{loading ? "Logging out..." : "Logout"}</span>
                </button>
                <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded" 
                onClick={fetchProfile}>
                    Get Profile
                </button>
                <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded" 
                onClick={changePassword}>
                    Change Password
                </button>
                <span className="text-amber-50">
                    {profile === "nothing" ? "No profile data" : 
                    <Link className='text-blue-500 hover:underline' href={`/profile/${profile}`}>View Profile</Link>}
                </span>    
            </div>
        </div>
    );
}
