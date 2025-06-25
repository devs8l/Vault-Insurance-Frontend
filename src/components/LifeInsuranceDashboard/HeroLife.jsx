import React, { useState,useRef,useEffect } from "react";
import { submitLifeInsuranceLead } from "../../api/LifeApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HeroLife = () => {
  const [open, setOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(""); 

  const handleSelect = (value) => {
    setSelectedPlan(value);
    setOpen(false);
    setSubmenuOpen(false);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const dropdownRef = useRef(null);

  const companies = [
    { label: "HDFC Life", value: "hdfc" },
    { label: "Axis Max Life", value: "maxlife" },
    { label: "Aditya Birla Sun Life", value: "birla" },
    { label: "Life Insurance Corporation (LIC)", value: "lic" },
    { label: "Kotak Life", value: "kotak" },
    { label: "Bajaj Allianz Life", value: "bajaj" },
  ];

  const toggleOption = (value) => {
    setSelectedCompanies((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      dob,
      gender,
      phone,
      email,
      selected_plan: selectedPlan,
      preferred_companies: selectedCompanies
    };

    try {
      const result = await submitLifeInsuranceLead(data);
      console.log('Result:', result);
      toast.success('🎉 Your Quote submitted successfully! Our team will contact you shortly.', {
                      className: 'bg-green-50 text-green-800 rounded-md shadow-md border border-green-200 px-4 py-2 font-medium',
                      icon: '✅'
        });
      setTimeout(() => window.location.reload(), 3000);
    } catch (err) {
      console.error('Quote submission failed:', err);
        toast.error('❌ Oops! Submission failed. Please try again.', {
                  className: 'bg-red-50 text-red-800 rounded-md shadow-md border border-red-200 px-4 py-2 font-medium',
                  icon: '⚠️'
        });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full py-8 md:py-12 px-4 sm:px-6 lg:px-8
                        bg-[linear-gradient(250deg,#24BDED_0%,#47B7FF_100%)]
                        overflow-hidden flex flex-col-reverse lg:flex-row items-center justify-center">
        

        {/* Form Container - Always centered, full width on mobile, fixed width on desktop */}
        <form
          onSubmit={handleSubmit}
          className="relative w-full max-w-[800px] h-auto p-6 sm:p-8 md:p-10 mx-auto
                    bg-white rounded-3xl shadow-2xl z-0
                    lg:ml-[5%] 2xl:ml-[20%] 2xl:pr-[10%] lg:max-w-[50%] md:pr-50"
        >
          <h2 className="text-[28px] md:text-[46px] font-semibold text-[#222] mb-1">Life Insurance</h2>
          <p className="text-sm md:text-base text-[#22272BCC] mb-6">Compare & Buy Best Fit Life Insurance</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            {/* Insurance Type Dropdown */}
            <div className="relative">
              <label className="block text-sm font-medium text-[#22272B] mb-2">
                I want to buy
              </label>
              <div
                onClick={() => setOpen(!open)}
                className="bg-white border-2 border-white hover:border-blue-400 
                  shadow-[10px_10px_40px_0px_rgba(26,129,255,0.10)] p-3 
                  rounded-md flex justify-between items-center cursor-pointer"
              >
                <span className="text-sm text-[#22272BCC]">
                  {selectedPlan || "Select Plan"}
                </span>
                <svg
                  className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""} cursor-pointer`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {open && (
                <ul className="absolute z-20 bg-white w-full mt-2 border border-blue-300 rounded-md shadow-md">
                  {["Family Protection (Term)", "Retirement Plan", "Child Future", "Children Future"].map((item) => (
                    <li
                      key={item}
                      className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm"
                      onClick={() => {
                        handleSelect(item);
                        setOpen(false); 
                      }}
                    >
                      {item}
                    </li>
                  ))}

                  {/* Investment Plan with nested submenu */}
                  <li
                    onMouseEnter={() => setSubmenuOpen(true)}
                    onMouseLeave={() => setSubmenuOpen(false)}
                    className="relative px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm"
                  >
                    Investment Plan
                    <span className="absolute right-3">▶</span>
                    {submenuOpen && (
                      <ul className="absolute top-0 left-full ml-2 w-56 bg-white border border-blue-300 rounded-md shadow-lg">
                        {["Guaranteed Returns", "Market Linked ULIP"].map((item) => (
                          <li
                            key={item}
                            className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm"
                            onClick={() => {
                              handleSelect(item);
                              setOpen(false); 
                              setSubmenuOpen(false); 
                            }}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                </ul>
              )}
            </div>

            {/* Companies Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <label className="block text-sm font-medium text-[#22272B] mb-2">
                Preferred Companies
              </label>
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="bg-white p-3 rounded-md text-sm 
                    text-[#22272BCC] flex justify-between items-center 
                    border-2 border-white hover:border-blue-400 cursor-pointer"
              >
                <span className="truncate">
                  {selectedCompanies.length > 0
                    ? selectedCompanies
                        .map((val) => companies.find((c) => c.value === val)?.label || val)
                        .join(", ")
                    : "Select Companies"}
                </span>
                <svg
                  className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""} cursor-pointer`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {isOpen && (
                <div className="absolute z-10 mt-2 w-full bg-white border border-blue-300 rounded-md shadow-md p-3 space-y-2 max-h-60 overflow-y-auto">
                  {companies.map((company) => (
                    <label key={company.value} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        value={company.value}
                        checked={selectedCompanies.includes(company.value)}
                        onChange={() => toggleOption(company.value)}
                        className="accent-[#6290FF] w-4 h-4 cursor-pointer"
                      />
                      <span className="text-sm text-[#22272B]">{company.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Input Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6 w-full">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white shadow-[10px_10px_40px_0px_rgba(26,129,255,0.10)] p-3 
                      text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full cursor-pointer"
              required
            />

            {/* DOB Input with label */}
            <div className="w-full">
              <label className="block text-sm text-gray-600 mb-1">DOB*</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="bg-white shadow-[10px_10px_40px_0px_rgba(26,129,255,0.10)] p-3 
                      text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full cursor-pointer"
                required
              />
            </div>


            <div className="relative">
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full bg-white shadow-[10px_10px_40px_0px_rgba(26,129,255,0.10)] p-3 
                        text-sm text-[#22272BCC] appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer" viewBox="0 0 25 25" fill="none">
                <path d="M12.2188 16.2999L6.21875 10.2999L7.61875 8.8999L12.2188 13.4999L16.8188 8.8999L18.2188 10.2999L12.2188 16.2999Z" fill="#4E5B60" />
              </svg>
            </div>
            <input
              type="tel"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-white shadow-[10px_10px_40px_0px_rgba(26,129,255,0.10)] p-3 
                      text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
              required
            />
            <input
              type="email"
              placeholder="Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white shadow-[10px_10px_40px_0px_rgba(26,129,255,0.10)] p-3 
                      text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
              required
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full sm:w-[501px] bg-[#46AEE3] hover:bg-[#1DAED9] text-white 
                    py-3 rounded-xl text-lg font-semibold transition-colors md:mt-15 cursor-pointer"
          >
            Get a Free Quote
          </button>
        </form>

        {/* Illustration - Hidden on mobile, shown on desktop */}
        <div className="hidden lg:block lg:absolute lg:left-[38%] lg:top-[27%] lg:w-[70%] lg:h-full lg:overflow-hidden">
          <img
            src="/images/life-insurance-illustration.png"
            alt="life-insurance"
            className="object-contain w-full h-full max-h-[400px]"
          />
        </div>
        {/* Illustration - Hidden on Desktop, shown on Mobile */}
        <div className="md:hidden h-auto mb-4 ml-20 relative">
          <img
            src="/images/life-insurance-illustration.png"
            alt="life-insurance"
            className="w-full h-full max-h-[500px]"
          />
        </div>
      </section>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
};

export default HeroLife;