import { TriangleAlert } from "lucide-react"


interface ErrorMessageProps {
    message: string | undefined
}

export const ErrorMessage = ({
    message
}: ErrorMessageProps) => {

    if(!message) return;

    return (
        <div className="flex items-center px-4 py-1.5 rounded-lg bg-red-500/50 text-red-800 w-full max-w-sm">
            <TriangleAlert className="size-4 mr-2"/>
            <p className="text-sm">{message}</p>
        </div>
    )
}