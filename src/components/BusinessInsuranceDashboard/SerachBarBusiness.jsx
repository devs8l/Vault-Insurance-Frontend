import React ,{useState,useMemo} from "react";

const allInsuranceTypes = [
  {
    category: 'liability',
    title: 'Directors & Officers Insurance',
    description: `Director's and Officer's (D\&O) Insurance provides financial protection for your company’s directors and key decision-makers against expenses arising from legal liabilities. This coverage ensures both your organization and its leadership are safeguarded from costs related to issues such as ransomware, bail and bond expenses, and public liability claims.`,
  },
  {
    category: 'liability',
    title: 'Professional Indemnity Insurance',
    description: 'Professional Indemnity Insurance, also called Errors and Omissions Insurance, protects you from legal claims related to the professional services you offer. It covers expenses for defending against negligence allegations from clients, as well as any compensation or damages awarded in such civil cases.',
  },
  {
    category: 'liability', 
    title: 'Commercial General Liability Insurance',
    description: 'Commercial General Liability (CGL) Insurance offers wide-ranging protection against third-party risks linked to your business operations. It covers expenses related to third-party injuries, property damage, legal defense, and other liabilities resulting from your business activities.',
  },
  {
    category: 'liability',
    title: 'Product Liability Insurance',
    description: 'Product Liability Insurance protects your business from claims related to product defects, design issues, or missing safety warnings that could lead to misuse by consumers. It covers legal expenses and settlements, helping preserve your company’s reputation. This insurance is essential for running your business smoothly and confidently expanding your product line.',
  },
  {
    category: 'liability', 
    title: 'Cyber Insurance',
    description: 'Cyber Insurance offers extensive protection against various digital risks that businesses encounter. It safeguards against data breaches, cyber-attacks, and other technology-related incidents. The policy covers legal defense costs, notification and response expenses, and liabilities resulting from cyber events.',
  },
  {
    category: 'liability',
    title: 'Workmen Compensation Insurance',
    description: 'Workmen Compensation Insurance protects businesses from legal liabilities by compensating workers for job-related injuries or illnesses. It provides financial assistance for medical expenses, legal costs, rehabilitation, and lost wages in cases of temporary or permanent disability caused by workplace accidents.',
  },
  // Property Types
  {
    category: 'property',
    title: 'Fire Insurance',
    description: 'Fire Insurance protects businesses against losses from fire and theft. It provides coverage for accidental fires and related damages caused by events such as riots, earthquakes, floods, or other natural disasters, ensuring financial support for recovery after fire-related incidents.',
  },
  {
    category: 'property',
    title: 'Fire Loss of Profit Insurance',
    description: 'Fire Loss of Profit Insurance compensates businesses for financial losses resulting from fire-related disruptions. It covers lost income, extra operational costs, and expenses for temporary relocation, helping businesses maintain operations during the recovery period.',
  },
  {
    category: 'property',
    title: 'Machinery Breakdown Insurance',
    description: 'Machinery Breakdown Insurance provides financial protection for repairing or replacing machinery and equipment that experiences unexpected or accidental damage. It helps businesses bounce back swiftly from mechanical failures, reducing both downtime and financial impact.',
  },
  {
    category: 'property',
    title: 'Machinery Loss of Profit Insurance',
    description: 'Machinery Loss of Profit Insurance (MLOP) compensates for financial setbacks caused by unexpected machinery failures. It safeguards businesses from income loss and higher operating costs during downtime, helping maintain operations by covering lost profits and extra expenses linked to equipment breakdowns.',
  },
  {
    category: 'property',
    title: 'Office Package Insurance',
    description: 'The Office Package Policy provides more than just basic accident coverage. It safeguards your office against a broad spectrum of risks—ranging from fires and earthquakes to theft and vandalism—ensuring you’re financially protected in case of a disaster.',
  },
  // Engineering Types
  {
    category: 'engineering', 
    title: 'Contractors All Risk Policy',
    description: 'The Contractors All Risk Policy is a comprehensive insurance plan that safeguards against multiple risks tied to construction work. It offers coverage for physical damage to the construction site, materials, and equipment, along with protection from third-party liabilities that may occur during the project.',
  },
  {
    category: 'engineering', 
    title: 'Erection All Risk Insurance',
    description: 'Erection All Risk Insurance (EAR) is a comprehensive policy that covers risks involved in the installation and erection of machinery, equipment, and structures. It offers financial security against physical damage, third-party claims, and other unexpected incidents that may occur during the installation process.',
  },
  {
    category: 'engineering', 
    title: 'Contractors Plant and Machinery Insurance',
    description: 'Contractors Plant & Machinery Insurance offers comprehensive protection for contractors and their equipment during construction. It covers physical damage, theft, and third-party claims, ensuring continuous protection for both contractors and their machinery throughout the project.',
  },
  // Employee Types
  {
    category: 'employee', 
    title: 'Group Health Insurance',
    description: 'Group Health Insurance is an all-inclusive plan designed for a specific set of individuals—typically company employees and their families. It offers financial coverage for medical emergencies and a range of healthcare benefits.',
  },
  {
    category: 'employee', 
    title: 'Group Personal Accident Insurance',
    description: 'Group Personal Accident Insurance (GPA) provides financial coverage to employees or organization members in the event of an accident. It includes protection for accidental death, partial or total disability, and medical costs, ensuring both financial stability and assistance.',
  },
];

const allInsuranceTypes1 = [
  {
    category: 'liability',
    title: 'Directors & Officers Insurance',
    description: `Director's and Officer's (D\&O) Insurance provides financial protection for your company’s directors and key decision-makers against expenses arising from legal liabilities. This coverage ensures both your organization and its leadership are safeguarded from costs related to issues such as ransomware, bail and bond expenses, and public liability claims.`,
  },
  {
    category: 'liability',
    title: 'Professional Indemnity Insurance',
    description: 'Professional Indemnity Insurance, also called Errors and Omissions Insurance, protects you from legal claims related to the professional services you offer. It covers expenses for defending against negligence allegations from clients, as well as any compensation or damages awarded in such civil cases.',
  },
  // Property Types
  {
    category: 'property',
    title: 'Fire Insurance',
    description: 'Fire Insurance protects businesses against losses from fire and theft. It provides coverage for accidental fires and related damages caused by events such as riots, earthquakes, floods, or other natural disasters, ensuring financial support for recovery after fire-related incidents.',
  },
  {
    category: 'property',
    title: 'Fire Loss of Profit Insurance',
    description: 'Fire Loss of Profit Insurance compensates businesses for financial losses resulting from fire-related disruptions. It covers lost income, extra operational costs, and expenses for temporary relocation, helping businesses maintain operations during the recovery period.',
  },
  // Engineering Types
  {
    category: 'engineering', 
    title: 'Contractors All Risk Policy',
    description: 'The Contractors All Risk Policy is a comprehensive insurance plan that safeguards against multiple risks tied to construction work. It offers coverage for physical damage to the construction site, materials, and equipment, along with protection from third-party liabilities that may occur during the project.',
  },
  {
    category: 'engineering', 
    title: 'Erection All Risk Insurance',
    description: 'Erection All Risk Insurance (EAR) is a comprehensive policy that covers risks involved in the installation and erection of machinery, equipment, and structures. It offers financial security against physical damage, third-party claims, and other unexpected incidents that may occur during the installation process.',
  },
  // Employee Types
  {
    category: 'employee', 
    title: 'Group Health Insurance',
    description: 'Group Health Insurance is an all-inclusive plan designed for a specific set of individuals—typically company employees and their families. It offers financial coverage for medical emergencies and a range of healthcare benefits.',
  },
  {
    category: 'employee', 
    title: 'Group Personal Accident Insurance',
    description: 'Group Personal Accident Insurance (GPA) provides financial coverage to employees or organization members in the event of an accident. It includes protection for accidental death, partial or total disability, and medical costs, ensuring both financial stability and assistance.',
  },
];


const SerachBarBusiness = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('liability');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredInsuranceTypes = useMemo(() => {
        let filtered = allInsuranceTypes;


        // Filter by category first if an active category is selected
        if (activeCategory) {
        filtered = filtered.filter(type => type.category === activeCategory);
        }

        // Then apply search term filter
        if (searchTerm) {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        filtered = filtered.filter(
            (type) =>
            type.title.toLowerCase().includes(lowerCaseSearchTerm) ||
            type.description.toLowerCase().includes(lowerCaseSearchTerm)
        );
        }
        return filtered;
    }, [searchTerm, activeCategory]);

    const filteredInsuranceTypes1 = useMemo(() => {
        let filtered = allInsuranceTypes1;


        // Filter by category first if an active category is selected
        if (activeCategory) {
        filtered = filtered.filter(type => type.category === activeCategory);
        }

        // Then apply search term filter
        if (searchTerm) {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        filtered = filtered.filter(
            (type) =>
            type.title.toLowerCase().includes(lowerCaseSearchTerm) ||
            type.description.toLowerCase().includes(lowerCaseSearchTerm)
        );
        }
        return filtered;
    }, [searchTerm, activeCategory]);


    const categories = ['liability', 'property', 'engineering', 'employee'];
    
    return (
        <>
        {/* Search Bar Start */}
        <section className="bg-[#F4F8FB] w-full flex flex-col justify-center items-center pt-12">
          <div className="text-center max-w-6xl px-4 space-y-12">
            <h2 className="text-[28px] md:text-[46px] font-medium text-[#5A69EC]">
              We have expertise in solving complex situations for Schools, Constructions, Public & Private Projects, Hotels and Manufacturing Businesses.
            </h2>
            <h2 className="text-[28px] md:text-[46px] font-semibold text-[#202B32]">
              Types of Business Insurance
            </h2>
          </div>
        </section>
        <section className="bg-[#F4F8FB] w-full flex justify-center items-start  pt-12 md:pt-15"> 
          <div className="relative mb-8 md:mb-12 flex justify-center">
            <input
              type="text"
              placeholder="Search &quot;General Liability Insurance&quot;"
              className="w-auto md:w-[380px] h-[60px] px-6 pl-15 rounded-[10px] bg-white text-gray-700 shadow-[10px_10px_40px_0px_rgba(26,129,255,0.10)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <svg
              
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </section>
        {/* Search Bar End */}
        
      {/* Category Navigation Desktop Start*/}
      <section className="bg-[#F4F8FB] w-full flex flex-col justify-center pb-5">
        <div className="md:bg-[#FFFFFF] p-10 rounded-[30px] md:mx-5">
          <nav className="flex justify-center space-x-6 md:space-x-12 mb-10 text-gray-600 font-medium text-[12px] md:text-[16px]">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`pb-1 border-b-2 transition-colors duration-200 cursor-pointer ${ 
                activeCategory === cat
                  ? 'border-blue-500 text-blue-500'
                  : 'border-transparent hover:border-gray-300 hover:text-gray-800'
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </nav>

        {/* Insurance Type Grid Desktop */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredInsuranceTypes.length > 0 ? (
            filteredInsuranceTypes.map((type, index) => (
              <div key={index} className="bg-white p-6">
                <h3 className="md:text-[18px] text-[15px] font-semibold text-gray-800 mb-2 text-center">{type.title}</h3>
                <p className="text-gray-600 md:text-[14px] text-[12px] text-center">{type.description}</p>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 text-lg">
              No insurance types found for the current selection.
            </div>
          )}
        </div>

        {/* Insurance Type Grid Mobile */}
        <div className="md:hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredInsuranceTypes1.length > 0 ? (
            filteredInsuranceTypes1.map((type, index) => (
              <div key={index} className="bg-white p-6 rounded-3xl shadow">
                <h3 className="md:text-[18px] text-[15px] font-semibold text-gray-800 mb-2 text-center">{type.title}</h3>
                <p className="text-gray-600 md:text-[14px] text-[12px] text-center">{type.description}</p>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 text-lg">
              No insurance types found for the current selection.
            </div>
          )}
        </div>

        </div>
      </section>
      {/* Category Navigation End */}
        </>
    )
}

export default SerachBarBusiness;