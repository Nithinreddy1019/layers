import { ImageSlider } from "../../components/authentication/image-slider";



const AuthLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="w-full ">
            <div className="grid lg:grid-cols-2">
                <div>
                    {children}
                </div>
                <ImageSlider />
            </div>
        </div>
    );
}
 
export default AuthLayout;