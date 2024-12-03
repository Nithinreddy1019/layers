"use client"

import Image, { StaticImageData } from "next/image";
import { useState, useRef, useEffect } from "react";

import purpleBgImage from "../../public/assets/purple-bg.jpg";
import designImage1 from "../../public/assets/design-example-1.png";
import designImage2 from "../../public/assets/design-example-2.png";
import { Tag } from "../landing/tag";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";
import { AnimatePresence, motion } from "motion/react";


const imagesList = [
    {
        src: designImage1,
        name: "Design example 1",
        title: "5 Integrations",
        description: "A bunch of integrations to speed up your workflow"
    },
    {
        src: designImage2,
        name: "Design example 2",
        title: "Seamless UI",
        description: "Easy workflow creation without bloat."
    },
    {
        src: designImage1,
        name: "Design example 1",
        title: "5 Integrations 2",
        description: "A bunch of integrations to speed up your workflow"
    },
    {
        src: designImage2,
        name: "Design example 2",
        title: "Seamless UI 2",
        description: "Easy workflow creation without bloat."
    },
];

// TODO: Add actual images og the application


type imageListDataType = {
    src: StaticImageData, 
    name: string, 
    title: string, 
    description: string
};


export const ImageSlider = () => {


    const [currImageIndex, setCurrImageIndex] = useState<number>(0);
    const [isHovering, setIsHovering] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);


    useEffect(() => {
        if (!isHovering) {
            intervalRef.current = setInterval(handleNextImage, 3000);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isHovering]);


    const handlePrevImage = () => {
        setCurrImageIndex(prev => 
            prev === 0 ? imagesList.length - 1 : prev - 1
        )
    };

    const handleNextImage = () => {
        setCurrImageIndex(prev => 
            prev === imagesList.length - 1 ? 0 : prev + 1
        );
    };

    const slideVariants = {
        initial: { opacity: 0.5, x: 0, y:10 },
        animate: { opacity: 1, x: 0, y: 0 },
        exit: { opacity: 0, x: 0, y: -10 }
    };

    const textSlideVariants = {
        initial: { opacity: 0.5 },
        animate: { opacity: 1 },
        exit: { opacity: 1 }
    };

    return (
        <motion.section
            initial={{opacity: 0, size: 0}}
            animate={{opacity: 1, size: 1}}
            transition={{ duration: 0.3, ease: "easeIn"}} 
            className="min-h-screen hidden lg:block" 
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <div className="h-full p-4">
                <div 
                    className="h-full w-full bg-cover rounded-2xl flex flex-col items-center" 
                    style={{
                        backgroundImage: `url(${purpleBgImage.src})`
                    }}
                >
                    <div className="flex-1 pt-24 items-center flex flex-col">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currImageIndex}
                                className="h-72 w-72"
                                variants={slideVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.3, ease: "easeIn" }}
                            >
                                <Image 
                                    src={imagesList[currImageIndex]?.src!}
                                    alt={imagesList[currImageIndex]?.name!}
                                    className="object-contain w-full h-full rounded-2xl"
                                />
                            </motion.div>
                        </AnimatePresence>
                        <div className="py-6 flex flex-col gap-y-4 items-center">
                            <Tag>
                                <p>What&apos;s new?</p>
                            </Tag>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currImageIndex}
                                    variants={textSlideVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    transition={{ duration: 0.3, ease: "easeIn" }}
                                    className="space-y-2"
                                >
                                    <h1 className="text-2xl text-white max-w-sm text-center mx-auto">{imagesList[currImageIndex]?.title}</h1>
                                    <p className="max-w-sm text-center mx-auto text-white/80">{imagesList[currImageIndex]?.description}</p>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                    <div className="py-8 flex items-center gap-x-8">
                        <button className="p-2 hover:bg-white/20 rounded-xl transition" onClick={handlePrevImage}>
                            <ArrowLeft className="text-white"/>
                        </button>
                        
                        <div className="flex items-center gap-2">
                            {imagesList.map((imageData, index) => (
                                <div 
                                    className={cn(
                                        "w-8 h-1.5 rounded-full bg-white/50",
                                        imageData.title === imagesList[currImageIndex]?.title && "bg-white"
                                    )} 
                                    key={imageData.title}
                                    onClick={() => setCurrImageIndex(index)}
                                >
                                </div>
                            ))}
                        </div>

                        <button className="p-2 hover:bg-white/20 rounded-xl transition" onClick={handleNextImage}>
                            <ArrowRight className="text-white"/>
                        </button>
                    </div>
                    
                </div>
            </div>
        </motion.section>
    )
}