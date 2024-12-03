"use client"

import Image from "next/image";
import { useEffect } from "react";

import designExample1 from "../../public/assets/design-example-1.png";
import designExample2 from "../../public/assets/design-example-2.png";
import { Pointer } from "./pointer";

import { motion, useAnimate } from "motion/react";
import { Button } from "@repo/ui/components/ui/button";
import { ShinyButton } from "./shiny-button";
import { ArrowRight } from "lucide-react";


export const Hero = () => {

    const [leftDesignScope, leftDesignAnimate] = useAnimate();
    const [leftPointerScope, leftPointerAnimate] = useAnimate();
    const [rightDesignScope, rightDesignAnimate] = useAnimate();
    const [rightPointerScope, rightPointerAnimate] = useAnimate();


    useEffect(() => {
        leftDesignAnimate([
            [leftDesignScope.current, { opacity: 1 }, { duration: 0.5 }],
            [leftDesignScope.current, { y: 0, x: 0 }, { duration: 0.5 }]
        ]);

        leftPointerAnimate([
            [leftPointerScope.current, { opacity: 1 }, { duration: 0.5 }],
            [leftPointerScope.current, { y: 0, x: -100 }, { duration: 0.5 }],
            [leftPointerScope.current, { x: 0, y: [0, 16, 0]}, { duration: 0.5, ease: "easeInOut" }]
        ]);

        rightDesignAnimate([
            [rightDesignScope.current, { opacity: 1 }, { duration: 0.5, delay: 1.0 }],
            [rightDesignScope.current, { y: 0, x: 0 }, { duration: 0.5 }]
        ]);

        rightPointerAnimate([
            [rightPointerScope.current, { opacity: 1 }, { duration: 0.5, delay: 1.0 }],
            [rightPointerScope.current, { y: 0, x: 175 }, { duration: 0.5 }],
            [rightPointerScope.current, { x: 0, y: [0, 20, 0]}, { duration: 0.5, ease: "easeInOut" }]
        ]);


    });


    // TODO: Reduce the code repetition in motion.div use DRY principles
    return (
        <section className="py-24 pt-40 lg:py-28 lg:pt-48 overflow-x-clip">
            <div className="container relative">
                <motion.div
                    ref={leftDesignScope} 
                    initial={{
                        opacity: 0,
                        y: 100,
                        x: -100
                    }}
                    drag
                    className="absolute -left-28 top-20 hidden xl:block"
                >
                    <Image 
                        src={designExample1}
                        alt="example"
                        draggable={false}
                    />
                </motion.div>
                <motion.div 
                    ref={leftPointerScope}
                    initial={{
                        opacity: 0,
                        y: 100,
                        x: -200
                    }}
                    className="absolute left-56 top-96 hidden xl:block"
                >
                    <Pointer 
                        name="Profile"
                        color="violet"
                    />
                </motion.div>
                <motion.div 
                    ref={rightDesignScope}
                    initial={{
                        opacity: 0,
                        x: 100,
                        y: 100
                    }}
                    drag
                    className="absolute -right-64 -top-16  hidden xl:block"
                >
                    <Image 
                        src={designExample2}
                        alt="example"
                        draggable={false}
                    />
                </motion.div>
                <motion.div 
                    ref={rightPointerScope}
                    initial={{
                        opacity: 0,
                        x: 275,
                        y: 100
                    }}
                    className="absolute right-64 -top-4 hidden xl:block"
                >
                    <Pointer 
                        name="Automate"
                        color="purple"
                    />
                </motion.div>
                <motion.div
                     initial={{
                        opacity: 0,
                        y:-10
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{
                        duration: 0.5
                    }}
                    className="flex justify-center"
                >
                    <div className="inline-flex py-1 px-2.5 bg-gradient-to-r from-[#3b0764] to-[#6b21a8] rounded-full text-sm font-light">
                        ✨ Automation made easy
                    </div>
                </motion.div>
                <motion.h1
                    initial={{
                        opacity: 0,
                        y:20
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{
                        duration: 0.5
                    }}
                    className="text-6xl md:text-7xl md:tracking-tighter text-center mt-6 tracking-tight max-w-2xl mx-auto"
                >
                    Efficient automation, created efforlessly
                </motion.h1>
                <motion.p
                    initial={{
                        opacity: 0,
                        y:30
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{
                        duration: 0.5
                    }}
                    className="text-center text-xl text-white/60 mt-8 max-w-xl mx-auto"
                >
                    Create impactuful & efficient automation workflows. Integrate with various applications available.
                </motion.p>

                <motion.div 
                     initial={{
                        opacity: 0,
                        y:45
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{
                        duration: 0.5
                    }}
                    className="flex justify-center mt-12">
                    <ShinyButton className="flex items-center group font-light" href="/signup">
                        Try it now 
                        <ArrowRight className="size-4 stroke-2 group-hover:translate-x-1 transition"/>
                    </ShinyButton>
                </motion.div>
            </div>
        </section>
    )
}