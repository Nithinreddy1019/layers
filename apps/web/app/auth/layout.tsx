"use client"

import { animate, useMotionTemplate, useMotionValue, motion } from "framer-motion"
import { useEffect } from "react"


const AuthLayout = ({
    children
}: { children: React.ReactNode }) => {


    const colors = ["#DC2626", "#E11D48", "#ef4444"]
    const color = useMotionValue(colors[0])
    const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #09090B 50%, ${color})`
    const border = useMotionTemplate`1px solid ${color}`
    const boxShadow = useMotionTemplate`0px 4px 24px ${color}`

    useEffect(() => {
        animate(color, colors, {
            ease: "easeInOut",
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror"
        })
    }, [])


    return (
        <motion.div 
            className="h-screen"
            style={{
                backgroundImage
            }}
        >
            {children}
        </motion.div>
    );
}
 
export default AuthLayout;