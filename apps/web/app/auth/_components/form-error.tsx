
import { HiExclamationTriangle } from "react-icons/hi2";

interface FormErrorProps {
    message: string | undefined
}

export const FormError = ({
    message
}: FormErrorProps) => {

    if (!message) return null;

    return (
        <div className="flex items-center gap-x-2 px-4 py-2 rounded-md bg-destructive text-white">
            <HiExclamationTriangle className="h-4 w-4"/>
            <p className="text-sm">{message}</p>
        </div>
    )
}