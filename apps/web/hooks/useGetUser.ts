import { useEffect, useState } from "react";
import axios from "axios";
import * as z from "zod";
import { ProfileSchema } from "@repo/schemas/user-schema";


export const useGetUser = (email: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<z.infer<typeof ProfileSchema>>();

    useEffect(() => {

        const getDetails = async () => {
            if(!email) return;
            
            setIsLoading(true);
            try {
                const res = await axios.post("http://localhost:3001/api/user", {
                    email: email
                });

                setData(res.data);
            } catch (error) {
                console.log("error occured")
            } finally {
                setIsLoading(false)
            }
        }

        getDetails();

    }, [email])

    return { data, isLoading }
}