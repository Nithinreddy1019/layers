import { Check, TriangleAlert } from "lucide-react"


interface SuccessMessageProps {
    message: string | undefined
}

export const SuccessMessage = ({
    message
}: SuccessMessageProps) => {

    if(!message) return;

    return (
        <div className="flex items-center px-4 py-1.5 rounded-lg bg-emerald-500/50 text-emerald-800 w-full max-w-sm">
            <Check className="size-4 mr-2"/>
            <p className="text-sm">{message}</p>
        </div>
    )
}