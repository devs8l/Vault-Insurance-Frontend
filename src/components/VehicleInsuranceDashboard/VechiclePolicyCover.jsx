import React from "react";


const VechiclePolicyCover = () => {

    const coverageItems1 = [
        {
        icon: '/svg/third-party.svg', 
        alt: 'third-party',
        text: 'Third-Party Losses',
        },
        {
        icon: '/svg/hospital-bed-icon.svg', 
        alt: 'Calamity-Damage icon',
        text: 'Accidents',
        },
        {
        icon: '/svg/fire.svg', 
        alt: 'Fire',
        text: 'Fire',
        },
        {
        icon: '/svg/theft.svg', 
        alt: 'Theft',
        text: 'Theft',
        },
        {
        icon: '/svg/comprehensive.svg', 
        alt: 'Comprehensive icon',
        text: 'Calamities',
        }
    ];

    const coverageItems2 = [
        {
        icon: '/svg/third-party.svg', 
        alt: 'third-party',
        text: 'Third-Party Losses',
        },
        {
        icon: '/svg/hospital-bed-icon.svg', 
        alt: 'Calamity-Damage icon',
        text: 'Accidents',
        },
        {
        icon: '/svg/fire.svg', 
        alt: 'Fire',
        text: 'Fire',
        },
        {
        icon: '/svg/theft.svg', 
        alt: 'Theft',
        text: 'Theft',
        }
    ];


    const coverageItems3 = [
        
        {
        icon: '/svg/comprehensive.svg', 
        alt: 'Comprehensive icon',
        text: 'Calamities',
        }
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
            <h2 className="text-[28px] md:text-[46px] font-semibold text-[#22272B] mb-12 md:mb-30 text-center">
                What does Vehicle Insurance Cover?
            </h2>

            {/* Grid for Icons and Descriptions for Desktop */}
            <div className="hidden md:grid grid-cols-2 md:grid-cols-5 gap-[60px] mb-8">
                {coverageItems1.map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                    {/* SVG Icon */}
                    <img
                    src={item.icon}
                    alt={item.alt}
                    className="w-12 h-12 flex-shrink-0 mb-4" 
                    
                    />
                    {/* Description Text */}
                    <p className="md:text-[14px] text-[12px] text-[#222] leading-tight max-w-[150px]">
                    {item.text}
                    </p>
                </div>
                ))}
            </div>

            {/* Grid for Icons and Descriptions For Mobile  */}
            <div className="md:hidden grid grid-cols-2 gap-[60px] mb-8">
                {coverageItems2.map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                    {/* SVG Icon */}
                    <img
                    src={item.icon}
                    alt={item.alt}
                    className="w-16 h-16 flex-shrink-0 mb-4" 
                    
                    />
                    {/* Description Text */}
                    <p className="md:text-[14px] text-[12px] text-[#222] leading-tight max-w-[150px]">
                    {item.text}
                    </p>
                </div>
                ))}
            </div>

            {/* Grid for Icons and Descriptions For Mobile - 2*/}
            <div className="grid grid-cols-1 md:hidden gap-[60px] mb-8">
                {coverageItems3.map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                    {/* SVG Icon */}
                    <img
                    src={item.icon}
                    alt={item.alt}
                    className="w-16 h-16 flex-shrink-0 mb-4" 
                    
                    />
                    {/* Description Text */}
                    <p className="md:text-[14px] text-[12px] text-[#222] leading-tight max-w-[150px]">
                    {item.text}
                    </p>
                </div>
                ))}
            </div>
        </section>

        {/*Policy Vehicle Cover Section end */ }
</>
    )
}

export default VechiclePolicyCover;