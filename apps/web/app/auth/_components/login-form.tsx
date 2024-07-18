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
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";
import {motion} from "framer-motion";


export const Loginform = () => {

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        console.log(values);
    }

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
                        className="space-y-8" 
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="space-y-4">
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
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button 
                            type="submit"
                            className="w-full text-sm font-semibold" 
                            size="sm"
                        >
                            Login
                        </Button>
                    </form>
                </Form>
            </AuthFormWrapper>
        </motion.div>
    )
}