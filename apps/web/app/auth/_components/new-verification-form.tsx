"use client"

import { useSearchParams } from "next/navigation"
import { AuthFormWrapper } from "./auth-form-wrapper"
import { useCallback, useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";
import { newVerificationAction } from "~/actions/new-verification-action";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";




export const NewVerificationForm = () => {

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [ error, setError ] = useState<string | undefined>("");
    const [ success, setSuccess ] = useState<string | undefined>("");

    const onSubmit = useCallback(() => {
        if(!token) {
            setError("Token not found");
            return;
        }

        newVerificationAction(token)
            .then((data) => {
                setError(data.error);
                setSuccess(data.success)
            })
            .catch(() => {
                setError("Something went wrong!")
            })
    }, [token])
    
    useEffect(() => {
        onSubmit()
    },[onSubmit])

    return (
        <div className="flex">
            <AuthFormWrapper
                headerLabel="Please wait while we verify your email"
                backButtonLabel="Back to login"
                backButtonHref="/auth/login"
            >
                <div className="w-full flex items-center justify-center">
                    {!error && !success && (
                        <PropagateLoader className="w-4 h-4 text-[#DC2626]" color="#DC2626"/>
                    )}
                </div>
                <FormError message={error}/>
                <FormSuccess message={success}/>
            </AuthFormWrapper>
        </div>
    )
}