import { RegisterForm } from "@/components/auth/register-form";
import { CarouselBlock } from "@/components/carousel-block";
import React from "react";

const RegisterPage = () => {
    return (
        <div className="flex h-screen">
            <CarouselBlock />
            <RegisterForm />
        </div>
        
    )
}


export default RegisterPage;