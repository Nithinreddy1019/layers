import { Sidebar } from "./_components/sidebar";

const MainLayout = ({
    children
}: { children: React.ReactNode }) => {
    return (
        <main className="h-screen flex">
            <div className="h-full">
                <Sidebar />
            </div>
            <div className="h-full flex-1">
                {children}
            </div>
        </main>
    );
}
 
export default MainLayout;