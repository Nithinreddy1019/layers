import { Button } from "@repo/ui/components/button";
import { auth, signOut } from "~/auth";

const HomePage = async () => {

    const session = await auth();
   

    return (
        <div>
            {JSON.stringify(session)}

            <form
                action={async () => {
                    "use server"

                    await signOut()
                }}
            >
                <Button type="submit">
                    Signout
                </Button>
            </form>
        </div>
    );
}
 
export default HomePage;