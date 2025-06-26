import React from "react";

const TypeHealth = () => {
    return (
        <>
        {/* Health Type Section  Start*/}  
        <div className="bg-[#F4F8FB] px-3 py-4 flex justify-center items-center"> 
            <section
                className="w-full max-w-[1880px] min-h-[793px] flex-shrink-0
                        rounded-[30px] bg-white p-8 md:p-12 lg:p-24
                        flex flex-col items-center justify-center text-center"
            >
                <div className="mb-16 px-4 max-w-4xl">
                <h1 className="text-[28px] md:text-[46px] font-semibold text-[#22272B] mb-10">
                    Health Insurance & its Type
                </h1>
                <p className="text-[#22272BCC] text-[14px] md:text-[15px] leading-relaxed">
                    Health Insurance, often referred to as Mediclaim, covers medical and hospitalisation expenses resulting from an illness or accident. When you purchase a Health Insurance policy, the insurer pays all or part of your hospital bills, easing your financial burden during medical emergencies.
                </p>
                </div>

                {/* Cards Container */}
                <div className="flex flex-col lg:flex-row justify-center items-stretch gap-8 md:gap-12 px-4 w-full">

                    {/* Card 1: Individual Health Insurance */}
                    <div className="flex flex-col items-center max-w-sm w-full h-full p-4">
                        <img
                        src="/svg/individual-icon.svg"
                        alt="Individual Icon"
                        className="w-16 h-16 flex-shrink-0 mb-6 text-blue-500"
                        />
                        <h3 className="text-[16px] md:text-[20px] font-semibold text-[#222] mb-5 text-center">
                        Individual Health Insurance
                        </h3>
                        <p className="text-[#22272BCC] text-[14px] md:text-[15px] leading-relaxed text-center">
                        This type of Health Insurance covers only one individual under the policy. It takes care of medical expenses such as hospitalisation costs, treatment for injuries, room rent, and related healthcare expenses.
                        </p>
                    </div>

                    {/* Card 2: Family Floater Health Insurance */}
                    <div className="flex flex-col items-center max-w-sm w-full h-full p-4">
                        <img
                        src="/svg/family-icon.svg"
                        alt="Family Icon"
                        className="w-16 h-16 flex-shrink-0 mb-6 text-blue-500"
                        />
                        <h3 className="text-[16px] md:text-[20px] font-semibold text-[#222] mb-5 text-center">
                        Family Floater Health Insurance
                        </h3>
                        <p className="text-[#22272BCC] text-[14px] md:text-[15px] leading-relaxed text-center">
                        This policy provides health insurance coverage for the entire family under a single plan, covering two or more members. The insured sum can be used by any one member or shared among all members as needed. It is cost-effective, as the overall premium is usually lower than buying separate individual policies for each family member.
                        </p>
                    </div>

                    {/* Card 3: Group Health Insurance */}
                    <div className="flex flex-col items-center max-w-sm w-full h-full p-4">
                        <img
                        src="/images/group-icon.png"
                        alt="Group Icon"
                        className="w-16 h-16 flex-shrink-0 mb-6 text-blue-500"
                        />
                        <h3 className="text-[16px] md:text-[20px] font-semibold text-[#222] mb-5 text-center">
                        Group Health Insurance
                        </h3>
                        <p className="text-[#22272BCC] text-[14px] md:text-[15px] leading-relaxed text-center">
                        A Group Policy is primarily designed for organizations to provide health coverage to their employees. It offers insurance benefits to a group of employees at a significantly lower premium cost compared to individual policies.
                        </p>
                    </div>
                </div>
            </section>
        </div>
        {/* Health Type Section  END*/}  

        </>
    )
}

export default TypeHealth;