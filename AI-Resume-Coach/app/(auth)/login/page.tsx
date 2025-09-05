'use client'

import { SignIn, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function LoginPage() {
    const router = useRouter()
    const { isSignedIn } = useUser()
    
    useEffect(() => {
        if (isSignedIn) {
            router.push('/dashboard')
        }
    }, [isSignedIn, router])
    
    return (
        <div className="flex justify-center items-center h-screen">
            <SignIn />
        </div>
    )
}