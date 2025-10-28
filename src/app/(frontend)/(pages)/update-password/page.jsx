import React from 'react'
import Link from 'next/link'
import { CookingPot } from 'lucide-react' // Using lucide-react icon
import { AuthCard } from '@/components/ui/auth-card'
import { RegisterForm } from '@/components/ui/register-form'
import AuthLayout from "@/app/(frontend)/(auth)/authLayout";
import {ForgotPasswordForm} from "@/components/ui/forgot-password-form";
import {UpdatePasswordForm} from "@/components/ui/update-password-form";

export const metadata = {
    title: 'Update Password - Pantry Pal',
}

export default function UpdatePasswordPage() {
    return (
        <AuthLayout>
            {/* Header from your HTML */}
            <div className="flex items-center gap-3 mb-6">
                <CookingPot className="h-10 w-10 text-white" />
                <h1 className="text-3xl font-bold text-white">Pantry Pal</h1>
            </div>

            {/* The main card */}
            <AuthCard
                title="Update Your Password"
            >
                <div className="flex w-full flex-col gap-4">
                    <UpdatePasswordForm />
                </div>
            </AuthCard>
        </AuthLayout>
    )
}

