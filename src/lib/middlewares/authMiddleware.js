import {NextResponse} from "next/server";

export async function authMiddleware(supabase,req,response){
    // Get the session
    const { pathname } = req.nextUrl

    const shouldRun=pathname.startsWith('/login') ||
        pathname.startsWith('/register') ||
        pathname.startsWith('/forgot-password') ||
        pathname.startsWith('/update-password') ||
        pathname.startsWith('/main') ||
        pathname.startsWith('/my-fridge') ||
        pathname.startsWith('/favorites') ||
        pathname.startsWith('/ai-chat')

    if(!shouldRun){
        return response;
    }

    const { data: { session } } = await supabase.auth.getSession()


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

    return response;
}

