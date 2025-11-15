import {useRouter} from "next/navigation";
import {supabase} from "@/lib/supabaseClient"
import {useEffect} from "react";

//refreshes session based on user activity, default- 30 minutes
export function useSupabaseTimeout(timeoutMS=30*60*1000){
    const router=useRouter();

    useEffect(() => {
        let timeout;
        let lastRefresh=Date.now();
        const MIN_REFRESH_INTERVAL = 60 * 1000
        const resetTimeout = async () => {
            clearTimeout(timeout);

            // Refresh session
            if (Date.now() - lastRefresh > MIN_REFRESH_INTERVAL) {
                await supabase.auth.refreshSession()
                lastRefresh = Date.now()
            }


            timeout = setTimeout(async () => {
                await supabase.auth.signOut();
                router.push('/login');
            }, timeoutMS);
        };
        const events = ['mousedown', 'keydown', 'scroll'];
        events.forEach(e => document.addEventListener(e, resetTimeout));
        resetTimeout();

        return ()=>{
            clearTimeout(timeout);
            events.forEach(e => document.removeEventListener(e, resetTimeout));
        }
    }, [timeoutMS,router,supabase]);
}