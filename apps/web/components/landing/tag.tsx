import { cn } from "@repo/ui/lib/utils"


interface tagProps {
    children?: React.ReactNode,
    className?: string
}

export const Tag = ({
    children,
    className
}: tagProps) => {
    return (
        <div className={
            cn("inline-flex items-center border border-white/50 text-white rounded-full text-xs px-2 py-1 gap-x-1.5 bg-white/20 backdrop-blur", className)
        }>
            {children}
        </div>
    )
}