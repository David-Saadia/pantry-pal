'use client';

import {useEffect, useState} from 'react';
import SideNavBar from '@/components/SideNavBar';
import TrendingRecipes from '@/components/TrendingRecipes';
import FridgeIngredients from '@/components/FridgeIngredients';
import ReceiptUploadModal from '@/components/ReceiptUploadModal';
import {useRouter} from "next/navigation";
import {supabase} from "@/lib/supabaseClient";

export default function MainPage() {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState(null);


    useEffect( () => {
            const checkIsLoggedIn=async ()=>{
                const checkUser = await supabase.auth.getUser();
                if (checkUser.data.user) {
                    setUser(checkUser.data.user);
                } else {
                    setUser(null);
                    router.push('/login');
                }
            }
            checkIsLoggedIn();
        }
        , [router]);

    if (!user) {
        return null;
    }


    return (
        <div className="relative flex min-h-screen w-full">
                    <SideNavBar userName={user.user_metadata.full_name}/>

                    <main className="flex-1 overflow-y-auto p-6 lg:p-10">
                        <div className="max-w-4xl mx-auto">
                            <TrendingRecipes/>
                            <FridgeIngredients onOpenReceiptModal={() => setIsModalOpen(true)}/>
                        </div>
                    </main>

                    <ReceiptUploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
                </div>
);
}
