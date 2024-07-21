import { Button } from "@repo/ui/components/button"
import { 
    Tooltip, 
    TooltipContent, 
    TooltipProvider, 
    TooltipTrigger 
} from "@repo/ui/components/tooltip"
import Link from "next/link"


interface SidebarIconProps {
    icon: React.ReactNode,
    iconName: string,
    iconRedirect: string,
    isActive: boolean
}

export const SidebarIcon = ({
    icon: Icon,
    iconName,
    iconRedirect,
    isActive
}: SidebarIconProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                        <Link href={iconRedirect}>
                            {Icon}
                        </Link>    
                </TooltipTrigger>
                <TooltipContent 
                    side="right"
                    alignOffset={20}
                    className="font-medium text-xs rounded-[10px] ml-2"
                >
                    {iconName}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}