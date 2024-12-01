import Image from "next/image";


const navLinks = [
    { label: "Home", href: "#" },
    { label: "Features", href: "#features" },
    { label: "Integrations", href: "#integrations" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQs", href: "#faqs" },
]


export const Navbar = () => {
    return (
        <section className="py-4">
            <div className="container">
                <div className="grid grid-cols-2 border border-white/10 rounded-full py-2 px-4 items-center">
                    <div>
                        <Image 
                            src={"/assets/logo.svg"}
                            alt="logo"
                            width={125}
                            height={125}
                            className=""
                        />
                    </div>
                    <div className="flex justify-end">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-menu text-white"
                        >
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    )
}