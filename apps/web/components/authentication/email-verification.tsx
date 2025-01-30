"use client"
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";
import { useEmailVerification } from "../../api/auth/use-email-verification";
import { ErrorMessage } from "../error-message";
import { SuccessMessage } from "../success-message";
import Image from "next/image";
import { motion } from "motion/react";
import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Loader, Loader2 } from "lucide-react";


export const EmailVerification = () => {

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [success, setSuccess] = useState<string | null>();
    const [error, setError] = useState<string | null>();

    const { mutate, isPending } = useEmailVerification();


    const onSubmit = useCallback(() => {
        mutate({
            json: {
                token: token as string
            }
        },{
            onSuccess: () => {
                setSuccess("Email Verification successfull, Login now")
            },
            onError: (error) => {
                let errorMsg = "An error occured";
                if(error.message) {
                    const errorData = JSON.parse(error.message);
                    errorMsg = errorData.error || errorMsg;
                };
                setError(errorMsg)
            }
        });
    }, [token])

    useEffect(() => {
        onSubmit()
    }, [onSubmit]);

    return (
        <div className="h-full flex flex-col gap-6 w-full">
            <motion.div 
                className="flex items-center w-full justify-between py-2"
                initial={{
                    opacity: 0,
                    y: -10
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.5,
                    ease: "easeIn"
                }}
            >
                <Image 
                    src={"/assets/logo-light.svg"}
                    alt="logo"
                    width={125}
                    height={125}
                    className=""
                />

                <Button asChild variant="link">
                    <Link href={"/"}>
                        <ArrowLeft />
                        Go back
                    </Link>
                </Button>
            </motion.div>

            <div className="flex-1 flex flex-col w-full justify-center items-center lg:items-start gap-y-6 ">
                <div className="space-y-2.5 flex flex-col items-center lg:items-start">
                    <h1 className="text-2xl font-semibold">Email Verification</h1>
                    <p>Verify your email</p>
                </div>

                <div className="flex flex-col gap-4 w-full items-center lg:items-start">
                    
                    {(!error && !success) && (
                        <>
                            <span className="flex items-center gap-x-4">
                                <p>Please wait while we verify your email</p>
                                <Loader className="size-4 animate-spin"/>
                            </span>
                        </>
                    )}
                        
                    <ErrorMessage message={error as string}/>
                    <SuccessMessage message={success as string}/>
                </div>
            </div>

            <Link href={"/signin"}>
                <Button variant="link" className="text-purple-700 text-[16px]">
                    Sign in
                </Button>
            </Link>

        </div>
    )
}