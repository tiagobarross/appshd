// app/components/BottomNavbar.tsx
"use client";

import { Calendar, Home, Search, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const BottomNavbar = () => {
    const pathname = usePathname();

    const navItems = [
        { href: "/modules/home", icon: <Home size={24} />, label: "Início" },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 p-1 bg-white border-t border-gray-200 shadow-md">
            <ul className="flex justify-around py-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={clsx(
                                    "flex flex-col items-center text-xs transition-colors",
                                    isActive ? "text-[#1577E0]" : "text-gray-500 hover:text-[#1577E0]"
                                )}
                            >
                                {item.icon}
                                <span className="mt-1">{item.label}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default BottomNavbar;
