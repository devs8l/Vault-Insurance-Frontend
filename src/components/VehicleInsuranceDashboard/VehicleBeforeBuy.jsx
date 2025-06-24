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

    const coverageItems2 = [
        {
        text: `When choosing add-ons, factors like vehicle model, age, and specific components should be considered. For vehicles over five years old, it's advisable to include Roadside Assistance and Zero Depreciation Cover, if offered.`
        },
        {
        text: 'Motorists living in coastal regions are more likely to benefit from Hydrostatic Lock or Engine Protect Covers, compared to those in non-coastal areas.'
        },
    ];

    return (
        <>
        {/*Policy Vehicle Cover Section start */ }
    
        <section
        className="w-full mx-auto bg-[#F4F8FB]
                    py-20 px-4 md:px-8 lg:px-12
                    flex flex-col items-center"
        >
            {/* Section Title */}
            <h2 className="text-[28px] md:text-[46px] font-semibold text-[#22272B] mb-12 md:mb-25 text-center max-w-[55%]">
                Points to Consider Before you Buy Car Insurance Policy Add-On
            </h2>

            {/* Grid for Icons and Descriptions for Desktop */}
            
            <div className="hidden md:grid grid-cols-1 md:grid-cols-1 gap-[40px] mb-8">
                {coverageItems1.map((item, index) => (
                    <div key={index} className="flex flex-row justify-center items-start px-4">
                    <ul className="list-disc list-inside max-w-[600px]">
                        <li className="md:text-[14px] text-[12px] text-[#222] leading-relaxed break-words text-left">
                        {item.text}
                        </li>
                    </ul>
                    </div>
                ))}
            </div>
 

            {/* Grid for Icons and Descriptions For Mobile  */}
           <div className="md:hidden grid grid-cols-1 gap-[40px] mb-8">
                {coverageItems2.map((item, index) => (
                    <div key={index} className="flex flex-row justify-center items-start px-4">
                    <ul className="list-disc list-inside max-w-[600px]">
                        <li className="md:text-[14px] text-[12px] text-[#222] leading-relaxed break-words text-left">
                        {item.text}
                        </li>
                    </ul>
                    </div>
                ))}
            </div>
        </section>

        {/*Policy Vehicle Cover Section end */ }
</>
    )
}

export default VehicleBeforeBuy;