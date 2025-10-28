import { Inter, Epilogue } from 'next/font/google'
import { cn } from '@/lib/utils' // cn is from shadcn/ui
import './globals.css'
// Setup the font imports
const fontDisplay = Epilogue({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-display',
    weight: ['400', '500', '700', '900'],
})

const fontBody = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-body',
})

export const metadata = {
    title: 'Pantry Pal',
    description: 'Your AI-powered cooking companion.',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            {/* This adds the material icons from the original HTML */}
            <link
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
                rel="stylesheet"
            />
        </head>
        <body
            className={cn(
                'min-h-screen bg-background font-display antialiased',
                fontDisplay.variable, // Apply Epilogue as the main font
                fontBody.variable
            )}
        >
        {children}
        </body>
        </html>
    )
}
