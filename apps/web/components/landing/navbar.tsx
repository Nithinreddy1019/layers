"use client"

import { cn } from "@repo/ui/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useState } from "react"
import { ShinyButton } from "./shiny-button";



const navLinks = [
    { label: "Home", href: "#" },
    { label: "Features", href: "#features" },
    { label: "Integrations", href: "#integrations" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQs", href: "#faqs" },
]


export const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className="py-4 lg:py-6 fixed w-full top-0 z-50">
            <div className="container max-w-5xl">
                <div className={cn(
                    "border border-white/10  rounded-[27px] md:rounded-full bg-neutral-950/70 backdrop-blur"
                )}>
                    <div className="grid grid-cols-2 lg:grid-cols-3 py-2 px-4 items-center md:pr-2 ">
                        <div>
                            <Image 
                                src={"/assets/logo.svg"}
                                alt="logo"
                                width={125}
                                height={125}
                                className=""
                            />
                        </div>

                        <div className="justify-center items-center hidden lg:flex">
                            <nav className="flex gap-6">
                                {navLinks.map((link) => (
                                    <a href={link.href} key={link.label} className="text-white/70 hover:text-white transition">
                                        {link.label}
                                    </a>
                                ))}
                            </nav>
                        </div>

                        <div className="flex justify-end gap-2.5">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu text-white md:hidden"
                                onClick={() => setIsOpen(!isOpen)}
                            >

                                <line x1="3" y1="6" x2="21" y2="6" className={cn("origin-left transition", isOpen && "rotate-45 -translate-y-1")}></line>
                                <line x1="3" y1="12" x2="21" y2="12" className={cn("transition", isOpen && "opacity-0")}></line>
                                <line x1="3" y1="18" x2="21" y2="18" className={cn("origin-left transition", isOpen && "-rotate-45 translate-y-1")}></line>
                            </svg>

                            <ShinyButton className="hidden md:block">
                                Login
                            </ShinyButton>
                        </div>
                    </div>
                    <AnimatePresence>
                    {
                        isOpen && (
                            <motion.div
                                initial={{
                                    height: 0
                                }}
                                animate={{
                                    height: "auto"
                                }}
                                exit={{
                                    height: 0
                                }}
                                className="overflow-hidden md:hidden"
                            >
                                <div  className="flex flex-col items-center gap-4 py-4">
                                    {navLinks.map((link) => (
                                        <motion.a 
                                            initial={{ y: -50, opacity: 0 }}
                                            whileInView={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.5, ease: "easeOut" }}
                                            href={link.href} 
                                            key={link.label}      
                                            className="py-2 text-lg text-white tracking-wider border-b pb-0 border-purple-500"
                                        >
                                            {link.label}
                                        </motion.a>
                                    ))}
                                    <motion.div 
                                        initial={{ y: 5, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                        
                                    >
                                        <ShinyButton>
                                            Login
                                        </ShinyButton>
                                    </motion.div>
                                </div>
                            </motion.div>
                        )
                    }
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}