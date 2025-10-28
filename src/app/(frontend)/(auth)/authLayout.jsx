import React from 'react'

export default function AuthLayout({ children }) {
    return (
        <div
            className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background-light p-4 dark:bg-background-dark"
            // This style applies the background image from your HTML
            style={{
                backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCubqT8zwlRD4Oy-PCX4ZzZfugu5UuRBl0FY9VBamR_DOEhHvJlbKjAGZ2_FKEn3VUbCEb4d4zjSQGBfrskFPvl5jTsd5DFej1x7zqnhTX2hRVQzfA4Y3sBhtWiXgTnv2fvAhW2QhtGfh9z8MUa41WlDScowxTm1x-N3UY7W0evDNSo2FBoTHzSOviHc3sINUZyUEMaMeRJcxCLf2v7KINZdexzvgeasBcpNJYUvmbsvE4Eo9hjvUlXmmhohlFQT-Ypu1ZRmOIjWw")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* This div adds the dark overlay and blur from your HTML */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

            {/* The "relative" ensures your content appears on top of the overlay */}
            <div className="relative z-10 flex h-full w-full max-w-md flex-col items-center justify-center">
                {children}
            </div>
        </div>
    )
}

