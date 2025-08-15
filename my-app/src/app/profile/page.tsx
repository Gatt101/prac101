"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

interface User {
  _id: string;
  username: string;
  email: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UserStats {
  totalPapersViewed: number;
  totalSummariesGenerated: number;
  favoriteCategory: string;
  lastActiveDate: string;
  joinedDaysAgo: number;
}

export default function ProfilePage() {
  const router = useRouter();
  
  const [user, setUser] = useState<User | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/users/me");
      const userData = response.data.data;
      setUser(userData);
      
      // Generate some mock stats based on user data
      const joinDate = new Date(userData.createdAt);
      const now = new Date();
      const joinedDaysAgo = Math.floor((now.getTime() - joinDate.getTime()) / (1000 * 60 * 60 * 24));
      
      setUserStats({
        totalPapersViewed: Math.floor(Math.random() * 50) + 10,
        totalSummariesGenerated: Math.floor(Math.random() * 30) + 5,
        favoriteCategory: "Machine Learning",
        lastActiveDate: new Date().toISOString(),
        joinedDaysAgo
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      setError("Failed to load profile");
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const onLogout = async () => {
    try {
      setLogoutLoading(true);
      await axios.get("/api/users/logout");
      toast.success("Logout successful!");
      router.push("/login");
    } catch {
      toast.error("Logout failed.");
    } finally {
      setLogoutLoading(false);
    }
  };

  const changePassword = async () => {
    try {
      await axios.get("/api/users/changepassword");
      toast.success("Password change email sent!");
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Failed to send password change email");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="text-6xl mb-4">👤</div>
          <h1 className="text-2xl font-bold text-white mb-4">Profile Error</h1>
          <p className="text-gray-400 mb-6">{error || 'Unable to load profile'}</p>
          <Link 
            href="/login" 
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-colors"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-black">
      {/* Background elements */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[size:20px_20px] opacity-20" />
      
      <div className="relative max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent mb-4">
            Your Profile
          </h1>
          <p className="text-gray-400 text-lg">
            Manage your account and view your research activity
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Card */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700/50 rounded-2xl shadow-xl p-8 backdrop-blur-sm"
            >
              {/* Profile Header */}
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl font-bold text-white">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">{user.username}</h2>
                  <p className="text-gray-400 text-lg">{user.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className={`w-3 h-3 rounded-full ${user.isVerified ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className={`text-sm ${user.isVerified ? 'text-green-400' : 'text-red-400'}`}>
                      {user.isVerified ? 'Verified Account' : 'Unverified Account'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Account Details</h3>
                  <div className="space-y-2">
                    <div>
                      <span className="text-gray-400 text-sm">User ID:</span>
                      <p className="text-gray-300 font-mono text-sm">{user._id}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Joined:</span>
                      <p className="text-gray-300">{new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Last Updated:</span>
                      <p className="text-gray-300">{new Date(user.updatedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</p>
                    </div>
                  </div>
                </div>

                {userStats && (
                  <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Activity Stats</h3>
                    <div className="space-y-2">
                      <div>
                        <span className="text-gray-400 text-sm">Papers Viewed:</span>
                        <p className="text-blue-400 font-semibold">{userStats.totalPapersViewed}</p>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">AI Summaries:</span>
                        <p className="text-green-400 font-semibold">{userStats.totalSummariesGenerated}</p>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Favorite Topic:</span>
                        <p className="text-purple-400 font-semibold">{userStats.favoriteCategory}</p>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Member for:</span>
                        <p className="text-yellow-400 font-semibold">{userStats.joinedDaysAgo} days</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="border-t border-gray-700/50 pt-6">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/explore"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-colors shadow-lg"
                  >
                    📚 Explore Papers
                  </Link>
                  
                  <button
                    onClick={changePassword}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-medium rounded-xl transition-colors shadow-lg"
                  >
                    🔑 Change Password
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700/50 rounded-2xl shadow-xl p-6 backdrop-blur-sm sticky top-8"
            >
              {/* Recent Activity */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="text-gray-300 text-sm">Viewed AI Research Paper</p>
                      <p className="text-gray-500 text-xs">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="text-gray-300 text-sm">Generated AI Summary</p>
                      <p className="text-gray-500 text-xs">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div>
                      <p className="text-gray-300 text-sm">Explored Research Feed</p>
                      <p className="text-gray-500 text-xs">1 day ago</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Security */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Account Security</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <span className="text-gray-300 text-sm">Two-Factor Auth</span>
                    <span className="text-red-400 text-sm">Disabled</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <span className="text-gray-300 text-sm">Email Verified</span>
                    <span className={`text-sm ${user.isVerified ? 'text-green-400' : 'text-red-400'}`}>
                      {user.isVerified ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <span className="text-gray-300 text-sm">Last Login</span>
                    <span className="text-gray-400 text-sm">Today</span>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="border-t border-gray-700/50 pt-6">
                <h3 className="text-xl font-semibold text-red-400 mb-4">Danger Zone</h3>
                <button
                  onClick={onLogout}
                  disabled={logoutLoading}
                  className="w-full px-4 py-3 bg-red-600 hover:bg-red-500 disabled:bg-red-800 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors"
                >
                  {logoutLoading ? 'Logging out...' : '🚪 Logout'}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}