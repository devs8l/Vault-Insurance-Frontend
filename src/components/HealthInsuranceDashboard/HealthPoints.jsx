import React from "react";

const HealthPoints = () => {

    const points = [
        {
        title: "Insurance Cover",
        description: "With medical expenses rising steadily, it’s important to choose a health insurance plan that provides adequate coverage when you need it. Opting for a policy with a sum insured of ₹10 lakh or more is considered a wise choice for sufficient financial protection."
        },
        {
        title: "Room Rent",
        description: "Room rent is one of the most crucial aspects of any health insurance policy, as it directly impacts your claim eligibility. It’s advisable to choose a policy that offers at least a Single Private Room and, ideally, has no room rent restrictions at all."
        },
        {
        title: "Copay",
        description: "To ensure the insurance company covers your entire medical bill during a claim, opt for policies that come with a 0% co-payment clause, meaning you won’t have to bear any portion of the expenses yourself."
        },
        {
        title: "Existing Disease Waiting Period",
        description: "A waiting period for pre-existing diseases can result in claim rejection if any related medical expenses arise during that time. Hence, it's advisable to choose policies with the shortest possible waiting period to avoid such issues."
        },
        {
        title: "Cashless Hospital",
        description: "To avoid paying medical expenses upfront and waiting 15-20 days for reimbursement, it’s better to choose a health insurance policy that has tie-ups with hospitals in your area, allowing you to access cashless treatment."
        },
        {
        title: "Premium",
        description: "Many people focus only on the premium when purchasing health insurance, but it’s more important to assess your specific needs first. You should choose a policy that offers the best coverage and value for your requirements at the most competitive price."
        }
    ];

    return (
        <>
        {/* Health Insuarance Point Start */}

        <div className="bg-[#F4F8FB] px-3 py-2 md:py-4 flex justify-center items-center">
            {/* Main section container */}
            <section
                className="w-full max-w-[1880px] h-full flex-shrink-0
                        bg-white rounded-[30px]  p-8 md:p-15 
                        flex flex-col items-center"
            >
                
                <h2
                className="text-center mb-16 md:mb-25
                            text-[28px] md:text-[46px] font-semibold text-[#22272B]" 
                >
                What to look for in Health Insurance?
                </h2>

                {/* Content Grid Desktop */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-5 lg:gap-y-8 lg:gap-x-24 max-w-5xl w-full px-4">
                    {points.map((point, index) => (
                    <div key={index} className="flex flex-col">
                    <h3 className="md:text-[18px] text-[14px] font-semibold mb-2 text-[#5F88EC]">
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
        {/* Health Insuarance Point End */}

        </>
    )
}

export default HealthPoints;