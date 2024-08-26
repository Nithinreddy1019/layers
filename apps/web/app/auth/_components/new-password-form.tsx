"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordSchema } from "@repo/schemas/user-schema";
import { useSearchParams } from "next/navigation"
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { AuthFormWrapper } from "./auth-form-wrapper";

import { 
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { Button } from "@repo/ui/components/button";
import { NewPasswordAction } from "~/actions/new-password-action";


export const NewPasswordForm = () => {

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] =  useTransition();


    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            newPassword: "",
            confirmNewPassword: ""
        }
    });

    
    const onSubmit = async (values: z.infer<typeof NewPasswordSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            NewPasswordAction(values, token)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                })
        })

    };

    return (
        <div className="min-w-96">
            <AuthFormWrapper
                headerLabel="Reset your password"
                backButtonLabel="Back to login"
                backButtonHref="/auth/login"
                showSocials={false}
            >
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            <FormField 
                                control={form.control}
                                name="newPassword"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>New password</FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field}
                                                disabled={isPending}
                                                type="password"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField 
                                control={form.control}
                                name="confirmNewPassword"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Confirm new password</FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field}
                                                disabled={isPending}
                                                type="password"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormError message={error}/>
                        <FormSuccess message={success}/>
                        
                        <Button
                            size={"sm"}
                            className="w-full"
                            type="submit"
                        >
                            Reset Password
                        </Button>

                    </form>
                </Form>
            </AuthFormWrapper>
        </div>
    )
}