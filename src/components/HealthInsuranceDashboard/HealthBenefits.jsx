import React from "react";
import MobileGridBenefitHealth from "./MobileGridBenefitHealth";
 
const HealthBenefits = () => {

    const benefits = [
        {
        title: "Financial Security",
        description: "A single critical illness or major accident can drain your lifetime savings. Health insurance protects your finances by providing essential financial support during medical emergencies, helping you preserve your hard-earned money."
        },
        {
        title: "Mental Peace",
        description: "Health insurance ensures you don’t have to stress about covering hospital expenses during emergencies like accidents or illnesses. It provides peace of mind, knowing you’re financially protected for the future."
        },
        {
        title: "Covers Both Illness & Accident",
        description: "Health insurance covers not only medical expenses arising from accidents but also provides protection against critical illnesses such as cancer, heart attacks, paralysis, and more."
        },
        {
        title: "Covers Existing Diseases",
        description: "Pre-existing diseases at the time of purchasing a health insurance policy usually come with a waiting period of 1 to 4 years. However, you can be assured that these conditions will be covered once the waiting period is completed."
        },
        {
        title: "Cashless Treatment",
        description: "Health insurance offers cashless treatment at network hospitals, meaning you won’t need to pay hospital bills out of pocket. The insurance company will settle the expenses directly with the hospital."
        },
        {
        title: "Tax Benefit",
        description: "The premium you pay for health insurance qualifies for tax benefits under Section 80D of the Income Tax Act. You can claim a tax deduction of up to ₹75,000 in a financial year, helping you save on taxes."
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
                        flex flex-col items-center justify-center"
                style={{
                background: 'linear-gradient(250deg, #24BDED 0%, #47B7FF 100%)',
                }}
            >
                {/* Heading */}
                <h2
                className="text-white text-center mb-16 md:mb-20
                            text-[28px] md:text-[46px] font-semibold"
                >
                Benefits of Health Insurance
                </h2>

                {/* Content Grid Desktop */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 md:gap-x-12 lg:gap-x-20 lg:gap-y-16 max-w-7xl w-full px-4">
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
                <MobileGridBenefitHealth benefits={benefits} />
            </section>
        </div>

        {/*Benfits Insuarance Section End*/}

        </>
    )
}

export default HealthBenefits;