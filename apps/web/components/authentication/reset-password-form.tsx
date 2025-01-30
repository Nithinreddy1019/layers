"use client"

import { Button } from "@repo/ui/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import { useForm, zodResolver } from "@repo/ui/hooks/form-hooks";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { BiLoader } from "react-icons/bi";

import * as z from "zod";
import { ResetPasswordSchema } from "../../schemas/authentication/schemas";
import { useEffect, useState } from "react";
import { useResetPassword } from "../../api/auth/use-reset-password";
import { redirect, useRouter, useSearchParams } from "next/navigation";

export const ResetPasswordForm = () => {


    const [isMounted, setIsMounted ] = useState(false);

    const searchParams = useSearchParams();
    const router = useRouter();

    const token = searchParams.get("token");

    const { mutate, isPending } = useResetPassword();

    const form = useForm<z.infer<typeof ResetPasswordSchema>>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: ""
        }
    });

    useEffect(() => {
        setIsMounted(true);
    });

    if(!isMounted) {
        return null;
    };


    const onSubmit = async (values: z.infer<typeof ResetPasswordSchema>) => {
        console.log(values);
        mutate({
            json: {
                newPassword: values.newPassword,
                confirmPassword: values.confirmPassword
            },
            query: {
                token: token as string
            }
        }, {
            onSuccess: () => {
                router.push("/sign-in")
            }
        })
    }


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
                    <h1 className="text-2xl font-semibold">Reset password</h1>
                    <p>Enter new password to reset</p>
                </div>

                <div className="mt-4 lg:w-full sm:w-2/3 w-full">
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
                                    name="newPassword"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>New password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Enter new password"
                                                    type="password"
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-xs"/>
                                        </FormItem>
                                    )}
                                />

                                <FormField 
                                    name="confirmPassword"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="confirm new password"
                                                    type="password"
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
                                        Updating...
                                    </div>
                                ) : (
                                    <p>Reset password</p>
                                )}
                            </Button>                            
                        </motion.form>
                    </Form>
                </div>
            </div>
        </div>
    )
}