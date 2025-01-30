
import { InferRequestType, InferResponseType } from "hono";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@repo/ui/hooks/form-hooks";
import { client } from "../../lib/rpc";

type ResponseType = InferResponseType<typeof client.api.authentication.forgot_password["$post"], 200>;
type RequestType = InferRequestType<typeof client.api.authentication.forgot_password["$post"]>;


export const useForgotPassword = () => {

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.authentication.forgot_password["$post"](json);

            if(!response.ok) {
                throw new Error(JSON.stringify(await response.json()));
            };

            return await response.json();
        },
        onSuccess: () => {
            toast.success("Reset link sent to email");
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