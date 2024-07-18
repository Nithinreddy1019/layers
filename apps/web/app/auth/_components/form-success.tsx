import { FaCheck } from "react-icons/fa";


interface FormSuccessProps {
    message: string | undefined
}

export const FormSuccess = ({
    message
}: FormSuccessProps) => {

    if (!message) return null;

    return (
        <div className="flex items-center gap-x-2 px-4 py-2 rounded-md bg-emerald-600/50 text-white">
            <FaCheck className="h-4 w-4"/>
            <p className="text-sm">{message}</p>
        </div>
    )
}