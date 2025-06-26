import React from "react";

const TypeLife = () => {
    return (
        <>
        {/* Type Life Section Start*/}  
        <div className="bg-gray-50 px-4 py-4 flex justify-center items-center"> 
            <section
                className="w-full max-w-[1880px] min-h-[700px] flex-shrink-0
                        rounded-[30px] bg-white p-8 shadow
                        flex flex-col items-center justify-center text-center"
            >
                <div className="mb-16 px-4 max-w-4xl">
                <h2 className="text-[28px] md:text-[46px] font-semibold text-[#202B32] mb-10">
                    Life Insurance & Its Type
                </h2>
                <p className="text-[#202B3299] text-[14px] md:text-[15px] leading-relaxed font-semibold">
                    Choose the right type of life insurance based on your financial need. 
                    <br/>Here’s a quick map of common needs and suitable insurance types
                </p>
                </div>

                {/* Cards Container1 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px] md:gap-[100px] mb-2 md:mb-8">

                <div className="flex flex-col items-center max-w-sm">
                    <img
                    src="/svg/term.svg"
                    alt="Individual Icon"
                    className="w-12 h-12 flex-shrink-0 mb-6 text-blue-500" 
                    />
                    <h3 className="md:text-[20px] text-[16px] text-[#202B32] font-semibold">
                    Term insurance</h3>
                    <p className="text-[#22272BCC] text-[14px] md:text-[15px] leading-relaxed">Term insurance is for financial protection of your dependents</p>
                </div>
                <div className="flex flex-col items-center max-w-sm">
                    <img
                    src="/svg/child-plan.svg"
                    alt="Individual Icon"
                    className="w-12 h-12 flex-shrink-0 mb-6 text-blue-500" 
                    />
                    <h3 className="md:text-[20px] text-[16px] text-[#202B32] font-semibold">
                    Child Plan</h3>
                    <p className="text-[#22272BCC] text-[14px] md:text-[15px] leading-relaxed">Child Plan gives you the opportunity to invest and secure your child’s financial future</p>
                </div>
                <div className="flex flex-col items-center max-w-sm">
                    <img
                    src="/svg/retirement.svg"
                    alt="Individual Icon"
                    className="w-12 h-12 flex-shrink-0 mb-6 text-blue-500" 
                    />
                    <h3 className="md:text-[20px] text-[16px] text-[#202B32] font-semibold">
                    Retirement & pension plan </h3>
                    <p className="text-[#22272BCC] text-[14px] md:text-[15px] leading-relaxed">Retirement & pension plan helps you save for your retirement</p>
                </div>
                </div>

                {/* Cards Container2 */}
                <div className="hidden md:grid grid-cols-2 md:grid-cols-2 gap-[60px] mt-10">
                <div className="flex flex-col items-center max-w-sm">
                    <img
                    src="/svg/Ulip.svg"
                    alt="Individual Icon"
                    className="w-12 h-12 flex-shrink-0 mb-6 text-blue-500" 
                    />
                    <h3 className="md:text-[20px] text-[16px] text-[#202B32] font-semibold">
                    ULIP </h3>
                    <p className="text-[#22272BCC] text-[14px] md:text-[15px] leading-relaxed">ULIP gives you the opportunity to grow your wealth by investing in the markets along with a life cover</p>
                    
                </div>
                <div className="flex flex-col items-center max-w-sm">
                    <img
                    src="/svg/endowment.svg"
                    alt="Individual Icon"
                    className="w-12 h-12 flex-shrink-0 mb-6 text-blue-500" 
                    />
                    <h3 className="md:text-[20px] text-[16px] text-[#202B32] font-semibold">
                    Endowment plan </h3>
                    <p className="text-[#22272BCC] text-[14px] md:text-[15px] leading-relaxed">Endowment plan offers you 100% guaranteed returns on your investment along with a life cover</p>
                </div>
                </div>
            </section>
        </div>
        
        {/* Type Life Section End*/}
        
        </>
        
    )
}

export default TypeLife