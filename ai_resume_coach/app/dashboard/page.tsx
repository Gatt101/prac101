"use client"
import { UserButton, UserProfile } from '@clerk/nextjs'
export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p>Welcome to your dashboard! Here you can manage your resume and job applications.</p>
        <div className="mt-4">
            <UserButton />
            </div>
    </div>
  )
}