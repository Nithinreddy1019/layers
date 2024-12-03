import { cn } from "@repo/ui/lib/utils"
import { redirect } from "next/navigation"





export const ShinyButton = ({
    children,
    className,
    href
}: {
    children: React.ReactNode,
    className?: string,
    href?: string
}) => {

    const handleButtonClick = () => {
        if(!href) return;

        redirect(href);
    };

    return (
        <button
            className={cn(
                "h-10 px-6 rounded-full relative font-medium bg-gradient-to-b from-[#3b0764] to-[#6b21a8] shadow-[0px_0px_12px_#7e22ce]",
                className
            )}
            onClick={handleButtonClick}
        >
            <div className="absolute inset-0">
                <div className="rounded-full border border-white/20 absolute inset-0 [mask_image:linear-gradient(to_bottom,black,transparent)]"></div>
                <div className="rounded-full border border-white/20 absolute inset-0 [mask_image:linear-gradient(to_top,black,transparent)]"></div>
                <div className="absolute inset-0 shadow-[0px_0px_10px_rgb(147,51,234)_inset] rounded-full"></div>
            </div>
            <span className="flex items-center gap-x-2">{children}</span>
        </button>
    )
}