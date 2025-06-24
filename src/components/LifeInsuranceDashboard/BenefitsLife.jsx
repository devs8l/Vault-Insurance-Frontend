import React from "react";

const BenefitLife = () => {

    const benefits = [
        {
        title: "Financial Protection",
        description: "Life insurance offers financial security to your family by providing compensation in case of an unfortunate event, in return for the premium paid."
        },
        {
        title: "Customizable Plans",
        description: "Different insurance plans cater to different needs. The more you pay in premiums, the more benefits you can access.icy ensures you are following the law and avoids penalties."
        },
        {
        title: "Health Expense Coverage",
        description: "Many policies also include coverage for medical expenses like hospital stays and critical illness treatment."
        },
        {
        title: "Encourages Saving & Wealth Growth",
        description: "Some life insurance plans double as savings tools by investing your money to help grow your wealth."
        },
        {
        title: "Coverage for Your Vehicle",
        description: "Comprehensive insurance protects your vehicle from a range of risks, including accidents, theft, vandalism, natural disasters, and fire."
        },
        {
        title: "Assured Payouts",
        description: "Insurance guarantees a fixed payout upon the occurrence of a covered event, ensuring predictable financial support."
        },
        {
        title: "Tax Advantages",
        description: "Premiums paid towards life insurance can reduce your taxable income under Section 80C of the Income Tax Act, 1961."
        }
    ];

    const benefits1 = [
        {
        title: "Financial Protection",
        description: "Life insurance offers financial security to your family by providing compensation in case of an unfortunate event, in return for the premium paid."
        },
        {
        title: "Customizable Plans",
        description: "Different insurance plans cater to different needs. The more you pay in premiums, the more benefits you can access.icy ensures you are following the law and avoids penalties."
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
                background: 'linear-gradient(250deg, #24BDED 0%, #47B7FF 100%)',
                }}
            >
                {/* Heading */}
                <h2
                className="text-white md:text-left text-center mb-16 md:mb-20
                            text-[28px] md:text-[46px] font-semibold"
                >
                Benefits of Life Insurance
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

export default BenefitLife;