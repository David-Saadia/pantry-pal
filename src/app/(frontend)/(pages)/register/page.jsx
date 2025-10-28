import React from 'react'
import Link from 'next/link'
import { CookingPot } from 'lucide-react' // Using lucide-react icon
import { AuthCard } from '@/components/ui/auth-card'
import { RegisterForm } from '@/components/ui/register-form'
import AuthLayout from "@/app/(frontend)/(auth)/authLayout";

export const metadata = {
    title: 'Register - Pantry Pal',
}

export default function RegistrationPage() {
    return (
        <AuthLayout>
            {/* Header from your HTML */}
            <div className="flex items-center gap-3 mb-6">
                <CookingPot className="h-10 w-10 text-white" />
                <h1 className="text-3xl font-bold text-white">Pantry Pal</h1>
            </div>

            {/* The main card */}
            <AuthCard
                title="Create Your Account"
            >
                <div className="flex w-full flex-col gap-4">
                    <RegisterForm />
                    <p className="text-center text-sm text-slate-gray dark:text-gray-300">
                        Already have an account?{' '}
                        <Link
                            href="/login" // Link to your future register page
                            className="font-bold text-emerald-green hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </AuthCard>
        </AuthLayout>
    )
}

