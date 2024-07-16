"use client"

import { useForm } from "react-hook-form"
import { AuthFormWrapper } from "./auth-form-wrapper"
import * as z from "zod";
import { RegisterSchema } from '@repo/schemas/user-schema'
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


export const Registerform = () => {

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            username: ""
        }
    })

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        console.log(values);
    }

    return (
        <div className="flex flex-col items-center w-[350px] md:w-[50%] lg:w-2/3">
            <AuthFormWrapper
                headerLabel="register to continue to blinde"
                backButtonLabel="Already have an account?"
                backButtonHref="/auth/login"
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
                                name="username"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            username
                                        </FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field}
                                                type="email"
                                                placeholder="what's your name?"
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
                            className="w-full text-sm font-bold" 
                            size="sm"
                        >
                            Register
                        </Button>
                    </form>
                </Form>
            </AuthFormWrapper>
        </div>
    )
}