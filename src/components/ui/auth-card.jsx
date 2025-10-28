import React from 'react'

/**
 * A reusable white card wrapper for auth forms (login, register, etc.)
 */
export function AuthCard({ title, description, children }) {
    return (
        <div className="w-full rounded-xl bg-white p-6 shadow-2xl dark:bg-neutral-800 sm:p-8">
            {/* Form Header */}
            <div className="mb-6 flex flex-col gap-2 text-center">
                <p className="text-charcoal-gray text-3xl font-black leading-tight tracking-[-0.033em] dark:text-white">
                    {title}
                </p>
                <p className="text-slate-gray text-base font-normal leading-normal dark:text-gray-300">
                    {description}
                </p>
            </div>

            {/* Form Content (passed in from the page) */}
            {children}
        </div>
    )
}

