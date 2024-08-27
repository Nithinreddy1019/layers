"use client"

import { Switch } from "@repo/ui/components/switch";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { getTwoFactorData } from "~/actions/get-data-actions";
import { updateTwoFactorAuthentication } from "~/actions/profile-actions";


export const AdvancedSettings = () => {

    const [switchValue, setSwitchValue] = useState(false);
    const [isPending, startTransition] = useTransition();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        const getData = async () => {
            await getTwoFactorData()
                .then((data) => {
                    if(data.error){

                    }
                    if(data.isTwoFactorEnabled) {
                        setSwitchValue(data.isTwoFactorEnabled)
                    }
                });
        }

        getData();

        setLoading(false);
    });


    if(loading) {
        return (
            <div>
                Loading....
            </div>
        )
    }


    const handleSwitchChange = (newValue: boolean) => {
        setSwitchValue(newValue);

        startTransition(() => {
            updateTwoFactorAuthentication(newValue)
            .then((data) => {
                if(data?.error) {
                    toast.error(data.error)
                } else {
                    toast.success(data?.success)
                };
            })
        })
    }


    return (
        <div className="space-y-4 my-4 lg:my-6 px-4 md:px-5 lg:px-8 lg:w-[650px] w-full flex items-center flex-col lg:block">
            <h3 className="text-3xl font-medium">Advanced Settings</h3>

            <div className="w-full flex justify-between items-center">
                <div>
                    <h4 className="text-lg font-semibold">Two-Factor Authentication</h4>
                    <p className="text-sm ">Add an extra layer of security to your blinde account.</p>
                </div>
                <div>
                    <Switch 
                        checked={switchValue}
                        onCheckedChange={handleSwitchChange}
                        disabled={isPending}
                    />
                </div>
            </div>
        </div>
    )
}