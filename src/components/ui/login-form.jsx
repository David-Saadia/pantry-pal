'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PasswordInput } from '@/components//ui/password-input'
import {supabase} from '@/lib/supabaseClient'
import {router} from "next/client";
import {useRouter} from "next/navigation";

export function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault() // Prevent form from refreshing the page
        setIsLoading(true)
        setError(null)

        const { error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        })

        if (error) {
          setError(error.message)
        } else {
          // Re-route to the main dashboard
          router.push('/main');
        }
    }

    return (
        <form onSubmit={handleLogin} className="flex w-full flex-col gap-4">
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
            <div className="grid w-full items-center gap-1.5">
                <Label
                    htmlFor="password"
                    className="text-charcoal-gray text-sm font-medium leading-normal pb-1 dark:text-gray-200"
                >
                    Password
                </Label>
                <PasswordInput
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12" // From your original HTML
                />
            </div>

            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}

            <div className="text-right">
                <Link
                    href="/forgot-password"
                    className="text-slate-gray text-sm font-normal leading-normal underline hover:text-charcoal-gray dark:hover:text-white"
                >
                    Forgot Password?
                </Link>
            </div>

            <Button
                type="submit"
                className="h-12 w-full text-base font-bold" // Uses shadcn button
                style={{ backgroundColor: '#28a745' }} // Uses your emerald-green
                disabled={isLoading}
            >
                {isLoading ? 'Logging in...' : 'Login'}
            </Button>
        </form>
    )
}

