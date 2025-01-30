import { ResetPasswordForm } from "../../../components/authentication/reset-password-form";

const ResetPage = () => {
    return (
        <section className="h-screen">
            <div className="p-4 lg:pl-8 h-full flex flex-col items-center">
                <ResetPasswordForm />
            </div>
        </section>
    );
}
 
export default ResetPage;