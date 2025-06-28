import React from "react";

const VehicleEnhance = () => {

    const insuranceCards = [
        {
            title: "Personal Accident Cover",
            description: 'This add-on ensures financial compensation to the vehicle owner in case of accidental death or partial/permanent disability. It also covers hospitalization costs arising from such incidents, providing peace of mind for both the driver and their family.',
        },
        {
            title: "Engine Protection Cover",
            description: `If your vehicle's engine suffers damage due to waterlogging, flooding, or similar situations, this cover protects you against the repair costs of engine-related damage, even if it happens after the incident (also known as consequential loss).`,
        },
        {
            title: "Roadside Assistance",
            description: 'This add-on ensures immediate help if your car breaks down. It includes services like minor repairs, battery replacement, spare key delivery, emergency fuel, towing to the nearest authorized workshop, and more.',
        },
        {
            title: "Zero Depreciation Cover",
            description: 'Typically, insurers deduct depreciation costs when settling claims. With this add-on, no depreciation is applied to parts, ensuring you receive the full claim amount for repairs or replacements.',
        },
        {
            title: "Daily Allowance",
            description: `If your car is under repair due to damage or theft, this add-on provides a daily payout (₹500 to ₹1,000 depending on the vehicle) for 10 to 15 days to cover alternative transportation expenses. Repairs must be done at authorized garages to avail of this benefit.`,
        },
        {
            title: "Consumables Cover",
            description: 'This add-on covers the cost of essential consumables like nuts, bolts, engine oil, screen washers, and other items that often need replacement when your car is damaged in an accident.',
        },
        {
            title: "Passenger Accident Cover",
            description: 'Passengers (other than the driver) are covered for accidental death or total/permanent disability through a lump sum payout under this add-on.',
        },
        {
            title: "Return to Invoice Cover",
            description: `If your vehicle is stolen or completely damaged beyond repair, this cover ensures you receive the full invoice value (purchase price), not just the depreciated Insured Declared Value (IDV). Note: This is not applicable for imported vehicles.`,
        },
        {
            title: "Ambulance & Medical Expenses Cover",
            description: 'This add-on reimburses the expenses incurred for ambulance services needed after an accident.',
        }
    ];


    return (
        <>
        {/* Type Vehicle Section start*/} 
        <div className="bg-[#F4F8FB] px-3 py-4  flex justify-center items-center"> 
            <section
                className="w-full max-w-[1880px] min-h-[793px] flex-shrink-0
                        rounded-[30px] bg-white p-8 md:p-12 lg:p-24 shadow
                        flex flex-col items-center justify-center text-center"
            >
                <div className="mb-16 px-4 max-w-4xl">
                <h3 className="text-[28px] md:text-[40px] font-semibold text-[#22272B] mb-10">
                    Enhance Your Car Insurance Policy with Add-on Covers for Extra Protection
                </h3>
                <p className="text-[#22272BCC] text-[14px] md:text-[15px] leading-relaxed">
                    Having only Third-Party Liability or Comprehensive Cover might not fully meet your vehicle protection needs. That’s why insurers offer Add-On Covers to safeguard you against situations typically excluded from standard policies. Each add-on provides specific benefits, offering enhanced protection for your car. Here are some of the most popular Add-On Covers available.
                </p>
                </div>

                {/* Cards Container Desktop */}
                <div className="grid md:grid-cols-3 gap-8 md:gap-12 px-4 w-full">
                    {insuranceCards.map((card, index) => (
                        <div key={index} className="flex flex-col items-center max-w-sm mx-auto">
                        <h3 className="text-[16px] md:text-[20px] font-semibold text-[#5F88EC] mb-4">
                            {card.title}
                        </h3>
                        <p className="text-[#22272BCC] text-[14px] md:text-[15px] leading-relaxed">
                            {card.description}
                        </p>
                        </div>
                    ))}
                </div>
        </section>
    </div>
    
    {/* Type Vehicle Section end*/} 

        </>
    )
}

export default VehicleEnhance; 