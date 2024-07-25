"use client"

import { ProfileSchema } from "@repo/schemas/user-schema";
import { ProfileCardWrapper } from "./profile-card-wrapper"
import { useForm } from "react-hook-form"
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { 
    Form,
    FormItem,
    FormField,
    FormControl,
    FormLabel,
    FormMessage
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";
import { useTransition } from "react";
import { Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import { useGetUser } from "~/hooks/useGetUser";


export const ProfileForm = () => {

    const [isPending, setTransition] = useTransition();
    const session = useSession();

    const email = session.data?.user.email as string;
    const { data, isLoading } = useGetUser(email);

    const form = useForm<z.infer<typeof ProfileSchema>>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
            email: "",
            username: "",
            password: ""
        }
    });


    const onSubmit = () => {

    }

    if(isLoading || !email) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <>
            <ProfileCardWrapper
                cardHeader="User Profile"
                cardSubHeader="Add or update your information."
            >
                <Form {...form}>
                    <form
                        className="space-y-6 mt-4"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="space-y-4">
                            <div>
                                Image Section
                            </div>
                            <FormField 
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field}
                                                type="email"
                                                value={data ? data.email : ""}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Username
                                        </FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field}
                                                type="text"
                                                value={data ? data.username : ""}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field}
                                                type="password"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={isPending}
                        >
                            {isPending ? (
                                <div className="flex items-center gap-x-2">
                                    <Loader className="animate-spin w-4 h-4"/>
                                    <p>Updating...</p>
                                </div>
                            ) : "Update Profile"}
                        </Button>
                    </form>
                </Form>
            </ProfileCardWrapper>
        </>
    )
}