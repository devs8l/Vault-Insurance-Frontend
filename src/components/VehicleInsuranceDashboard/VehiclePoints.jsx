import React from "react";

const VehiclePoints = () => {
    const points = [
        {
        title: "Insured Declared Value (IDV)",
        description: "Understand the IDV, which is the maximum sum your insurer will pay if your vehicle is totaled or stolen. A higher IDV means a higher premium, but ensures better coverage."
        },
        {
        title: "Add-ons",
        description: "Consider add-on covers like zero depreciation, roadside assistance, and engine protection to enhance your policy."
        },
        {
        title: "Claim Settlement Ratio",
        description: "Evaluate the insurer's claim settlement ratio, indicating their ability to settle claims smoothly and quickly."
        },
        {
        title: "Coverage Type",
        description: "Decide between third-party liability (mandatory, covers damage to others) and comprehensive coverage (covers your vehicle from damage, theft, etc.)."
        },
        {
        title: "No Claim Bonus (NCB)",
        description: "Check for the NCB benefit, which is a discount on your premium for not making claims in previous years."
        },
        {
        title: "Premium",
        description: "While cost is a factor, balance it with the coverage offered. Don't just go for the cheapest policy; ensure it meets your needs."
        }
    ];

    return (
        <>
            {/* vehicle Insuarance Point Section Start */}

            <div className="hidden px-3 bg-[#F4F8FB] py-2 md:py-4 md:flex justify-center items-center">
                {/* Main section container */}
                <section
                    className="w-full max-w-[1880px] h-full flex-shrink-0
                            bg-white rounded-[30px]  p-8 md:p-15 
                            flex flex-col items-center"
                >
                    
                    <h2
                    className="text-[#22272B] text-center mb-16 md:mb-25
                                text-[28px] md:text-[46px] font-semibold" 
                    >
                    What to look for in Vehicle Insurance?
                    </h2>

                    {/* Content Grid Desktop */}
                    <div className="lg:grid grid-cols-1 lg:grid-cols-2 gap-y-5 lg:gap-y-8 lg:gap-x-24 max-w-5xl w-full px-4">
                    {points.map((point, index) => (
                        <div key={index} className="flex flex-col">
                        <h3 className="md:text-[18px] text-[14px] font-semibold text-[#222222] mb-2">
                            {point.title}
                        </h3>
                        <p className="text-[#22272BCC] md:text-[14px] text-[12px] leading-relaxed">
                            {point.description}
                        </p>
                        </div>
                    ))}
                    </div>
                </section>
            </div>
            {/* vehicle Insuarance Point Section end */}

        </>
    )
}

export default VehiclePoints;