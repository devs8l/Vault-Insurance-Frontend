import React from "react";

const LifePartners = () => {

    return (
        <section className="py-12 md:py-20 lg:py-22 bg-[#F4F8FB]">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#22272b] mb-8 md:mb-20 lg:mb-22">Our Top Life Insurance Partners</h2>
                
                <div className="flex flex-wrap justify-center items-center gap-6 md:gap-14">
                    <img src="/images/hdfc-logo.png" alt="care-health" className="h-12 md:h-14 lg:h-16 w-auto rounded-2xl" />
                    <img src="/images/axis-logo.png" alt="Axis" className="h-12 md:h-14 lg:h-16 w-auto" />
                    <img src="/images/lic.png" alt="LIC" className="h-12 md:h-14 lg:h-16 w-auto" />
                    <img src="/images/aditya.png" alt="aditya" className="h-12 md:h-14 lg:h-16 w-auto" />
                    
                </div>
            </div>
      </section>
    )
}

export default LifePartners;