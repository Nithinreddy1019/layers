"use client"

import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { motion } from "framer-motion";
import { useState } from "react";

interface UserProfileChangeProps {
    changeSubject: "email" | "username" | "password",
    onClick: (value: string) => void,
    value?: string
}

export const UserProfileChange = ({
    changeSubject,
    onClick,
    value
}: UserProfileChangeProps) => {

    const [entityIsVisible, setEntityIsVisible] = useState(false);

    const isEmailOrUsername = changeSubject === "email" || changeSubject === "username"

    return (
        <>
            {isEmailOrUsername && (
                <div className="py-4 w-full border-b dark:border-gray-900">
                {!entityIsVisible && (
                    <div
                        className="flex flex-wrap items-center justify-between gap-x-2.5 text-sm font-semibold mb-4">
                        <div>
                            <p>{changeSubject === "email" ? "Email:" : "Username:" }</p>
                            <p className="text-normal font-normal">{value}</p>
                        </div>
                        <Button 
                            className="font-norm h-fit p-0 px-3 py-1.5 text-xs" 
                            variant={"secondary"}
                            onClick={() => setEntityIsVisible(true)}
                        >
                            Edit
                        </Button>
                    </div>
                )}

                {entityIsVisible && (
                    <motion.div
                        initial={{opacity: 0, y:-20}}
                        animate={{opacity: 1, y:0}}
                        exit={{opacity: 0, y:-20}}
                        transition={{
                            duration: 0.5
                        }}
                        className="flex flex-col items-start gap-2"
                    >
                        <p className="text-sm font-semibold">{changeSubject === "email" ? "Email:" : "Username:"}</p>
                        <Input
                            value={value}
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
                                onClick={() => setEntityIsVisible(false)}
                            >
                                Cancel
                            </Button>
                            <Button size="sm">
                                Update {changeSubject}
                            </Button>
                        </motion.div>
                    </motion.div>
                )}
                </div>
            )}

            {!isEmailOrUsername && (
                <div className="py-4 w-full border-b dark:border-gray-900">
                    {!entityIsVisible && (
                    <div className="flex flex-wrap items-center justify-between gap-x-2.5 text-sm font-semibold mb-4">
                        <div>
                            <p>Password:</p>
                            <p className="text-normal font-normal">********</p>
                        </div>
                        <Button 
                            className="font-norm h-fit p-0 px-3 py-1.5 text-xs" 
                            variant={"secondary"}
                            onClick={() => setEntityIsVisible(true)}
                        >
                            Edit
                        </Button>
                    </div>
                    )}

                    {entityIsVisible && (
                        <motion.div
                            initial={{opacity: 0, y:-20}}
                            animate={{opacity: 1, y:0}}
                            exit={{opacity: 0, y:-20}}
                            transition={{
                                duration: 0.5
                            }}
                            className="flex flex-col items-start gap-2"
                        >
                            <p className="text-sm font-medium">Old password:</p>
                            <Input
                                value={value}
                            />

                            <p className="text-sm font-medium">New password:</p>
                            <Input
                                value={value}
                            />

                            <p className="text-sm font-medium">Confirm new password:</p>
                            <Input
                                value={value}
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
                                    onClick={() => setEntityIsVisible(false)}
                                >
                                    Cancel
                                </Button>
                                <Button size="sm">
                                    Update {changeSubject}
                                </Button>
                            </motion.div>
                        </motion.div>
                    )}
                </div>
            )}
        </>
        
    )
}