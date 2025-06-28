import React from "react";


const VehicleBeforeBuy = () => {

    const coverageItems1 = [
        {
        text: `When choosing add-ons, factors like vehicle model, age, and specific components should be considered.For vehicles over five years old, it's advisable to include Roadside Assistance and Zero Depreciation Cover, if offered.`
        },
        {
        text: 'Motorists living in coastal regions are more likely to benefit from Hydrostatic Lock or Engine Protect Covers, compared to those in non-coastal areas.'
        },
        {
        text: 'Individuals who frequently travel using their own vehicle should consider opting for a Personal Accident Cover.'
        },
        {
        text: 'Add-ons like Return to Invoice and Consumables Cover can reduce personal financial burden in cases of severe damage or total loss due to accidents.'
        },
        {
        text: 'Always remember that add-ons are designed to fill coverage gaps not addressed by a standard comprehensive policy. So, evaluate your needs carefully and choose only those add-ons that align with your driving habits and environmental conditions.'
        }
    ];

    return (
        <>
        <section className="w-full bg-[#F4F8FB] px-auto">
                <div className="w-full md:mx-auto flex flex-col lg:flex-row items-center">
                    {/* Left Content - Text */}
                    <div className="w-full mx-2 md:mx-0 px-6 md:px-8 lg:px-16 "> 
                        <h2 className="text-[24px] md:text-[32px] lg:text-[36px] font-semibold text-[#22272B] mb-6">
                            Points to Consider Before you Buy <br className="hidden md:block" />
                            Car Insurance Policy Add-On
                        </h2>

                        <ul className="list-disc pl-5 space-y-4 text-[#222] text-[14px] md:text-[15px] leading-relaxed">
                            {coverageItems1.map((item, index) => (
                            <li key={index}>{item.text}</li>
                            ))}
                        </ul>
                    </div>

                
                    <div className="flex justify-center lg:justify-end">
                        <img
                            src="/images/Car-blue2.png"
                            alt="Blue Car"
                            className="w-full object-contain lg:max-w-none" 
                        />
                    </div>
                </div>
            </section>
            {/*BeforeBuy Vehicle Cover Section end */ }
    </>
    )
}

export default VehicleBeforeBuy;