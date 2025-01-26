import { InferRequestType, InferResponseType } from "hono";
import { client } from "../../lib/rpc";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { toast } from "@repo/ui/hooks/form-hooks";


type ResponseType = InferResponseType<typeof client.api.authentication.login["$post"], 200>;
type RequestType  = InferRequestType<typeof client.api.authentication.login["$post"]>;


export const useLogin = () => {
    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({json}) => {
            const response = await client.api.authentication.login["$post"]({json});

            if(!response.ok) {
                throw new Error(JSON.stringify(await response.json()));
            };

            return await response.json();
        },
        onSuccess: (data, variables) => {
            signIn("credentials", {
                ...variables.json
            });
            toast.success("Login successfull")
        },
        onError: (error) => {
            let errorMsg = "An error occured";
            if(error.message) {
                const errorData = JSON.parse(error.message);
                errorMsg = errorData.error || errorMsg;
            };
            toast.error(errorMsg);
        }
    })

    return mutation;
}