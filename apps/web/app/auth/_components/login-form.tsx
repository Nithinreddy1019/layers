"use client"

import { useForm } from "react-hook-form"
import { AuthFormWrapper } from "./auth-form-wrapper"
import * as z from "zod";
import { LoginSchema } from '@repo/schemas/user-schema'
import { zodResolver } from '@hookform/resolvers/zod';
import { 
    Form,
    FormItem,
    FormControl,
    FormMessage,
    FormLabel,
    FormField
} from "@repo/ui/components/form";
import { 
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot 
} from "@repo/ui/components/input-otp";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";
import {motion} from "framer-motion";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { useState, useTransition } from "react";
import { LoginAction } from "~/actions/login-action";
import { useSearchParams } from "next/navigation";
import Link from "next/link";


export const Loginform = () => {

    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? 
                        "Email already in use with another account" :
                        ""

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string| undefined>("");
    const [isPending, setTransition] = useTransition();

    const [showTwoFactor, setShowTwoFactor] = useState(false);

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
            code: ""
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("")

        setTransition(() => {
            LoginAction(values)
            .then((data) => {
                if(data.error) {
                    form.reset();
                    setError(data.error)
                };

                if(data.success) {
                    form.reset();
                    setSuccess(data.success)
                };

                if(data.twoFactor) {
                    setShowTwoFactor(true);
                };
            })
            .catch(() => {})
        });

    };

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{
                duration: 1.4
            }} 
            className="flex flex-col items-center w-[350px] md:w-[50%] lg:w-2/3">
            <AuthFormWrapper
                headerLabel="Login to continue to Blinde"
                backButtonLabel="Don't have an account?"
                backButtonHref="/auth/register"
                showSocials
            >
                <Form {...form}>
                    <form
                        className="space-y-6" 
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="space-y-4">
                            {!showTwoFactor &&
                                <>
                                    <FormField 
                                        control={form.control}
                                        name="email"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Email
                                                </FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        {...field}
                                                        type="email"
                                                        placeholder="email@gmail.com"
                                                        disabled={isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField 
                                        control={form.control}
                                        name="password"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Password
                                                </FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        {...field}
                                                        type="password"
                                                        placeholder="******"
                                                        disabled={isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </>
                            }
                            {showTwoFactor && (
                                <FormField 
                                control={form.control}
                                name="code"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Two Factor Code
                                        </FormLabel>
                                        <FormControl>
                                            {/* <Input 
                                                {...field}
                                                disabled={isPending}
                                            /> */}
                                            <InputOTP maxLength={6} {...field}>
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={0}/>
                                                    <InputOTPSlot index={1}/>
                                                    <InputOTPSlot index={2}/>
                                                </InputOTPGroup>
                                                <InputOTPSeparator />
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={3}/>
                                                    <InputOTPSlot index={4}/>
                                                    <InputOTPSlot index={5}/>
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                />
                            )}
                        </div>
                        <FormError message={error || urlError}/>
                        <FormSuccess message={success}/>
                        
                        <Button asChild variant={"link"} size={"sm"} className="p-0 m-0">
                            <Link href={"/auth/reset"}>
                                Forgot password?
                            </Link>
                        </Button>

                        <Button 
                            type="submit"
                            className="w-full text-sm font-semibold mt-8" 
                            size="sm"
                            disabled={isPending}
                        >
                            {showTwoFactor ? "Confirm" : "Login"}
                        </Button>
                    </form>
                </Form>
            </AuthFormWrapper>
        </motion.div>
    )
}