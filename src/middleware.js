import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function middleware(req) {
    let response = NextResponse.next({
        request: {
            headers: req.headers,
        },
    })

    // Create Supabase client
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                get(name) {
                    return req.cookies.get(name)?.value
                },
                set(name, value, options) {
                    response.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                },
                remove(name, options) {
                    response.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                },
            },
        }
    )

    // Get the session
    const { data: { session } } = await supabase.auth.getSession()

    const { pathname } = req.nextUrl

    // Define auth pages (login, register, etc.)
    const isAuthPage = pathname.startsWith('/login') ||
                       pathname.startsWith('/register') ||
                       pathname.startsWith('/forgot-password') ||
                       pathname.startsWith('/update-password')

    // Define protected pages
    const isProtectedPage = pathname.startsWith('/main') ||
                           pathname.startsWith('/my-fridge') ||
                           pathname.startsWith('/favorites') ||
                           pathname.startsWith('/ai-chat')

    // If logged in and trying to access auth pages → redirect to main
    if (session && isAuthPage) {
        return NextResponse.redirect(new URL('/main', req.url))
    }

    // If NOT logged in and trying to access protected pages → redirect to login
    if (!session && isProtectedPage) {
        return NextResponse.redirect(new URL('/login', req.url))
    }

    // Allow the request to proceed
    return response
}

// Configure which routes use this middleware
export const config = {
    matcher: [
        '/login',
        '/register',
        '/forgot-password',
        '/update-password',
        '/main',
        '/my-fridge',
        '/favorites',
        '/ai-chat',
    ]
}
