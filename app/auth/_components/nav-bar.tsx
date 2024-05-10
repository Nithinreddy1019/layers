"use client"

import { DarkModeToggle } from "@/components/dark-mode-toggle";
import { Button } from "@/components/ui/button";
import logo from "@/public/logo.svg"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";


export const NavBar = () => {

    const pathName = usePathname();

    return (
        <nav className="flex items-center justify-between p-2 px-4 md:px-8 shadow-md sticky top-0 left-0  z-10 backdrop-filter backdrop-blur-lg bg-opacity-10">
            <Image src={logo} height={48} width={48} alt="Logo" className=""/>

            <div className="flex item-center gap-x-2">
                {pathName === "/auth/register" ? 
                    <Button variant="secondary">
                        <Link href="/auth/login">
                            Signin
                        </Link>
                    </Button> 
                    : 
                    ""  
                }
                

                {pathName === "/auth/login" ? 
                    <Button>
                        <Link href="/auth/register">
                            Signup
                        </Link>
                    </Button> 
                    : 
                    ""  
                }

                <DarkModeToggle />
            </div>
        </nav>
    )
}