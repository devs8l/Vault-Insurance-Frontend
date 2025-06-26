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

    const icons = {
      liability: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none">
          <path d="M8 13H16V11H8V13ZM8 16H16V14H8V16ZM8 19H13V17H8V19ZM6 22C5.45 22 4.97917 21.8042 4.5875 21.4125C4.19583 21.0208 4 20.55 4 20V4C4 3.45 4.19583 2.97917 4.5875 2.5875C4.97917 2.19583 5.45 2 6 2H14L20 8V20C20 20.55 19.8042 21.0208 19.4125 21.4125C19.0208 21.8042 18.55 22 18 22H6ZM13 9V4H6V20H18V9H13Z" fill="#4568C7"/>
        </svg>
      ),
      property: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none">
          <path d="M3 21V7H7V3H17V11H21V21H13V17H11V21H3ZM5 19H7V17H5V19ZM5 15H7V13H5V15ZM5 11H7V9H5V11ZM9 15H11V13H9V15ZM9 11H11V9H9V11ZM9 7H11V5H9V7ZM13 15H15V13H13V15ZM13 11H15V9H13V11ZM13 7H15V5H13V7ZM17 19H19V17H17V19ZM17 15H19V13H17V15Z" fill="#4568C7" fillOpacity="0.6"/>
        </svg>
      ),
      engineering: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none">
          <path d="M18.9 21.0001L13.425 15.5251L15.525 13.4251L21 18.9001L18.9 21.0001ZM5.1 21.0001L3 18.9001L9.9 12.0001L8.2 10.3001L7.5 11.0001L6.225 9.7251V11.7751L5.525 12.4751L2.5 9.4501L3.2 8.7501H5.25L4 7.5001L7.55 3.9501C7.88333 3.61676 8.24167 3.3751 8.625 3.2251C9.00833 3.0751 9.4 3.0001 9.8 3.0001C10.2 3.0001 10.5917 3.0751 10.975 3.2251C11.3583 3.3751 11.7167 3.61676 12.05 3.9501L9.75 6.2501L11 7.5001L10.3 8.2001L12 9.9001L14.25 7.6501C14.1833 7.46676 14.1292 7.2751 14.0875 7.0751C14.0458 6.8751 14.025 6.6751 14.025 6.4751C14.025 5.49176 14.3625 4.6626 15.0375 3.9876C15.7125 3.3126 16.5417 2.9751 17.525 2.9751C17.775 2.9751 18.0125 3.0001 18.2375 3.0501C18.4625 3.1001 18.6917 3.1751 18.925 3.2751L16.45 5.7501L18.25 7.5501L20.725 5.0751C20.8417 5.30843 20.9208 5.5376 20.9625 5.7626C21.0042 5.9876 21.025 6.2251 21.025 6.4751C21.025 7.45843 20.6875 8.2876 20.0125 8.9626C19.3375 9.6376 18.5083 9.9751 17.525 9.9751C17.325 9.9751 17.125 9.95843 16.925 9.9251C16.725 9.89176 16.5333 9.83343 16.35 9.7501L5.1 21.0001Z" fill="#4568C7" fillOpacity="0.6"/>
        </svg>
      ),
      employee: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none">
          <path d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H9.2C9.43333 2.4 9.8 1.91667 10.3 1.55C10.8 1.18333 11.3667 1 12 1C12.6333 1 13.2 1.18333 13.7 1.55C14.2 1.91667 14.5667 2.4 14.8 3H19C19.55 3 20.0208 3.19583 20.4125 3.5875C20.8042 3.97917 21 4.45 21 5V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5ZM12 4.25C12.2167 4.25 12.3958 4.17917 12.5375 4.0375C12.6792 3.89583 12.75 3.71667 12.75 3.5C12.75 3.28333 12.6792 3.10417 12.5375 2.9625C12.3958 2.82083 12.2167 2.75 12 2.75C11.7833 2.75 11.6042 2.82083 11.4625 2.9625C11.3208 3.10417 11.25 3.28333 11.25 3.5C11.25 3.71667 11.3208 3.89583 11.4625 4.0375C11.6042 4.17917 11.7833 4.25 12 4.25ZM5 17.85C5.9 16.9667 6.94583 16.2708 8.1375 15.7625C9.32917 15.2542 10.6167 15 12 15C13.3833 15 14.6708 15.2542 15.8625 15.7625C17.0542 16.2708 18.1 16.9667 19 17.85V5H5V17.85ZM12 13C12.9667 13 13.7917 12.6583 14.475 11.975C15.1583 11.2917 15.5 10.4667 15.5 9.5C15.5 8.53333 15.1583 7.70833 14.475 7.025C13.7917 6.34167 12.9667 6 12 6C11.0333 6 10.2083 6.34167 9.525 7.025C8.84167 7.70833 8.5 8.53333 8.5 9.5C8.5 10.4667 8.84167 11.2917 9.525 11.975C10.2083 12.6583 11.0333 13 12 13ZM7 19H17V18.75C16.3 18.1667 15.525 17.7292 14.675 17.4375C13.825 17.1458 12.9333 17 12 17C11.0667 17 10.175 17.1458 9.325 17.4375C8.475 17.7292 7.7 18.1667 7 18.75V19ZM12 11C11.5833 11 11.2292 10.8542 10.9375 10.5625C10.6458 10.2708 10.5 9.91667 10.5 9.5C10.5 9.08333 10.6458 8.72917 10.9375 8.4375C11.2292 8.14583 11.5833 8 12 8C12.4167 8 12.7708 8.14583 13.0625 8.4375C13.3542 8.72917 13.5 9.08333 13.5 9.5C13.5 9.91667 13.3542 10.2708 13.0625 10.5625C12.7708 10.8542 12.4167 11 12 11Z" fill="#4568C7" fillOpacity="0.6"/>
        </svg>
      ),
    };
    
    return (
        <>
        {/* Search Bar Start */}
        <section className="bg-[#F4F8FB] w-full flex flex-col justify-center items-center pt-12 py-15">
          <div className="text-center max-w-6xl px-4 space-y-12">
            <h2 className="text-[28px] md:text-[46px] font-medium text-[#5A69EC]">
              We have expertise in solving complex situations for Schools, Constructions, Public & Private Projects, Hotels and Manufacturing Businesses.
            </h2>
            <h2 className="text-[28px] md:text-[46px] font-semibold text-[#202B32]">
              Types of Business Insurance
            </h2>
          </div>
        </section>
                
      {/* Category Navigation Desktop Start*/}
      <section className="bg-[#F4F8FB] w-full flex flex-col justify-center pb-5">
        <div className="md:bg-[#FFFFFF] p-10 rounded-[30px] md:mx-5">
          <nav className="flex justify-center space-x-4 md:space-x-8 mb-10 text-gray-600 font-medium text-[12px] md:text-[16px]">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`flex items-center space-x-2 pb-1 border-b-2 transition-colors duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? 'border-blue-500 text-blue-500'
                    : 'border-transparent hover:border-gray-300 hover:text-gray-800'
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {icons[cat]}
                <span>{cat}</span>
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