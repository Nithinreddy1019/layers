import { SignUpForm } from "../../../components/authentication/signup-form";

const SignupPage = () => {
    return (
        <section className="h-screen">
            <div className="p-4 lg:pl-8 h-full flex flex-col items-center">
                <SignUpForm />
            </div>
        </section>
    );
} 
 
export default SignupPage;