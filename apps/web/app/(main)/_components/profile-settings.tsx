"use client"

import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import axios from "axios";
import { Edit, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { FaUserAstronaut } from "react-icons/fa6";
import { getSignedUrlAction } from "~/actions/s3-actions";
import { useGetUser } from "~/hooks/useGetUser";



export const ProfileSettings = () => {

    const session = useSession();
    const { data, isLoading } = useGetUser(session.data?.user.email as string);

    const [changeEmail, setChangeEmail] = useState(false);
    const [changeUsername, setChangeUsername] = useState(false);
    const [changePassword, setChangePassword] = useState(false);

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreviewUrl, setImagePreviewurl] = useState<string | null>(null);

    const handleInputchange = (e: ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files) {
            return
        };

        const file = e.target.files[0];
        if(file) {
            setImageFile(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewurl(reader.result as string)
            };
            reader.readAsDataURL(file);
        }  
    };


    const handleImageUpload = async () => {
        if(!imageFile) return;

        const signedUrlResult = await getSignedUrlAction({
            fileSize: imageFile.size,
            fileType: imageFile.type,
        });
        
        if( !!signedUrlResult.error && signedUrlResult.error !== undefined) {
            // Add toast
            console.log(signedUrlResult.error);
            return;
        };

        const url  = signedUrlResult.success?.url;
        console.log(url);

        try {
            const res = await axios.put(url!, imageFile , { headers: { "Content-Type": imageFile.type } });
        } catch (error) {
            console.log('Error uploading file')
            return;
        }

        data!.image = url!.split("?")[0]; 
        setImageFile(null);
        setImagePreviewurl(null);
    }


    if(isLoading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <div className="space-y-8 my-4 lg:my-6 px-4 md:px-5 lg:px-8 lg:w-[650px]">
            <h3 className="text-3xl font-medium">My Profile</h3>

            <div>
                {data?.image && (
                    <div className="relative w-32">
                        <img 
                            src={imageFile ? imagePreviewUrl as string : data.image}
                            className="h-32 w-32 rounded-full object-cover"
                        />
                        <div className="absolute right-1 bottom-2">
                            <label>
                                <input 
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => handleInputchange(e)}
                                    accept="image/jpeg, image/png, image/webp, image/jpg"
                                />
                                <div className="bg-primary p-2 rounded-full">
                                    <Edit className="w-4 h-4"/>
                                </div>
                            </label>
                        </div>
                        {imageFile && (
                                <div className="absolute left-full top-1/2 ml-2 -translate-y-1/2 flex items-center gap-x-2">
                                    <Button
                                        className=" bg-green-600 text-white"
                                        variant={"secondary"}
                                        size={"sm"}
                                        onClick={handleImageUpload}
                                    >
                                        Upload
                                    </Button>

                                    <Button
                                        className="h-8 w-8"
                                        variant={"ghost"}
                                        size={"icon"}
                                        onClick={() => {
                                            setImageFile(null);
                                            setImagePreviewurl(null);
                                        }}
                                    >
                                        <X className="h-4 w-4"/>
                                    </Button>
                                </div>
                            )}
                    </div>
                )}
                {!data?.image && (
                    <div className="w-32 h-32 rounded-full border-2 border-red-500 border-opacity-15 bg-red-200 dark:bg-gradient-to-tr dark:from-red-400 dark:to-red-900 hover:shadow-sm transition transform duration-300 cursor-pointer group relative">
                        <label>
                            <input 
                                type="file"
                                className="hidden"
                                onChange={(e) => handleInputchange(e)}
                                accept="image/jpeg, image/png, image/webp, image/jpg"
                            />
                            {!imageFile && (
                                <FaUserAstronaut className="w-full h-full rounded-full p-2"/>
                            )}
                            {imageFile && (
                                <img 
                                    src={imagePreviewUrl as string}
                                    className="w-full h-full rounded-full object-cover"
                                />
                            )}
                        </label>
                        {!imageFile && (
                            <span className="group-hover:inline-block transition transform duration-300 hidden absolute left-full top-1/2 ml-2 -translate-y-1/2 px-2 text-sm bg-secondary p-1.5 rounded-xl ">Update</span>
                        )}
                        {imageFile && (
                            <div className="absolute left-full top-1/2 ml-2 -translate-y-1/2 flex items-center gap-x-2">
                                <Button
                                    className=" bg-green-600 text-white"
                                    variant={"secondary"}
                                    size={"sm"}
                                    onClick={handleImageUpload}
                                >
                                    Upload
                                </Button>

                                <Button
                                    className="h-8 w-8"
                                    variant={"ghost"}
                                    size={"icon"}
                                    onClick={() => {
                                        setImageFile(null);
                                        setImagePreviewurl(null);
                                    }}
                                >
                                    <X className="h-4 w-4"/>
                                </Button>
                            </div>
                        )}
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
                            <Input type="password"/>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm font-medium">New password:</p>
                            <Input type="password"/>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm font-medium">confirm new password:</p>
                            <Input type="password"/>
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