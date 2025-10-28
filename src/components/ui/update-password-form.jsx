'use client'

import React, {useState} from 'react'
import Link from 'next/link'
import {Label} from '@/components/ui/label'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {PasswordInput} from '@/components//ui/password-input'
import {supabase} from '@/lib/supabaseClient'
import {useRouter} from "next/navigation";



export function UpdatePasswordForm() {
    const [password, setPassword] = useState('')
    const [authPassword, setAuthPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const router = useRouter();

    const handleUpdatePassword = async (e) => {
        e.preventDefault() // Prevent form from refreshing the page
        setIsLoading(true)
        setError(null)

        if (password !== authPassword) {
            setError('Passwords do not match');
            setIsLoading(false)
            return;
        }

        const {error} = await supabase.auth.updateUser(
            {
                password: password
            })

        if (error) {
            setError(error.message)
        } else {
            // Re-route to the main dashboard
            alert('Congrats');
            router.push('/login');
        }

        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }



    return (
        <form onSubmit={handleUpdatePassword} className="flex w-full flex-col gap-4">
            <div className="grid w-full items-center gap-1.5">
                <Label
                    htmlFor="password"
                    className="text-charcoal-gray text-sm font-medium leading-normal pb-1 dark:text-gray-200"
                >
                    New Password
                </Label>
                <PasswordInput
                    id="password"
                    placeholder="Enter your new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12" // From your original HTML
                />
            </div>

            <div className="grid w-full items-center gap-1.5">
                <Label
                    htmlFor="password"
                    className="text-charcoal-gray text-sm font-medium leading-normal pb-1 dark:text-gray-200"
                >
                    Confirm Password
                </Label>
                <PasswordInput
                    id="authPassword"
                    placeholder="Confirm your new password"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
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
                style={{backgroundColor: '#28a745'}} // Uses your emerald-green
                disabled={isLoading}
            >
                {isLoading ? 'Updating Password...' : 'Change Password'}
            </Button>
        </form>
    )
}




