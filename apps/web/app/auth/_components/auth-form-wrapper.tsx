"use client"

import { 
    Card,
    CardHeader,
    CardContent,
    CardFooter
} from "@repo/ui/components/card"
import Image from "next/image";
import React from "react"
import { BackButton } from "./back-button"
import { Socials } from "./socials"


interface AuthFormWrapperProps {
    children: React.ReactNode,
    headerLabel: string,
    backButtonLabel: string,
    backButtonHref: string,
    showSocials?: boolean
}

export const AuthFormWrapper = ({
    children,
    headerLabel,
    backButtonHref,
    backButtonLabel,
    showSocials
}: AuthFormWrapperProps) => {
    return (
        <Card className="border-none bg-transparent w-full shadow-none">
            <CardHeader className="space-y-3">
                <div className="flex items-center gap-x-2">
                    <Image 
                        src={"/logo.svg"}
                        height={35}
                        width={35}
                        alt="Logo"
                    />
                    <p className="text-lg font-medium text-[#DC2626]">Blinde</p>
                </div>
                <p className="font-medium text-sm">{headerLabel}</p>
            </CardHeader>
            {showSocials && (
                <CardFooter>
                    <Socials />
                </CardFooter>
            )}
            <CardContent>
                {children}
            </CardContent>
            
            <CardFooter>
                <BackButton 
                    label={backButtonLabel}
                    href={backButtonHref}
                />
            </CardFooter>
        </Card>
    )
}