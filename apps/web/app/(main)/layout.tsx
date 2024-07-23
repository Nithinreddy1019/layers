import { Navbar } from "./_components/navbar";
import { Navigation } from "./_components/navigation";
import { Sidebar } from "./_components/sidebar";

const MainLayout = ({
    children
}: { children: React.ReactNode }) => {
    return (
        <main className="h-screen flex w-screen">
            <div className="">
                <Sidebar />
                <Navigation />
                <Navbar />
            </div>
            <div className="flex-1 overflow-y-auto">
                <div className="relative top-14 bg-">
                    {children}
                </div>
            </div>
        </main>
    );
}
 
export default MainLayout;