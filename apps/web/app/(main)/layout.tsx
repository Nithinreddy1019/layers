import { Navbar } from "./_components/navbar";
import { Navigation } from "./_components/navigation";
import { Sidebar } from "./_components/sidebar";

const MainLayout = ({
    children
}: { children: React.ReactNode }) => {
    return (
        <main className="h-screen flex">
                <Sidebar />
                <Navigation />
            <div className="h-full flex-1">
                <Navbar />
                <div className="absolute md:left-14 top-14">
                {children}
                </div>
            </div>
        </main>
    );
}
 
export default MainLayout;