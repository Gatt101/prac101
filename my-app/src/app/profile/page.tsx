"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface EnhanceResponse {
  message: string;
  data?: {
    id: string;
    enhancedBody: any;
    enhancedHeaders?: Record<string, string>;
    rationale?: string;
    responseStatus?: number;
    responseBody?: any;
  };
  error?: string;
}

export default function ProfilePage() {
    const router = useRouter();
  
  const [logoutLoading, setLogoutLoading] = useState<boolean>(false);
  const [profileId, setProfileId] = useState<string | null>(null);

 

  const onLogout = async () => {
    try {
      setLogoutLoading(true);
      await axios.get("/api/users/logout");
      toast.success("Logout successful!");
      router.push("/login");
    } catch (err) {
      toast.error("Logout failed.");
    } finally {
      setLogoutLoading(false);
    }
  };

    const fetchProfile = async () => {
            try {
      const response = await axios.get("/api/users/me");
      setProfileId(response.data?.data?._id ?? null);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

   const changePassword = async () => {
        try {
      await axios.get("/api/users/changepassword");
      toast.success("Password change email sent!");
        } catch (error) {
            console.error("Error changing password:", error);
            toast.error("Failed to change password");
        }
  };

    return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Context-Aware API Enhancer</h1>

      <div className="border rounded p-4 space-y-3">
        <div className="text-sm font-medium">Account actions</div>
        <div className="flex flex-wrap gap-2">
          <button
            className="bg-red-500 text-white px-3 py-2 rounded"
            onClick={onLogout}
            disabled={logoutLoading}
          >
            {logoutLoading ? "Logging out..." : "Logout"}
                </button>
          <button
            className="bg-blue-500 text-white px-3 py-2 rounded"
            onClick={fetchProfile}
          >
                    Get Profile
                </button>
          <button
            className="bg-green-600 text-white px-3 py-2 rounded"
            onClick={changePassword}
          >
                    Change Password
                </button>
        </div>
        <div className="text-sm">
          {profileId ? (
            <Link className="text-blue-600 underline" href={`/profile/${profileId}`}>
              View Profile
            </Link>
          ) : (
            <span>No profile loaded</span>
          )}
        </div>
      </div>
      </div>
    );
}