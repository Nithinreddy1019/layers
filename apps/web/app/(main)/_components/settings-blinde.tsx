"use client"

import { Button } from "@repo/ui/components/button"
import { cn } from "@repo/ui/lib/utils";
import { Bell, EllipsisVertical, Settings2, User } from "lucide-react"
import { useState } from "react";
import { ProfileSettings } from "./profile-settings";
import { AdvancedSettings } from "./advanced-settings";
import { NotificationSettings } from "./notification-settings";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@repo/ui/components/dropdown-menu";


export const SettingsBlinde = () => {

    const settingsItems = [
        {
            title: "My Profile",
            icon: User
        },
        {
            title: "Advanced",
            icon: Settings2
        },
        {
            title: "Notifications",
            icon: Bell
        }
    ];

    const [selectedTab, setSelectedTab] = useState<string | null>(settingsItems[0]?.title as string);

    return (
        <div className="h-full flex rounded-xl border border-secondary border-opacity-50 shadow-sm px-2 relative">
            <div className="hidden lg:block lg:w-52 py-4 border-r border-secondary pr-2 h-full fixed">
                <aside
                    className="flex flex-col gap-y-2"
                >
                    {settingsItems.map((tab, index) => (
                        <Button
                            key={index}
                            className={cn("w-full flex items-center justify-start gap-x-4 mt-2 p-0 px-4", selectedTab === tab.title && "bg-accent text-accent-foregroun")}
                            variant={"ghost"}
                            size={"lg"}
                            onClick={() => setSelectedTab(tab.title)}
                        >
                            <tab.icon className="h-4 w-4" strokeWidth={2}/>
                            <p className="">{tab.title}</p>
                        </Button>
                    ))}
                </aside>
            </div>
            <div className="lg:hidden absolute top-6 right-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <EllipsisVertical />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="border-secondary py-0 my-0">
                            {settingsItems.map((tab, index) => (
                                <DropdownMenuItem className="p-0 my-1">
                                    <Button
                                        key={index}
                                        className={cn("w-full flex items-center justify-start gap-x-4 p-0 px-4 rounded-[12px]", selectedTab === tab.title && "bg-accent text-accent-foregroun")}
                                        variant={"ghost"}
                                        size={"sm"}
                                        onClick={() => setSelectedTab(tab.title)}
                                    >
                                        <tab.icon className="h-4 w-4" strokeWidth={2}/>
                                        <p className="">{tab.title}</p>
                                    </Button>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
            </div>
            <div className="flex-1 lg:absolute lg:left-56">
                {selectedTab === settingsItems[0]?.title as string && (
                    <ProfileSettings />
                )}
                {selectedTab === settingsItems[1]?.title as string && (
                    <AdvancedSettings />
                )}
                {selectedTab === settingsItems[2]?.title as string && (
                    <NotificationSettings />
                )}
            </div>
        </div>
    )
}