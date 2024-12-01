


const LandingLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="w-full bg-neutral-950 min-h-screen">
            {children}
        </div>
    );
}
 
export default LandingLayout;