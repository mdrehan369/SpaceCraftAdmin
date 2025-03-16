"use client"

import { twMerge } from "tailwind-merge";

/* eslint-disable @typescript-eslint/no-explicit-any */
function Button({ children, className, ...props }: { children: React.ReactNode, className?: string, [x: string]: any }) {
    return (
        <button className={twMerge("bg-orange-500 cursor-pointer hover:bg-transparent border-2 border-orange-500 px-4 py-2 rounded-sm disabled:opacity-50 disabled:hover:bg-orange-500 disabled:hover:text-white text-white hover:text-orange-500 text-sm font-semibold transition duration-300", className)} {...props}>
            {children}
        </button>
    )
}

export default Button