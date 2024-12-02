import { cn } from "@repo/ui/lib/utils";
import { MousePointer2 } from "lucide-react"



export const Pointer = (props: {
    name: string,
    color?: "purple" | "violet"
}) => {

    const { name, color } = props;

    return (
        <div className="relative">
            <MousePointer2 className="size-5" fill="#6b21a8" color="white"/>
            <div className="relative left-4 top-full">
                <div className={cn(
                    "inline-flex rounded-full text-sm bg-purple-700 px-2.5 rounded-tl-none",
                    color === "violet" && "bg-violet-600"
                )}>{name}</div>
            </div>
        </div>
    )
}