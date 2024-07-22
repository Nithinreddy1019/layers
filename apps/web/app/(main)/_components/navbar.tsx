"use client"
import { Input } from "@repo/ui/components/input";
import { Book, Menu, Search, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useActivePage } from "~/hooks/use-activepage";
import { useSidebar } from "~/hooks/use-sidebar";
import { AnimatePresence, motion } from "framer-motion";
import { useScrollTop } from "~/hooks/use-scroll-top";
import { cn } from "@repo/ui/lib/utils";

export const Navbar = () => {

    const sidebarAtom = useSidebar();
    const activePageAtom = useActivePage();

    const scrolled = useScrollTop(10);

    return (
        <nav className={cn("flex items-center justify-between h-14 px-4 w-full fixed top-0 md:left-14 bg-background z-50", scrolled && "shadow-sm")}>

            <AnimatePresence>
                <motion.div 
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    exit={{opacity:0}}
                    transition={{
                        duration: 1
                    }}
                    className="text-xl font-medium">
                    {activePageAtom.activePage}
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