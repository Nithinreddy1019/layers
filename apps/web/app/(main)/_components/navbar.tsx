"use client"
import { Input } from "@repo/ui/components/input";
import { Book, Menu, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { useActivePage } from "~/hooks/use-activepage";
import { useSidebar } from "~/hooks/use-sidebar";
import { AnimatePresence, motion } from "framer-motion";

export const Navbar = () => {

    const sidebarAtom = useSidebar();
    const activePageAtom = useActivePage();

    return (
        <nav className="flex items-center justify-between h-12 px-4">

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
                <Menu />
            </div>
        </nav>
    )
}