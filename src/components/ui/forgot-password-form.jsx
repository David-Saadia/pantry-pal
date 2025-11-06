'use client'

import React, { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {supabase} from '@/lib/supabaseClient'


export function ForgotPasswordForm() {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleForgotPassword = async (e) => {
        e.preventDefault() // Prevent form from refreshing the page
        setIsLoading(true)
        setError(null)

        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: 'http://localhost:3000/update-password',
        });

        if (error) {
            setError(error.message)
        } else {
            alert("Password reset link sent! Please check your email.");
        }

        setIsLoading(false)
    }

    return (
        <form onSubmit={handleForgotPassword} className="flex w-full flex-col gap-4">
            <div className="grid w-full items-center gap-1.5">
                <Label
                    htmlFor="email"
                    className="text-charcoal-gray text-sm font-medium leading-normal pb-1 dark:text-gray-200"
                >
                    Email Address
                </Label>
                <Input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12" // From your original HTML
                />
            </div>

            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}


            <Button
                type="submit"
                className="h-12 w-full text-base font-bold" // Uses shadcn button
                style={{ backgroundColor: '#28a745' }} // Uses your emerald-green
                disabled={isLoading}
            >
                {isLoading ? 'Reseting...' : 'Reset Password'}
            </Button>
        </form>
    )
}

