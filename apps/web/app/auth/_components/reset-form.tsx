"use client"

import { useForm } from "react-hook-form"
import { AuthFormWrapper } from "./auth-form-wrapper"

import { 
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@repo/ui/components/form";


import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Input } from "@repo/ui/components/input";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { Button } from "@repo/ui/components/button";
import { ResetSchema } from "@repo/schemas/user-schema";
import { ResetAction } from "~/actions/reset-action";


export const ResetForm = () => {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: ""
        }
    });

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            ResetAction(values)
                .then((data) => {
                    setError(data.error)
                    setSuccess(data.success)
                })
        });
        
    }


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
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field}
                                                disabled={isPending}
                                                type="email"
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
                            disabled={isPending}
                            type="submit"
                            className="w-full"
                            size={"sm"}
                        >
                            Send reset mail
                        </Button>
                    </form>
                </Form>
            </AuthFormWrapper>
        </div>
    )
}