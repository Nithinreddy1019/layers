"use client"

import { Button } from "@repo/ui/components/ui/button";
import { useForm, zodResolver } from "@repo/ui/hooks/form-hooks";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import * as z from "zod";
import { ForgotPasswordSchema } from "../../schemas/authentication/schemas";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import { BiLoader } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useForgotPassword } from "../../api/auth/use-forgot-password";


export const ForgotPasswordForm = () => {

    const [isMounted, setIsMounted] = useState(false);

    const { mutate, isPending } = useForgotPassword();
    

    const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
        resolver: zodResolver(ForgotPasswordSchema),
        defaultValues: {
            email: ""
        }
    });

    useEffect(() => {
        setIsMounted(true);
    });

    if(!isMounted) {
        return null;
    };


    const onSubmit = async (values: z.infer<typeof ForgotPasswordSchema>) => {
        mutate({
            json: {
                email: values.email
            }
        });
        form.reset()
    };


    return (
        <div className="flex flex-col w-full h-full gap-6">
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


                <Button variant="link" asChild>
                    <Link href="/sign-in" >
                        <ArrowLeft className="mr-2"/>
                        Go back
                    </Link>
                </Button>
            </motion.div>

            <div className="flex-1 flex flex-col items-center w-full justify-center lg:items-start">
                <div>
                    <h1 className="text-2xl font-semibold">Enter Email address</h1>
                    <p>You will receive a link to reset the password</p>
                </div>

                <div className="mt-4 lg:min-w-96 min-w-80">
                    <Form {...form}>
                        <motion.form 
                            onSubmit={form.handleSubmit(onSubmit)} 
                            className="space-y-6"
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            transition={{
                                duration: 0.5,
                                ease: "easeIn"
                            }}
                        >
                            <div className="space-y-4">
                                <FormField 
                                    name="email"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    {...field}
                                                    placeholder="Email"
                                                    type="email"
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-xs"/>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button 
                                className="w-full" 
                                type="submit"
                                size="sm"
                                disabled={isPending}
                            >
                                {isPending ? (
                                    <div className="flex items-center gap-2">
                                        <BiLoader className="animate-spin"/>
                                        Sending email
                                    </div>
                                ) : (
                                    <p>Send email</p>
                                )}
                            </Button>                            
                        </motion.form>
                    </Form>
                </div>
            </div>
        </div>
    )
}