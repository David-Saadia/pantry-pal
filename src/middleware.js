import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import {authMiddleware} from "@/lib/middlewares/authMiddleware";


export async function middleware(req) {
    let response = NextResponse.next({
        request: {
            headers: req.headers,
        },
    })

    // Create Supabase client
    // this supabase server is different from the one in supabaServer.js because in the middleware we can get
    //the cookies from the request whereas in supabaseServer.js we don't have access to the cookies on the request
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

    response =await authMiddleware(supabase,req,response);


    return response;
}





