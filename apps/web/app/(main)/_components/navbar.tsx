"use client"
import { Input } from "@repo/ui/components/input";
import { Book, Menu, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSidebar } from "~/hooks/use-sidebar";


export const Navbar = () => {

    const sidebarAtom = useSidebar();
    const pathname = usePathname();

    return (
        <nav className="flex items-center justify-between h-12 px-4">

            <div>
                {pathname}
            </div>

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