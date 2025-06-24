import React from "react";

const BusinessBenefits = () => {

    const benefits = [
        {
        title: "Legal Support",
        description: "One of the key benefits of liability insurance for small businesses is legal protection. If a legal claim arises, the policy helps cover costs for legal representation, settlements, and court decisions."
        },
        {
        title: "Financial Protection",
        description: "Liability insurance helps safeguard businesses from financial losses due to injuries or damages occurring on their premises, preventing potentially devastating financial hits."
        },
        {
        title: "Peace of Mind",
        description: "With liability coverage in place, business owners can operate confidently, knowing they’re protected from unexpected legal or financial risks."
        },
        {
        title: "Enhanced Credibility",
        description: "Having liability insurance adds to a company’s professionalism. It shows clients, collaborators, and partners that the business is responsible and prepared for unforeseen incidents."
        },
        {
        title: "Contractual Compliance",
        description: "Many clients and partners require proof of liability insurance before entering into business agreements. Having the right policy helps businesses meet such requirements and secure new opportunities."
        },
        {
        title: "Risk Management",
        description: "Whether it’s a slip-and-fall incident or a product-related claim, liability insurance shields small businesses from heavy financial consequences tied to everyday operational risks."
        },
        {
        title: "Broad Coverage Options",
        description: "Liability insurance can offer protection against bodily injury, property damage, advertising-related claims, and more. Policies can often be tailored to suit specific business needs."
        },
        {
        title: "Employee Coverage",
        description: "If an employee is involved in a work-related legal issue, the insurance can cover legal costs and settlements, offering protection for the team as well."
        },
        {
        title: "Business Continuity",
        description: "In the face of legal or financial challenges, liability insurance helps keep operations running, allowing businesses to serve customers and maintain revenue streams."
        },
        {
        title: "Cost Efficiency Over Time",
        description: "While it may seem like a regular expense, liability insurance can result in significant long-term savings by covering costly legal actions and settlements that would otherwise come out of pocket."
        }
    ];

    const benefits1 = [
        {
        title: "Legal Support",
        description: "One of the key benefits of liability insurance for small businesses is legal protection. If a legal claim arises, the policy helps cover costs for legal representation, settlements, and court decisions."
        },
        {
        title: "Financial Protection",
        description: "Liability insurance helps safeguard businesses from financial losses due to injuries or damages occurring on their premises, preventing potentially devastating financial hits."
        }
    ];

    
    return (
        <>
        {/*Benfits Insuarance Section Start*/}

        <div className="bg-[#F4F8FB]  mx-4 flex justify-center items-center mb-2">
            {/* Main section container */}
            <section
                className="w-full max-w-[1880px] flex-shrink-0
                        rounded-[30px] p-5 md:p-20 opacity-90
                            "
                style={{
                background: 'radial-gradient(circle, rgba(156,131,255,0.9), rgba(114,90,208,0.9))',
                }}
            >
                {/* Heading */}
                <h2
                className="text-white md:text-left text-center mb-16 md:mb-20
                            text-[28px] md:text-[46px] font-semibold"
                >
                Benefits of Business Insurance
                </h2>

                {/* Content Grid Desktop */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-10 md:gap-x-12 lg:gap-x-20 lg:gap-y-16 max-w-7xl w-full ">
                {benefits.map((benefit, index) => (
                    <div key={index} className="flex flex-col text-white">
                    <h3 className="md:text-[18px] text-[14px] font-semibold mb-2">
                        {benefit.title}
                    </h3>
                    <p className="md:text-[15px] text-[14px] leading-relaxed opacity-90">
                        {benefit.description}
                    </p>
                    </div>
                ))}
                </div>

                {/* Content Grid Mobile */}
                <div className="grid md:hidden grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 md:gap-x-12 lg:gap-x-20 lg:gap-y-16 max-w-7xl w-full px-4 text-center">
                {benefits1.map((benefit, index) => (
                    <div key={index} className="flex flex-col text-white">
                    <h3 className="text-[20px] md:text-[24px] font-semibold mb-2">
                        {benefit.title}
                    </h3>
                    <p className="text-[14px] md:text-[20px] leading-relaxed opacity-90">
                        {benefit.description}
                    </p>
                    </div>
                ))}
                </div>
            </section>
        </div>

        {/*Benfits Insuarance Section End*/}

        </>
    )
}

export default BusinessBenefits;