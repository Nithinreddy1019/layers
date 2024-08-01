"use client"
import { Input } from "@repo/ui/components/input";
import { Book, Menu, Search, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSidebar } from "~/hooks/use-sidebar";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@repo/ui/lib/utils";
import { useState } from "react";
import path from "path";

export const Navbar = () => {

    const sidebarAtom = useSidebar();
    const pathname = usePathname();

    const [ page, setPage] = useState<string>("");



    return (
        <nav className={cn("flex items-center justify-between h-16 px-4 w-full fixed top-0 md:left-14 bg-background z-50 ")}>
            <AnimatePresence>
                <motion.div 
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    exit={{opacity:0}}
                    transition={{
                        duration: 1
                    }}
                    className="text-3xl font-medium px-2">
                        {pathname.startsWith("/home") && "Home"}
                        {pathname.startsWith("/workflows") && "Workflows"}
                        {pathname.startsWith("/settings") && "Settings"}
                        {pathname.startsWith("/logs") && "Logs"}
                        {pathname.startsWith("/categories") && "Categories"}
                </motion.div>
            </AnimatePresence>

            <div
                role="button"
                onClick={sidebarAtom.onToggle}
                className="md:hidden md:w-0 ml-auto"
            >
                {sidebarAtom.isExpanded ? (
                    <X />
                ) : (
                    <Menu />
                )}
            </div>
        </nav>
    )
}