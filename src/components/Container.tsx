import { twMerge } from "tailwind-merge"

export default function Container({ children, className }: { children: React.ReactNode, className?: string }) {

    return (
        <div className={twMerge("container w-[80vw] h-[100vh] overflow-y-scroll", className)}>
            {children}
        </div>
    )
}
