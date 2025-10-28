'use client'

import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Input } from '@/components/ui/input' // from shadcn/ui
import { cn } from '@/lib/utils' // from shadcn/ui

/**
 * A reusable password input component with a show/hide toggle.
 * It forwards all other props (like placeholder, value, onChange) to the underlying Input.
 */
const PasswordInput = React.forwardRef(({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="relative">
            <Input
                type={showPassword ? 'text' : 'password'}
                className={cn('pr-10', className)} // Add padding to the right for the icon
                ref={ref}
                {...props}
            />
            <button
                type="button" // Important: prevents form submission
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center justify-center h-full w-10 text-gray-500 hover:text-gray-700"
            >
                {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                ) : (
                    <Eye className="h-5 w-5" />
                )}
                <span className="sr-only">
          {showPassword ? 'Hide password' : 'Show password'}
        </span>
            </button>
        </div>
    )
})

PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }

