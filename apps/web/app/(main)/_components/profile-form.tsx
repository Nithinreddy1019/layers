"use client"

import { ProfileCardWrapper } from "./profile-card-wrapper"
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";
import { useState, useTransition } from "react";
import { Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import { useGetUser } from "~/hooks/useGetUser";
import { motion } from "framer-motion"


export const ProfileForm = () => {

    const [isPending, setTransition] = useTransition();

    const [emailChangeIsVisible, setEmailChangeIsVisible] = useState(false);
    const [passwordChangeIsVisible, setPasswordChangeIsvisible] = useState(false);
    const [usernamechangeIsvisible, setUsernameChangeIsvisible] = useState(false);

    const session = useSession();
    const email = session.data?.user.email as string;
    const { data, isLoading } = useGetUser(email);


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
                <div className="py-4 w-full border-b dark:border-gray-900">
                    {!emailChangeIsVisible && (
                        <div className="flex flex-wrap items-center justify-between gap-x-2.5 text-sm font-semibold mb-4">
                        <div>
                            <p>Email:</p>
                            <p className="text-normal font-normal">{data?.email}</p>
                        </div>
                        <Button  
                            className="font-norm h-fit p-0 px-3 py-1.5 text-xs" 
                            variant={"secondary"}
                            onClick={() => setEmailChangeIsVisible(true)}
                        >
                            Edit
                        </Button>
                    </div>
                    )}

                    {emailChangeIsVisible && (
                        <motion.div
                            initial={{opacity: 0, y:-20}}
                            animate={{opacity: 1, y:0}}
                            exit={{opacity: 0, y:-20}}
                            transition={{
                                duration: 0.5
                            }}
                            className="flex flex-col items-start gap-2"
                        >
                            <p className="text-sm font-semibold">Email:</p>
                            <Input 
                                value={data?.email}
                            />

                            <motion.div
                                initial={{opacity: 0, y:30}}
                                animate={{opacity: 1, y:0}}
                                exit={{opacity: 0, y:20}}
                                transition={{
                                    duration: 0.5
                                }}
                                className="flex items-center gap-x-2">
                                <Button 
                                    variant="secondary" 
                                    size="sm"
                                    onClick={() => setEmailChangeIsVisible(false)}
                                >
                                    Cancel
                                </Button>
                                <Button size="sm">
                                    Update email
                                </Button>
                            </motion.div>
                        </motion.div>
                    )}
                </div>
                   
            </ProfileCardWrapper>
        </>
    )
}