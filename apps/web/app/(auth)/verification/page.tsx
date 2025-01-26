import { EmailVerification } from "../../../components/authentication/email-verification";

const VerificationPage = () => {
    return (
        <section className="h-screen">
            <div className="flex flex-col items-center p-4 lg:p-8 h-full w-full">
                <EmailVerification />
            </div>
        </section>
    );
}
 
export default VerificationPage;