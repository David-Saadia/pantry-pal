'use client'

import React, {useState} from 'react'
import Link from 'next/link'
import {Label} from '@/components/ui/label'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {PasswordInput} from '@/components//ui/password-input'
import {supabase} from "@/lib/supabaseClient";
import {useRouter} from "next/navigation";



export function RegisterForm() {
    const router = useRouter();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('');
    const [authPassword, setAuthPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleRegister = async (e) => {
        e.preventDefault() // Prevent form from refreshing the page
        setIsLoading(true)
        setError(null)
        if (password !== authPassword) {
            setError('Passwords do not match');
            setIsLoading(false)
            return;
        }

        const {data,error} = await supabase.auth.signUp({
            email: email,
            password: password,
            options:{
                data:{
                    full_name: fullName,
                }
            }
        })

        if (error) {
            setError(error.message)
        } else {
            // Re-route to the main dashboard
            alert("Sign up successful! Check your email to confirm.");
            router.push('/login');
        }

        // For now, just log the values
        console.log('Register with:', email, password, fullName)
        // Simulate a network request
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }

    return (
        <form onSubmit={handleRegister} className="flex w-full flex-col gap-4">
            <div className="grid w-full items-center gap-1.5">
                <Label
                    htmlFor="fullName"
                    className="text-charcoal-gray text-sm font-medium leading-normal pb-1 dark:text-gray-200"
                >
                    Full Name
                </Label>
                <Input
                    type="fullName"
                    id="fullName"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="h-12" // From your original HTML
                />
            </div>
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
                    Create Password
                </Label>
                <PasswordInput
                    id="password"
                    placeholder="Enter a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12" // From your original HTML
                />
            </div>

            <div className="grid w-full items-center gap-1.5">
                <Label
                    htmlFor="authPassword"
                    className="text-charcoal-gray text-sm font-medium leading-normal pb-1 dark:text-gray-200"
                >
                    Confirm Password
                </Label>
                <PasswordInput
                    id="authPassword"
                    placeholder="Confirm your password"
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
                {isLoading ? 'Creating an account...' : 'Sign Up'}
            </Button>
        </form>
    )
}

