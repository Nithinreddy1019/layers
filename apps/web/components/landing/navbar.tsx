"use client"

import { cn } from "@repo/ui/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useState } from "react"



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

                            <button 
                                className="hidden md:block rounded-full h-10 px-6 font-medium bg-gradient-to-r from-purple-700 to-purple-900 focus:ring-2 ring-purple-700 hover:bg-gradient-to-br hover:from-purple-900 hover:to-purple-700"
                            >
                                Login
                            </button>
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
                                            key={link.label}      className="py-2 text-lg text-white tracking-wider"
                                        >
                                            {link.label}
                                        </motion.a>
                                    ))}
                                    <motion.button 
                                        initial={{ y: 5, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                        className="rounded-full h-10 px-6 font-medium bg-gradient-to-r from-purple-700 to-purple-900 focus:ring-2 ring-purple-700 hover:bg-gradient-to-br hover:from-purple-900 hover:to-purple-700"
                                    >
                                        Login
                                    </motion.button>
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