
import { InferRequestType, InferResponseType } from "hono";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@repo/ui/hooks/form-hooks";
import { client } from "../../lib/rpc";

type ResponseType = InferResponseType<typeof client.api.authentication.reset["$patch"], 200>;
type RequestType = InferRequestType<typeof client.api.authentication.reset["$patch"]>;


export const useResetPassword = () => {

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({json, query}) => {
            const response = await client.api.authentication.reset["$patch"]({json, query});

            if(!response.ok) {
                throw new Error(JSON.stringify(await response.json()));
            };

            return await response.json();
        },
        onSuccess: () => {
            toast.success("Password updated.");
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