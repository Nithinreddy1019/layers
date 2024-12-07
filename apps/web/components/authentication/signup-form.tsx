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
import { SignUpSchema } from "../../schemas/authentication/schemas";
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



export const SignUpForm = () => {


    const form = useForm<z.infer<typeof SignUpSchema>>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            username: "",
            email: "",
            password: ""
        }
    });


    const onSubmit = (values: z.infer<typeof SignUpSchema>) => {
        console.log(values);
    }

    return (
        <Card className="w-full h-full border-none shadow-none flex flex-col">
            <motion.div 
                className="flex items-center justify-between py-2"
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
                <CardHeader className="mt-8">
                    <CardTitle>
                        Sign-up
                    </CardTitle>
                    <p>Enter your credentials</p>
                </CardHeader>
            </motion.div>

            <CardContent className="space-y-5">
                <Form {...form}>
                    <motion.form
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
                        onSubmit={form.handleSubmit(onSubmit)} 
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            <FormField 
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field}
                                                type="text"
                                                placeholder="Username"
                                            />
                                        </FormControl>
                                        <FormMessage  className="text-xs"/>
                                    </FormItem>
                                )}
                            />

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
                        </div>

                        <Button 
                            className="w-full" 
                            type="submit"
                            size="sm"
                        >
                            Sign-up
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


            <CardFooter className="flex-1 items-end">
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
                    <p>Have an account?</p>
                    <Link className=" text-purple-700 hover:underline" href="/signin">
                        Sign in here
                    </Link>
                </motion.div>
            </CardFooter>
        </Card>
    )
}