import { Button } from "@repo/ui/components/button";
import { auth, signOut } from "~/auth";

const HomePage = async () => {

    const session = await auth();
   

    return (
        <div className="">
            
        </div>
    );
}
 
export default HomePage;