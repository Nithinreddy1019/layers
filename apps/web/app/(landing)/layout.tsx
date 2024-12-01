


const LandingLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="w-full bg-neutral-950 min-h-screen text-white">
            {children}
        </div>
    );
}
 
export default LandingLayout;