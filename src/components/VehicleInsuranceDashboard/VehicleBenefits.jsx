import React from "react";


const VehicleBenefits = () => {
    const benefitsData = [
        {
        heading: "Financial Security",
        paragraph: "A car accident or damage can lead to substantial financial losses. Vehicle insurance helps protect your savings by covering these unexpected costs."
        },
        {
        heading: "Legal Requirement",
        paragraph: "In many places, including India, third-party liability insurance is mandatory. Having a valid policy ensures you are following the law and avoids penalties."
        },
        {
        heading: "Protection from Liabilities",
        paragraph: "If you are at fault in an accident, your insurance can cover the costs of damage or injury to the other party, preventing you from having to pay large sums out-of-pocket."
        },
        {
        heading: "Coverage for Your Vehicle",
        paragraph: "Comprehensive insurance protects your vehicle from a range of risks, including accidents, theft, vandalism, natural disasters, and fire."
        },
        {
        heading: "Peace of Mind",
        paragraph: "Knowing you have insurance coverage can provide peace of mind while driving, reducing stress and worry about potential accidents or damage."
        },
        {
        heading: "Additional Benefits",
        paragraph: "Many insurance policies offer additional benefits such as roadside assistance, towing services, and coverage for personal belongings in the car."
        }
    ]

    const benefitsData1 = [
        {
        heading: "Financial Security",
        paragraph: "A car accident or damage can lead to substantial financial losses. Vehicle insurance helps protect your savings by covering these unexpected costs."
        },
        {
        heading: "Legal Requirement",
        paragraph: "In many places, including India, third-party liability insurance is mandatory. Having a valid policy ensures you are following the law and avoids penalties."
        },
        {
        heading: "Protection from Liabilities",
        paragraph: "If you are at fault in an accident, your insurance can cover the costs of damage or injury to the other party, preventing you from having to pay large sums out-of-pocket."
        },
        {
        heading: "Coverage for Your Vehicle",
        paragraph: "Comprehensive insurance protects your vehicle from a range of risks, including accidents, theft, vandalism, natural disasters, and fire."
        },
        {
        heading: "Peace of Mind",
        paragraph: "Knowing you have insurance coverage can provide peace of mind while driving, reducing stress and worry about potential accidents or damage."
        },
        {
        heading: "Additional Benefits",
        paragraph: "Many insurance policies offer additional benefits such as roadside assistance, towing services, and coverage for personal belongings in the car."
        }
    ]

    return (
        <>
        {/*Benfits Insuarance Section Start*/}
        <div className="bg-[#F4F8FB] mx-4 flex justify-center items-center mb-2">
            <section
                className="w-full max-w-[1880px] flex-shrink-0
                        rounded-[30px] opacity-90
                        flex flex-col items-center justify-center"
                style={{
                background: 'linear-gradient(250deg, #24BDED 0%, #47B7FF 100%)',
                }}
            >
            <h1 className="text-white md:text-left text-center text-[28px] md:text-[46px] font-semibold p-10 pt-20">
                    Benefits of Vehicle Insurance
            </h1>
            {/* Content Grid DeskTop */}
            <div className="hidden md:grid relative items-center justify-center flex-shrink-0">
                <div className="flex">
                {/* Left Text Container */}
                <div className="flex-2 p-10 flex flex-col justify-center items-start z-10">
                <div className="grid grid-cols-3 gap-x-10 gap-y-20">
                    {benefitsData.map((benefit, index) => (
                    <div key={index} className="flex flex-col">
                        <h3 className="text-white md:text-[18px] text-[14px] font-semibold mb-2">
                        {benefit.heading}
                        </h3>
                        <p className="text-white text-opacity-80 md:text-[15px] text-[14px]">
                        {benefit.paragraph}
                        </p>
                    </div>
                    ))}
                </div>
                </div>

                {/* Right Image Container */}
                <div className="flex-1 flex justify-end items-center relative">
                <img
                    src="/images/Blue Car.png"
                    alt="Blue Car"
                    className="w-[591px] h-[518px] object-cover object-[0px_-0.062px] z-0
                            absolute right-0 bottom-0.5"
                />
                </div>
            </div>
            </div>
            

            {/* Content Grid Mobile */}
            <div className="md:hidden">
                <div className="flex flex-col justify-center items-center w-full px-6 py-6">
                    <div className="grid grid-cols-1 gap-y-10 w-full max-w-sm mb-30"> 
                    {benefitsData1.map((benefit, index) => (
                        <div key={index} className="flex flex-col text-center">
                        <h3 className="text-white text-[20px] md:text-[24px] font-semibold mb-3">
                            {benefit.heading}
                        </h3>
                        <p className="text-white text-opacity-80 text-[18px] md:text-[20px] leading-relaxed ">
                            {benefit.paragraph}
                        </p>
                        </div>
                    ))}
                    </div>
                </div>
                <div className="flex justify-end  mt-auto relative"> 
                    <img
                    src="/images/Blue Car.png"
                    alt="Blue Car"
                    className="w-[270px] h-[242px] object-cover object-[0px_-0.062px] z-0
                                bottom-0.5"
                    />
                </div>
            </div>
            </section>
        </div>

        {/*Benfits Insuarance Section End*/}

        </>
    )
}

export default VehicleBenefits;