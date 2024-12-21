import { useRouter } from "next/navigation";
import { client } from "../../lib/rpc";

import { InferRequestType, InferResponseType } from "hono";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@repo/ui/hooks/form-hooks";


type ResponseType = InferResponseType<typeof client.api.authentication.register["$post"], 200>;
type RequestType = InferRequestType<typeof client.api.authentication.register["$post"]>;


export const useRegister = () => {
    const router = useRouter();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ( json ) => {
            const response = await client.api.authentication.register["$post"](json);

            if(!response.ok) {
                throw new Error(JSON.stringify(await response.json()));
            };

            return await response.json()
        },
        onSuccess:() => {
            toast.success("Account created successfully");
            // TODO: Redirect to home page or aith flow instead of logiing in again
            router.push("/signin");
        },
        onError:(error) => {
            let errorMsg = "an error occured";
            if(error.message) {
                const errorData = JSON.parse(error.message);
                errorMsg = errorData.error || errorMsg;
            };
            toast.error(errorMsg);
        }
    });

    return mutation;
}