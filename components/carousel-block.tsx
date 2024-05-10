"use client"


import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel";
import { Card, CardContent } from "./ui/card";
import { type CarouselApi } from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import eg from "@/public/eg.jpg";
import { useEffect, useState } from "react";


export const CarouselBlock = () => {

    const [api, setApi] = useState<CarouselApi>();
    const [currentImg, setCurrentImg] = useState<number>();


    useEffect(() => {
        if(!api) return;

        setCurrentImg(api.selectedScrollSnap())
        console.log(currentImg)

        api.on("select", () => {
            setCurrentImg(currentImg);
            console.log(currentImg)
        })

    },[api])

    return (
        <div className="hidden basis-1/3 shrink lg:flex justify-center items-center h-full w-full">
            <Carousel opts={{loop:true}} plugins={[Autoplay({delay: 5000})]} className="w-full max-w-xl">
                <CarouselContent className="-ml-5 -mb-1">
                    {Array.from({length:5}).map((_, index) => (
                        <CarouselItem key={index}>
                            <div className="p-1">
                                <Card className="border-none h-[100vh] bg-red-50 dark:bg-[#121212] rounded-none ">
                                    <CardContent className="flex aspect-screen items-center justify-center h-full">
                                        
                                        <Image 
                                            src={eg}
                                            width={500}
                                            height={750}
                                            alt="something"
                                        />
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselNext className="right-2"/>
                <CarouselPrevious className="left-2"/>

            </Carousel>
        </div>
    )
}

