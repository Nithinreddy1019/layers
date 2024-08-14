"use client"

import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { FaUserAstronaut } from "react-icons/fa6";
import { useGetUser } from "~/hooks/useGetUser";



export const ProfileSettings = () => {

    const session = useSession();
    const { data, isLoading } = useGetUser(session.data?.user.email as string);

    const [ changeEmail, setChangeEmail] = useState(false);
    const [ changeUsername, setChangeUsername] = useState(false);
    const [ changePassword, setChangePassword] = useState(false);

    if(isLoading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <div className="space-y-8 my-4 lg:my-6 px-2 lg:px-8 lg:w-[650px]">
            <h3 className="text-3xl font-medium">My Profile</h3>

            <div>
                {data?.image && (
                    <Image 
                        src={data.image}
                        height={125}
                        width={125}
                        alt="profile image"
                        className="rounded-full"
                    />
                )}
                {!data?.image && (
                    <div className="w-32 h-32 rounded-full border-2 border-red-500 border-opacity-15 bg-red-200 dark:bg-gradient-to-tr dark:from-red-400 dark:to-red-900 hover:shadow-sm transition transform duration-300 cursor-pointer group relative">
                        <label>
                            <input 
                                type="file"
                                className="hidden"
                            />
                            <FaUserAstronaut className="w-full h-full rounded-full p-2"/>
                        </label>
                        <span className="group-hover:inline-block transition transform duration-300 hidden absolute left-full top-1/2 ml-2 -translate-y-1/2 px-2 text-sm bg-secondary p-1.5 rounded-xl ">update</span>
                    </div>
                )}
            </div>

            {/* details */}
            <div className="w-full">
                {!changeEmail && data?.credentials && (
                    <div className="flex items-center justify-between mb-4 py-2">
                        <div className="space-y-1">
                            <p className="text-sm font-medium">Email:</p>
                            <p>{data?.email}</p>
                        </div>
                        <Button size={"sm"} variant={"secondary"} onClick={() => setChangeEmail(true)}>
                            Change
                        </Button>
                    </div>
                )}
                {changeEmail && data?.credentials && (
                    <div className="flex flex-col gap-y-2 mb-4 py-2">
                        <p className="text-sm font-medium">Email:</p>
                        <Input 
                            value={data?.email}
                        />

                        <div className="flex items-center gap-x-2">
                            <Button variant={"ghost"} size={"sm"}>
                                Update
                            </Button>
                            <Button  size={"sm"} onClick={() => setChangeEmail(false)}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                )}


                {!changeUsername && data?.credentials && (
                    <div className="flex items-center justify-between mb-4 py-2">
                        <div className="space-y-1">
                            <p className="text-sm font-medium">Username:</p>
                            <p>{data?.username}</p>
                        </div>
                        <Button size={"sm"} variant={"secondary"} onClick={() => setChangeUsername(true)}>
                            Change
                        </Button>
                    </div>
                )}
                {changeUsername && data?.credentials && (
                    <div className="flex flex-col gap-y-2 mb-4 py-2">
                        <p className="text-sm font-medium">Username:</p>
                        <Input 
                            value={data?.username}
                        />

                        <div className="flex items-center gap-x-2">
                            <Button variant={"ghost"} size={"sm"}>
                                Update
                            </Button>
                            <Button size={"sm"} onClick={() => setChangeUsername(false)}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                )}

                {!changePassword && data?.credentials && (
                    <div className="flex items-center justify-between mb-4 py-2">
                        <div className="space-y-1">
                            <p className="text-sm font-medium">Password:</p>
                            <p>* * * * * *</p>
                        </div>
                        <Button size={"sm"} variant={"secondary"} onClick={() => setChangePassword(true)}>
                            Change
                        </Button>
                    </div>
                )}
                {changePassword && data?.credentials && (
                    <div className="flex flex-col gap-y-2 mb-4 py-2">
                        <p className="text-sm font-medium">Password:</p>

                        <div className="space-y-2">
                            <p className="text-sm font-medium">Old password:</p>
                            <Input/>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm font-medium">New password:</p>
                            <Input/>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm font-medium">confirm new password:</p>
                            <Input/>
                        </div>

                        <div className="flex items-center gap-x-2">
                            <Button variant={"ghost"} size={"sm"}>
                                Update
                            </Button>
                            <Button size={"sm"} onClick={() => setChangePassword(false)}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}