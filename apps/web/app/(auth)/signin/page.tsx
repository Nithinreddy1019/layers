import { SignInForm } from "../../../components/authentication/signin-form";

const SigninPage = () => {
    return (
        <section className="h-screen">
            <div className="p-4 lg:pl-8 h-full flex flex-col items-center">
                <SignInForm />
            </div>
        </section>
    );
}
 
export default SigninPage;