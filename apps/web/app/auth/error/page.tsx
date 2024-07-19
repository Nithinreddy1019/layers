

import { IoIosArrowRoundBack } from "react-icons/io";



const ErrorPage = () => {
    return (
        <div className="h-full flex items-center justify-center gap-6">
            <h1 className="text-3xl font-medium">Oops! Something went wrong.</h1>
            <div className="flex items-center gap-x-2">
                <IoIosArrowRoundBack className="h-4 w-4"/>
                Go back.
            </div>
        </div>
    );
}
 
export default ErrorPage;