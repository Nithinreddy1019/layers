import { ForgotPasswordForm } from "../../../components/authentication/forgot-password-form";


const ForgotPasswordPage = () => {
    return (
        <section className="h-screen">
            <div className="p-4 lg:pl-8 h-full flex flex-col items-center">
                <ForgotPasswordForm />
            </div>
        </section>
    );
}
 
export default ForgotPasswordPage;