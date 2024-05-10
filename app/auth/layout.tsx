import React from 'react';
import { NavBar } from './_components/nav-bar';


const AuthLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return(
        <div>
            <NavBar />
            {children}
        </div>
    )
}


export default AuthLayout;