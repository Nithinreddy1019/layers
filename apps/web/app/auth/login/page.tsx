import { Loginform } from "../_components/login-form";

const LoginPage = () => {
    
    return (
        <section className="h-full flex">
            <div className="hidden lg:block lg:flex-1 relative">
                
            </div>
            <div className="flex-1 flex items-center justify-center w-full">
                <Loginform />
            </div>
        </section>
    );
}
 
export default LoginPage;