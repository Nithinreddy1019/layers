"use client"

import { Button } from "@repo/ui/components/ui/button"
import { 
    Card,
    CardHeader,
    CardContent,
    CardFooter,
    CardTitle
} from "@repo/ui/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { FcGoogle } from "react-icons/fc";


import { useForm, zodResolver } from "@repo/ui/hooks/form-hooks";

import Image from "next/image"
import Link from "next/link"
import { z } from "zod";
import { SignInSchema } from "../../schemas/authentication/schemas";
import { 
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import { Separator } from "@repo/ui/components/ui/separator";
import { motion } from "motion/react";


export const SignInForm = () => {


    const form = useForm<z.infer<typeof SignInSchema>>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });


    const onSubmit = (values: z.infer<typeof SignInSchema>) => {
        console.log(values);
    }

    return (
        <Card className="w-full h-full border-none shadow-none flex flex-col">
            <motion.div 
                initial={{
                    opacity: 0,
                    y: -20
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.5,
                    ease: "easeIn"
                }}
                className="flex items-center justify-between py-2"
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
            
            <div className="flex-1 flex justify-center flex-col max-w-[724px]">
            <motion.div
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
                <CardHeader className="">
                    <CardTitle>
                        Sign-in
                    </CardTitle>
                    <p>Enter your Email and password</p>
                </CardHeader>
            </motion.div>
            
            <CardContent className="space-y-6">
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
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field}
                                                type="email"
                                                placeholder="Email"
                                            />
                                        </FormControl>
                                        <FormMessage  className="text-xs"/>
                                    </FormItem>
                                )}
                            />

                            <FormField 
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field}
                                                type="password"
                                                placeholder="Password"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs"/>
                                    </FormItem>
                                )}
                            />

                            <Link href="/forgot-password" className="text-xs text-purple-500">
                                Forgot password?
                            </Link>

                        </div>

                        <Button 
                            className="w-full" 
                            type="submit"
                            size="sm"
                        >
                            Sign-in
                        </Button>
                    </motion.form>
                </Form>

                <Separator />

                <motion.div 
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
                    className="flex items-center gap-x-2 w-full"
                >
                    <Button 
                        className="flex-1"
                        variant="secondary"
                    >
                        <FcGoogle />
                        Google
                    </Button>
                </motion.div>
            </CardContent>
            </div>

            <CardFooter className="items-end">
                <motion.div 
                    initial={{
                        opacity: 0,
                        y: 10
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.5,
                        ease: "easeIn"
                    }}
                    className="flex items-center text-sm gap-x-1"
                >
                    <p>Need an account?</p>
                    <Link className=" text-purple-700 hover:underline" href="/signup">
                        Sign up here
                    </Link>
                </motion.div>
            </CardFooter>
        </Card>
    )
}