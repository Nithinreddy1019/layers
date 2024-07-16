"use client"

import { Registerform } from "../_components/register-form";


const RegisterPage = () => {
    return (
        <section className="h-full flex">
            <div className="hidden lg:block lg:flex-1 relative">

            </div>
            <div className="flex-1 flex items-center justify-center w-full">
                <Registerform />
            </div>
        </section>
    );
}
 
export default RegisterPage;