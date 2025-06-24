import React, { useState, useRef, useEffect } from "react";
import { submitLifeInsuranceLead } from "../../../api/LifeApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LifeForm = () => {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [planDropdownOpen, setPlanDropdownOpen] = useState(false);
  const [submenuVisible, setSubmenuVisible] = useState(false);
  const dropdownRef = useRef(null);
  const submenuRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const companyDropdownRef = useRef(null);

  const companies = [
    { label: "HDFC Life", value: "hdfc" },
    { label: "Axis Max Life", value: "maxlife" },
    { label: "Aditya Birla Sun Life", value: "birla" },
    { label: "Life Insurance Corporation (LIC)", value: "lic" },
    { label: "Kotak Life", value: "kotak" },
    { label: "Bajaj Allianz Life", value: "bajaj" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setPlanDropdownOpen(false);
        setSubmenuVisible(false);
      }

      if (
        companyDropdownRef.current &&
        !companyDropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePlanSelect = (value) => {
    setSelectedPlan(value);
    setPlanDropdownOpen(false);
    setSubmenuVisible(false);
  };

  const toggleCompany = (value) => {
    setSelectedCompanies((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

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
      preferred_companies: selectedCompanies,
    };

    try {
      const result = await submitLifeInsuranceLead(data);
      console.log("Result:", result);
      toast.success(
        "🎉 Your Quote submitted successfully! Our team will contact you shortly.",
        {
          className:
            "bg-green-50 text-green-800 rounded-md shadow-md border border-green-200 px-4 py-2 font-medium",
          icon: "✅",
        }
      );
      setTimeout(() => window.location.reload(), 3000);
    } catch (err) {
      console.error("Quote submission failed:", err);
      toast.error("❌ Oops! Submission failed. Please try again.", {
        className:
          "bg-red-50 text-red-800 rounded-md shadow-md border border-red-200 px-4 py-2 font-medium",
        icon: "⚠️",
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl mx-auto space-y-8"
      >
        {/* Title */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-[#22272b]">
            Life Insurance
          </h2>
          <p className="text-sm text-gray-600">
            Compare & Buy Best Fit Life Insurance
          </p>
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Plan Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <label className="block text-[15px] text-[#596069] mb-2">
              I want to buy
            </label>
            <div
              onClick={() => setPlanDropdownOpen(!planDropdownOpen)}
              className="bg-white border border-[#d9dde1] rounded-[16px] px-4 py-3 text-sm text-[#22272BCC] flex justify-between items-center cursor-pointer"
            >
              {selectedPlan || "Select Plan"}
              <svg
                className={`w-4 h-4 transition-transform ${
                  planDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {planDropdownOpen && (
              <ul className="absolute z-20 bg-white w-full mt-2 border border-blue-300 rounded-[16px] shadow-md overflow-hidden">
                {[
                  "Family Protection (Term)",
                  "Retirement Plan",
                  "Child Future",
                  "Children Future",
                ].map((item) => (
                  <li
                    key={item}
                    onClick={() => handlePlanSelect(item)}
                    className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm text-[#22272b]"
                  >
                    {item}
                  </li>
                ))}
                <li
                  className="relative px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm text-[#22272b]"
                  onMouseEnter={() => setSubmenuVisible(true)}
                  onMouseLeave={() => setSubmenuVisible(false)}
                >
                  Investment Plan
                  <span className="absolute right-3">▶</span>

                  {submenuVisible && (
                    <ul
                      ref={submenuRef}
                      className="left-full top-0 ml-2 w-56 bg-white border border-blue-300 rounded-[16px] shadow-lg"
                    >
                      {["Guaranteed Returns", "Market Linked ULIP"].map(
                        (subItem) => (
                          <li
                            key={subItem}
                            onClick={() => handlePlanSelect(subItem)}
                            className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm text-[#22272b]"
                          >
                            {subItem}
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </div>
          {/* Preferred Companies */}
          <div className="relative" ref={companyDropdownRef}>
            <label className="block text-[15px] text-[#596069] mb-2">
              Preferred Companies
            </label>
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="bg-white border border-[#d9dde1] rounded-[16px] px-4 py-3 text-sm text-[#22272BCC] flex justify-between items-center cursor-pointer"
            >
              <span className="truncate">
                {selectedCompanies.length > 0
                  ? selectedCompanies
                      .map(
                        (val) =>
                          companies.find((c) => c.value === val)?.label || val
                      )
                      .join(", ")
                  : "Select Companies"}
              </span>
              <svg
                className={`w-4 h-4 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            {isOpen && (
              <div className="absolute z-10 mt-2 w-full bg-white border border-blue-300 rounded-[16px] shadow-md p-3 space-y-2 max-h-60 overflow-y-auto">
                {companies.map((company) => (
                  <label
                    key={company.value}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={company.value}
                      checked={selectedCompanies.includes(company.value)}
                      onChange={() => toggleCompany(company.value)}
                      className="accent-[#6290FF] w-4 h-4 cursor-pointer"
                    />
                    <span className="text-sm text-[#22272B]">
                      {company.label}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Form Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Inputs: Name, DOB, Gender, Phone, Email */}
          {[
            {
              label: "Name*",
              value: name,
              setter: setName,
              type: "text",
              required: true,
            },
            {
              label: "DOB*",
              value: dob,
              setter: setDob,
              type: "date",
              required: true,
            },
            {
              label: "Gender*",
              value: gender,
              setter: setGender,
              type: "select",
              options: ["Male", "Female", "Other"],
              required: true,
            },
            {
              label: "Phone*",
              value: phone,
              setter: setPhone,
              type: "tel",
              required: true,
            },
            {
              label: "Email ID*",
              value: email,
              setter: setEmail,
              type: "email",
              required: true,
            },
          ].map((field, index) => (
            <div key={index} className={index < 3 ? "" : "md:col-span-2"}>
              <label className="block text-[15px] text-[#596069] mb-2">
                {field.label}
              </label>
              {field.type === "select" ? (
                <select
                  value={field.value}
                  onChange={(e) => field.setter(e.target.value)}
                  className="w-full h-14 px-4 bg-white border border-[#d9dde1] rounded-[16px] text-sm focus:outline-none focus:border-blue-300"
                  required={field.required}
                >
                  <option value="">Select Gender</option>
                  {field.options.map((opt) => (
                    <option value={opt.toLowerCase()} key={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={
                    field.type === "date"
                      ? "text"
                      : field.type === "email"
                      ? "email"
                      : field.type
                  }
                  onFocus={
                    field.type === "date"
                      ? (e) => (e.target.type = "date")
                      : undefined
                  }
                  onBlur={
                    field.type === "date"
                      ? (e) => {
                          if (!e.target.value) e.target.type = "text";
                        }
                      : undefined
                  }
                  value={field.value}
                  onChange={(e) => field.setter(e.target.value)}
                  className="w-full h-14 px-4 bg-white border border-[#d9dde1] rounded-[16px] text-sm focus:outline-none focus:border-blue-300"
                  required={field.required}
                />
              )}
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="w-[180px] h-14 bg-gradient-to-r from-[#39b2ff] to-[#c465ea] text-white rounded-[16px] font-semibold text-lg hover:brightness-110 transition"
          >
            Get a Free Quote
          </button>
        </div>
      </form>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default LifeForm;
