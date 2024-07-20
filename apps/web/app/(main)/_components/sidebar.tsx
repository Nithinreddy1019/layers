"use client"

import Image from "next/image"
import Link from "next/link"
import { SidebarIcon } from "./sidebar-icon"
import { House } from "lucide-react"
import Home from "./icons/home"
import { ModeToggle } from "@repo/ui/components/mode-toggle"
import Settings from "./icons/settings"
import Workflows from "./icons/workflows"
import Logs from "./icons/clipboard"
import Category from "./icons/category"
import { usePathname } from "next/navigation"


export const Sidebar = () => {

    const pathname = usePathname()

    return (
        <aside className="h-full flex flex-col items-center">
            <Link href={"/home"} className="flex flex-col items-center p-2">
                <Image 
                    src={"/logo.svg"}
                    height={25}
                    width={25}
                    alt="Logo"
                    className="mr-1"
                />
                <p className="text-xs text-[#DC2626]">Blinde.</p>
            </Link>

            <div className="flex-1 flex flex-col items-center gap-y-8 py-4 mt-2">
                <SidebarIcon 
                    icon={<Home selected={pathname === "/home"}/>}
                    iconName="Home"
                    iconRedirect="/home"
                    isActive={pathname === "/home"}
                />
                <SidebarIcon 
                    icon={<Workflows selected={pathname === "/workflows"}/>}
                    iconName="Workflows"
                    iconRedirect="/workflows"
                    isActive={pathname === "/workflows"}
                />
                <SidebarIcon 
                    icon={<Settings selected={pathname === "/settings"}/>}
                    iconName="Settings"
                    iconRedirect="/settings"
                    isActive={pathname === "/settings"}
                />
                <SidebarIcon 
                    icon={<Category selected={pathname === "/categories"}/>}
                    iconName="Categories"
                    iconRedirect="/categories"
                    isActive={pathname === "/categories"}
                />
                <SidebarIcon 
                    icon={<Logs selected={pathname === "/logs"}/>}
                    iconName="Logs"
                    iconRedirect="/logs"
                    isActive={pathname === "/logs"}
                />
            </div>

            <div className="mb-2">
                <ModeToggle />
            </div>
        </aside>
    )
}