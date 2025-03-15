"use client"

import { menuItems } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {

    const pathname = usePathname()

    return (
        <div className='w-[20vw] h-[100vh] bg-slate-100 flex flex-col items-center justify-start gap-10 py-10 px-4'>
            <div className="text-2xl font-bold text-gray-800">
                    <Link href="/">
                        Space<span className="text-orange-500">Craft</span>
                        Interio
                    </Link>
                </div>
            <nav className="w-full h-fit flex flex-col items-center justify-start gap-3 px-4">
                {menuItems.map((item) => (
                    <Link href={item.href} key={item.href} className={`text-gray-600 p-3 w-full text-sm font-bold rounded-sm px-4 ${pathname === item.href && 'bg-gray-200 text-orange-500'} hover:text-orange-500 hover:bg-gray-200 transition-colors duration-300`}>
                        {item.icon && <item.icon className="inline mx-2 size-5" />}{" "}{item.label}
                    </Link>
                ))}
            </nav>
        </div>
    );
}
