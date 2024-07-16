"use client"
import { motion, useMotionTemplate, useMotionValue, animate } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { PiSignIn } from "react-icons/pi";




const Landing = () => {

    const colors = ["#DC2626", "#E11D48", "#ef4444"]
    const color = useMotionValue(colors[0])
    const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #09090B 50%, ${color})`
    const border = useMotionTemplate`1px solid ${color}`
    const boxShadow = useMotionTemplate`0px 4px 24px ${color}`

    useEffect(() => {
        animate(color, colors, {
            ease: "easeInOut",
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror"
        })
    }, [])

    return (
        <motion.section
            style={{
                backgroundImage
            }}
            className="relative min-h-screen gap-y-8 overflow-hidden bg-black"
        >
            <nav className="px-4 py-2 md:px-8 md:py-4 h-16 w-full flex items-center justify-between">
                <div className="flex items-center gap-x-2">
                    <Image 
                        src={"/logo.svg"}
                        height={35}
                        width={35}
                        alt="Logo"
                    />
                    <h3 className="text-xl text-red-600 font-medium">Blinde</h3>
                </div>

                <div className="flex items-center gap-x-2">
                    <Link href={"/auth/login"} className="flex items-center gap-x-2">
                        <motion.button
                            whileHover={{
                                scale: 1.015
                            }}  
                            whileTap={{
                                scale: 0.985
                            }}
                            style={{
                                border,
                                boxShadow
                            }}
                            className="group relative flex items-center w-fit gap-2 rounded-full px-4 py-2 bg-black text-white transition-colors hover:bg-black/50"
                            >
                                Sign in
                                <PiSignIn className="animate-pulse h-4 w-4 transition-transform group-hover:translate-x-0.5"/>
                            
                        </motion.button>
                    </Link>
                </div>
            </nav>
            
            <div className="min-h-full mt-16 md:mt-24 px-8 py-24 flex flex-col items-center">
                <h1 className="text-white text-center text-5xl md:text-7xl font-semibold">
                    Automate your workflows
                </h1>
                <h1 className="text-white text-center text-5xl md:text-7xl font-semibold">
                    Only with
                    <span className="text-[#DC2626] ml-4">
                        Blinde
                    </span>
                </h1>
                <Link href={"/auth/register"} className="flex items-center gap-x-2">
                    <motion.button
                        whileHover={{
                            scale: 1.015
                        }}
                        whileTap={{
                            scale: 0.985
                        }}
                        style={{
                            border,
                            boxShadow
                        }}
                        className="group relative flex items-center w-fit gap-2 rounded-full px-4 py-2 bg-black text-white transition-colors hover:bg-black/50 mt-8"
                    >
                        Try it now!
                        <IoIosArrowRoundForward className="h-6 w-6 transition-transform group-hover:-rotate-45"/>    
                    </motion.button>
                </Link>
            </div>

        </motion.section>
    );
}
 
export default Landing;