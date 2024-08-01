"use client"

import { ProfileCardWrapper } from "./profile-card-wrapper"
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";
import { useState, useTransition } from "react";
import { Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import { useGetUser } from "~/hooks/useGetUser";
import { motion } from "framer-motion"
import { UserProfileChange } from "./user-profile-change";


export const ProfileForm = () => {

    const [isPending, setTransition] = useTransition();

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
                
                   <UserProfileChange 
                        changeSubject="email"
                        value={data?.email as string}
                        onClick={(email) => {}}
                   />
                   <UserProfileChange 
                        changeSubject="username"
                        value={data?.username as string}
                        onClick={(username) => {}}
                   />
                   <UserProfileChange 
                        changeSubject="password"
                        onClick={(email) => {}}
                   />
            </ProfileCardWrapper>
        </>
    )
}