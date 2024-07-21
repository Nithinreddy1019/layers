import { Navbar } from "./_components/navbar";
import { Navigation } from "./_components/navigation";
import { Sidebar } from "./_components/sidebar";

const MainLayout = ({
    children
}: { children: React.ReactNode }) => {
    return (
        <main className="h-screen flex">
            <div className="h-full relative">
                <Sidebar />
                <Navigation />
            </div>
            <div className="h-full flex-1">
                <Navbar />
                {children}
            </div>
        </main>
    );
}
 
export default MainLayout;