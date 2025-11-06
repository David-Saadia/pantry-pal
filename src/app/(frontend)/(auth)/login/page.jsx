'use client';

import React from 'react'
import Link from 'next/link'
import { CookingPot } from 'lucide-react' // Using lucide-react icon
import { AuthCard } from '@/components/ui/auth-card'
import { LoginForm } from '@/components/ui/login-form'



export default function LoginPage() {

    return (
        <>
            {/* Header from your HTML */}
            <div className="flex items-center gap-3 mb-6">
                <CookingPot className="h-10 w-10 text-white" />
                <h1 className="text-3xl font-bold text-white">Pantry Pal</h1>
            </div>

            {/* The main card */}
            <AuthCard
                title="Welcome Back"
                description="Login to your Pantry Pal account"
            >
                <div className="flex w-full flex-col gap-4">
                    <LoginForm />
                    <p className="text-center text-sm text-slate-gray dark:text-gray-300">
                        Don't have an account?{' '}
                        <Link
                            href="/register" // Link to your future register page
                            className="font-bold text-emerald-green hover:underline"
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </AuthCard>
    </>
    )
}

