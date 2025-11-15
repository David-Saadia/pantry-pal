'use client';

import { UserProvider } from '@/contexts/UserContext';
import {useSupabaseTimeout} from "@/app/(frontend)/hooks/useSupabaseTimeout";

export default function PagesLayout({ children }) {
    //we need to call out custom hook here because it affects all the protected pages in (pages) directory
    useSupabaseTimeout();
    return (
        <UserProvider>
            {children}
        </UserProvider>
    );
}