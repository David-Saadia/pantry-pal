'use client';

import Link from 'next/link';
import {supabase} from "@/lib/supabaseClient";
import {useRouter} from "next/navigation";

export default function SideNavBar({userName, currentPage}) {
    const router = useRouter();
    const handleLogout = () => {
        supabase.auth.signOut()
            .then(() => {
                    router.push('/login');
                    alert('Logged out successfully!');
                }
            ).catch(
                (error) => {
                    alert('Error logging out: ' + error.message);
                }
        );
    }

    return (
        <aside
            className="sticky top-0 h-screen w-64 flex-shrink-0 bg-white dark:bg-charcoal/50 p-4 border-r border-gray-200 dark:border-gray-700 hidden lg:flex flex-col">
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 px-3 py-2">
                    <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                        style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCJRpiJmuW3O-sC-53sSGqIEwjFdIxDINGBrvZ4lDVg5Sy6guPGNnP_TD4BhPOmRbT2ZDOgt2XeoAhsuosBu_q4KJIcYnSa-JR4ZBugQ7GDRcILqqvcM62G_2xq_6TJQmK3aHImVaz83H4SN4hKcycPyqp0r8tnWz7xMiMOo5Yo3GBWVKAI_DVlYK3oKzd-xbfc17RuGhqSDR2IjWG1NmgDw1nNm7h8yq4M0doeHbuFDZPircYYo-rLO7fM18Vqlzzl7pmzVrlLYA")'}}
                        role="img"
                        aria-label="Digital Pantry app logo, an abstract green leaf shape"
                    />
                    <div className="flex flex-col">
                        <h1 className="text-charcoal dark:text-background-light text-base font-bold leading-normal">
                            Digital Pantry
                        </h1>
                        <p className="text-medium-gray dark:text-gray-400 text-sm font-normal leading-normal">
                            {userName}
                        </p>
                    </div>
                </div>

                <nav className="flex flex-col gap-2 mt-4">
                    <Link
                        href="/"
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                            currentPage === "home"
                                ? "bg-emerald-green/10 dark:bg-emerald-green/20"
                                : "hover:bg-gray-100 dark:hover:bg-white/10"
                        }`}
                    >
                        <span className={`material-symbols-outlined ${
                            currentPage === "home" ? "text-emerald-green" : "text-charcoal dark:text-gray-300"
                        }`}>home</span>
                        <p className="text-charcoal dark:text-white text-sm font-medium leading-normal">
                            Home Page
                        </p>
                    </Link>

                    <Link
                        href="/my-fridge"
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                            currentPage === "my-fridge"
                                ? "bg-emerald-green/10 dark:bg-emerald-green/20"
                                : "hover:bg-gray-100 dark:hover:bg-white/10"
                        }`}
                    >
                        <span className={`material-symbols-outlined ${
                            currentPage === "my-fridge" ? "text-emerald-green" : "text-charcoal dark:text-gray-300"
                        }`}>kitchen</span>
                        <p className="text-charcoal dark:text-white text-sm font-medium leading-normal">
                            My Fridge
                        </p>
                    </Link>

                    <Link
                        href="/favorites"
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                            currentPage === "favorites"
                                ? "bg-emerald-green/10 dark:bg-emerald-green/20"
                                : "hover:bg-gray-100 dark:hover:bg-white/10"
                        }`}
                    >
                        <span className={`material-symbols-outlined ${
                            currentPage === "favorites" ? "text-emerald-green" : "text-charcoal dark:text-gray-300"
                        }`}>favorite</span>
                        <p className="text-charcoal dark:text-white text-sm font-medium leading-normal">
                            Favorite Recipes
                        </p>
                    </Link>

                    <Link
                        href="/ai-chat"
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                            currentPage === "ai-chat"
                                ? "bg-emerald-green/10 dark:bg-emerald-green/20"
                                : "hover:bg-gray-100 dark:hover:bg-white/10"
                        }`}
                    >
                        <span className={`material-symbols-outlined ${
                            currentPage === "ai-chat" ? "text-emerald-green" : "text-charcoal dark:text-gray-300"
                        }`}>smart_toy</span>
                        <p className="text-charcoal dark:text-white text-sm font-medium leading-normal">
                            AI Chef Chat
                        </p>
                    </Link>
                </nav>
            </div>

            <div className="mt-auto flex flex-col gap-1">
                <Link
                    href=""
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10"
                >
                    <span className="material-symbols-outlined text-charcoal dark:text-gray-300">logout</span>
                    <p className="text-charcoal dark:text-gray-300 text-sm font-medium leading-normal">
                        Sign Out
                    </p>
                </Link>
            </div>
        </aside>
    );
}
