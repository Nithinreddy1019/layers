"use client"

import { Button } from "@repo/ui/components/button"
import { Switch } from "@repo/ui/components/switch";
import { cn } from "@repo/ui/lib/utils";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ActionImages } from "~/lib/constants";
import { FormatdateRelative } from "~/lib/utils";

interface WorkflowProps {
    flowdata: string[],
    workflowName: string,
    LastEdited: Date,
    status: boolean,
    id: string
}


export const Workflow = ({
    flowdata,
    workflowName,
    LastEdited,
    status,
    id
}: WorkflowProps) => {

    const router = useRouter();

    const [switchValue, setSwitchValue] = useState(status)

    const newFlowdata = flowdata.length > 3 ? flowdata.slice(0, 3) : flowdata;
    const extraLength = flowdata.length > 3 ? flowdata.length - 3 : 0;

    const handleStatusChange = async (newValue: boolean) => {
        setSwitchValue(newValue)

        // Update operation
    }

    return (
        <>
            <div className="hidden lg:flex items-center justify-between py-4 px-2 border-b dark:border-secondary dark:bg-[#121212] bg-white text-sm">
                <div className="flex items-center">
                    <div className="min-w-32 text-center flex items-center justify-center">
                        {newFlowdata.map((x) => {
                            const Logo = ActionImages[x]
                            if(!Logo) return;
                            return <Logo className="size-5 border dark:border-secondary flex items-center justify-center"/>
                        })}
                        <p className={cn("hidden", extraLength && "block")}>+{extraLength}</p>
                    </div>
                    <a 
                        href={`/editor/${id}`} 
                        className="hover:underline"
                    >
                        {workflowName}
                    </a>
                </div>

                <div className="flex items-center">
                        <p className="min-w-20 mr-6 text-center">{FormatdateRelative(new Date(LastEdited))}</p>
                        <div className="min-w-20 mr-14 flex flex-col text-[10px] items-center">
                            <Switch 
                                checked={switchValue}
                                onCheckedChange={handleStatusChange}
                            />
                            <p>{switchValue ? "ON" : "OFF"}</p>
                        </div>

                        <div className="w-12">
                            <Button 
                                variant={"secondary"} 
                                size={"sm"}
                                className="p-0 px-2 rounded-sm" 
                                onClick={() => router.push(`/editor/${id}`)}
                            >
                                <ChevronRight className="size-4"/>
                            </Button>
                        </div>
                </div>
            </div>


            {/* Mobile responsive */}
            <div className="flex lg:hidden shadow-sm border dark:border-secondary min-h-36 m-2 py-2 px-4 rounded-lg justify-between items-center text-sm md:text-[16px]">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center text-xs">
                        {newFlowdata.map((x, index) => {
                            const Logo = ActionImages[x]
                            if(!Logo) return;
                            return <Logo className="size-6 border dark:border-secondary rounded flex items-center justify-center"/>
                        })}
                        <p className={cn("hidden", extraLength && "block")}>+{extraLength}</p>
                    </div>

                    <a 
                        href={`/editor/${id}`} 
                        className="hover:underline"
                    >
                        {workflowName}
                    </a>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="min-w-20 mr-2 flex gap-2 text-[10px] items-center">
                            <Switch 
                                checked={switchValue}
                                onCheckedChange={handleStatusChange}
                            />
                            <p>{switchValue ? "ON" : "OFF"}</p>
                        </div>
                        <Button variant={"secondary"} className="px-2 py-1" size={"sm"}>
                            <ChevronRight className="size-4"/>
                        </Button>
                    </div>
                    <p className="min-w-20 mr-6 text-sm">{FormatdateRelative(new Date(LastEdited))}</p>
                </div>
            </div>
        </>
    )
}