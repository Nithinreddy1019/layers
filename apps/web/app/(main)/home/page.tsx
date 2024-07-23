import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { auth, signOut } from "~/auth";

const HomePage = async () => {

    const session = await auth();
   

    return (
        <div className="">
            <h1 className="text-7xl font-bold">How is it not working?</h1>
            <h1 className="text-7xl font-bold">How is it not working?</h1>

            <h1 className="text-7xl font-bold">How is it not working?</h1>

            <h1 className="text-7xl font-bold">How is it not working?</h1>

            <h1 className="text-7xl font-bold">How is it not working?</h1>


        </div>
    )
}
 
export default HomePage;