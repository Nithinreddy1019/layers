"use client"

import { Workflow } from "./workflow";



export const ListWorkflows = () => {
    return (
        <div className="px-2 mx-auto relative min-h-full">
            <div className="sticky top-16 hidden lg:flex items-center justify-between py-5 border-b-2 dark:border-secondary dark:bg-[#121212] bg-white text-sm font-medium z-50">
                <div className="flex items-center">
                    <p className="min-w-36 text-center">Icons</p>
                    <p>Name</p>
                </div>
                <div className="flex items-center">
                    <p className="min-w-20 mr-10">Last edited</p>
                    <p className="min-w-20 mr-12">Status</p>
                </div>
            </div>

            {/* Add workflows */}
            <Workflow 
                id="jkhgjhg"
                flowdata={["Gmail", "Notion", "Github", "Notion", "Discord", "Drive"]}
                workflowName="Personal"
                LastEdited={new Date("Tue Sep 03 2024 07:51:05 GMT+0530 (India Standard Time)")}
                status={false}
            />
            <Workflow 
                id="jkhgjhg"
                flowdata={["Gmail", "Drive", "Discord"]}
                workflowName="Personal"
                LastEdited={new Date("Tue Sep 01 2023 03:51:05 GMT+0530 (India Standard Time)")}
                status={true}
            />
            
        </div>
    )
};