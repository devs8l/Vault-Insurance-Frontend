import React from "react";

const PolicyCoverHealth = () => {

    const coverageItems1 = [
        {
        icon: '/svg/syringe.svg', 
        alt: 'Syringe icon',
        text: 'Expenses Before Hospitalisation',
        },
        {
        icon: '/svg/ambulance.svg', 
        alt: 'Ambulance icon',
        text: 'Ambulance Charges',
        },
        {
        icon: '/svg/hospital-bed-icon.svg', 
        alt: 'Hospital bed icon',
        text: 'Hospitalisation Expenses',
        },
        {
        icon: '/svg/bill-receipt.svg', 
        alt: 'Bill receipt icon',
        text: 'Expenses after Hospitalisation',
        },
    ];

    const coverageItems2 = [
        {
        icon: '/svg/crutches.svg', 
        alt: 'Crutches icon',
        text: 'Accidental Hospitalisation',
        },
        {
        icon: '/svg/exclamation-mark.svg', 
        alt: 'Exclamation mark icon',
        text: 'Critical Illness',
        },
        {
        icon: '/images/scalpel.png', 
        alt: 'Scalpel icon',
        text: 'Operations & Surgeries',
        },
        {
        icon: '/svg/stethoscope.svg', 
        alt: 'Stethoscope icon',
        text: 'Health Check-Ups',
        },
        {
        icon: '/svg/first-aid-kit.svg', 
        alt: 'First aid kit icon',
        text: 'Day Care Treatment',
        },
    ]
  
    return (
        <>
        
        {/* Health Policy Cover Section Start */ }
        <section
            className="w-full mx-auto bg-[#F4F8FB]
                        py-20 px-4 md:px-8 lg:px-12
                        flex flex-col items-center"
            >
            {/* Section Title */}
            <h2 className="text-[28px] md:text-[46px] font-semibold text-[#22272B] mb-12 md:mb-30 text-center">
                What does Health Insurance Policy Cover?
            </h2>

            {/* Grid for Icons and Descriptions - 1 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[60px] mb-8">
                {coverageItems1.map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                    {/* SVG Icon */}
                    <img
                    src={item.icon}
                    alt={item.alt}
                    className="w-14 h-14 flex-shrink-0 mb-4" 
                    
                    />
                    {/* Description Text */}
                    <p className="md:text-[14px] text-[12px] text-[#222222] leading-tight max-w-[150px]">
                    {item.text}
                    </p>
                </div>
                ))}
            </div>
            {/* Grid for Icons and Descriptions - 2 */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-[60px]">
                {coverageItems2.map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                    {/* SVG Icon */}
                    <img
                    src={item.icon}
                    alt={item.alt}
                    className="w-14 h-14 flex-shrink-0 mb-4" 
                    
                    />
                    {/* Description Text */}
                    <p className="md:text-[14px] text-[12px] text-[#222222] leading-tight max-w-[150px]">
                    {item.text}
                    </p>
                </div>
                ))}
            </div>
        </section>
        {/* Health Policy Cover Section End */ }

        </>
    )
}

export default PolicyCoverHealth;