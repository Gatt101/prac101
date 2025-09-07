"use client"
import { UserButton } from '@clerk/nextjs'
export default function Loading() {
  return (
        <div className="">
            <p className="text-center">Loading your dashboard...</p>
            <div className="flex justify-center">
               <div className="mt-4">
            <UserButton />
            </div>
            </div>
        </div>
  )
}