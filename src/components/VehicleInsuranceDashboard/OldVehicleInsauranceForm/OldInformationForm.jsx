import React, { useState, useRef, useEffect } from "react";

const OldInformationForm = ({
    onPrevious,
    onNext,
    policyType,
    currentStep,
    formData,
    setFormData,
    }) => {
    const dropdownRef = useRef(null);
    const [showDropdown, setShowDropdown] = useState(false);

    const insuranceCompanies = [
        "ICICI Lombard General Insurance",
        "HDFC ERGO General Insurance",
        "Tata AIG General Insurance",
        "Future Generali India Insurance",
        "Chola Manadalam",
    ];

    const handleCompanyChange = (e) => {
        const { value, checked } = e.target;
        const updatedCompanies = checked
        ? [...(formData.preferredCompanies || []), value]
        : (formData.preferredCompanies || []).filter((c) => c !== value);

        setFormData({ ...formData, preferredCompanies: updatedCompanies });
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1999 }, (_, i) => 2000 + i).reverse();
    const prevExpiryYears = Array.from({ length: 7 }, (_, i) => currentYear - 5 + i);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Vehicle Info:", formData);
        onNext && onNext();
    };

    const handlePrevious = () => onPrevious && onPrevious();

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-lg w-full p-8 lg:p-10 relative"
        >
            <h2 className="text-[28px] md:text-[46px] font-semibold text-[#222] mb-1">Vehicle Insurance</h2>
            <p className="text-[14px] md:text-[16px] text-[#22272BCC] mb-8">Compare & Buy Best Fit Vehicle Insurance</p>

            {/* Progress Indicator (Updated for second step) */}
            <div className="flex w-full mb-8">
                {/* Progress bar logic now correctly uses currentStep and policyType */}
                <div className={`flex-1 h-1 ${policyType === 'old' && currentStep >= 1 ? 'bg-[#6290FF]' : 'bg-gray-200'} rounded-full mr-2`}></div> {/* Completed (OldVehicleForm) */}
                <div className={`flex-1 h-1 ${policyType === 'old' && currentStep >= 2 ? 'bg-[#6290FF]' : 'bg-gray-200'} rounded-full mr-2`}></div> {/* Current (OldInformationForm) */}
                <div className={`flex-1 h-1 ${policyType === 'old' && currentStep >= 3 ? 'bg-[#6290FF]' : 'bg-gray-200'} rounded-full`}></div> {/* Remaining (OldAddCover) */}
            </div>

            <h3 className="text-[20px] font-semibold text-[#222] mb-6">Old Vehicle Information</h3>

            {/* Grid layout for form fields, ensuring consistent alignment and spacing */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* Vehicle Category Dropdown */}
                <div className="relative">
                    <select
                        id="vehicleCategory"
                        className="w-full bg-white shadow-[10px_10px_40px_0px_rgba(26,129,255,0.10)] p-3 
                        text-sm text-[#22272BCC] appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                        value={formData.vehicleCategory || ""}
                        onChange={(e) => setFormData({ ...formData, vehicleCategory: e.target.value })}
                        required
                    >
                        <option value="" disabled>Vehicle Category</option>
                        <option value="two-wheeler">Two-Wheeler</option>
                        <option value="private-car">Private Car</option>
                        <option value="taxi-commercial-car">Taxi / Commercial Car</option>
                        <option value="goods-light">Goods-Carrying – Light</option>
                        <option value="goods-heavy">Goods-Carrying – Heavy</option>
                        <option value="school-staff-bus">School Bus / Staff Bus</option>
                        <option value="other-passenger">Other Passenger Vehicle</option>
                        <option value="agricultural">Agricultural Vehicle</option>
                        <option value="construction">Construction Equipment</option>
                    </select>
                    {/* Custom arrow for dropdown */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>

                {/* Registration Number - Text Input */}
                <div className="relative">
                    <input
                        type="text"
                        id="registrationNumber"
                        className="w-full bg-white shadow-[10px_10px_40px_0px_rgba(26,129,255,0.10)] p-3 
                        text-sm text-[#22272BCC] appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                        placeholder="Registration Number"
                        value={formData.registrationNumber || ""}
                        onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                        required
                    />
                </div>

                {/* Registration Year - Dropdown */}
                <div className="relative">
                    <select
                        id="registrationYear"
                        className="w-full bg-white shadow-[10px_10px_40px_0px_rgba(26,129,255,0.10)] p-3 
                        text-sm text-[#22272BCC] appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                        value={formData.registrationYear || ""}
                        onChange={(e) => setFormData({ ...formData, registrationYear: e.target.value })}
                        required
                    >
                        <option value="" disabled hidden>Registration Year</option>
                        {years.map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>

                {/* Previous Policy Expiry - Dropdown */}
                <div className="relative">
                    <select
                        id="prevPolicyExpiry"
                        className="w-full bg-white shadow-[10px_10px_40px_0px_rgba(26,129,255,0.10)] p-3 
                        text-sm text-[#22272BCC] appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                        value={formData.prevPolicyExpiry || ""}
                        onChange={(e) => setFormData({ ...formData, prevPolicyExpiry: e.target.value })}
                    >
                        <option value="" disabled hidden>Prev. Policy Expiry</option>
                        {prevExpiryYears.map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>

                {/* Previous Claims - Styled as a dropdown */}
                <div className="relative">
                    <select
                        id="previousClaims"
                        className="w-full bg-white shadow-[10px_10px_40px_0px_rgba(26,129,255,0.10)] p-3 
                        text-sm text-[#22272BCC] appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                        value={formData.previousClaims || ""}
                        onChange={(e) => setFormData({ ...formData, previousClaims: e.target.value })}
                        required
                    >
                        <option value="" disabled hidden>Previous Claims</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>

                {/* Fuel Type Dropdown */}
                <div className="relative">
                    <select
                        id="fuelType"
                        className="w-full bg-white shadow-[10px_10px_40px_0px_rgba(26,129,255,0.10)] p-3 
                        text-sm text-[#22272BCC] appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                        value={formData.fuelType || ""}
                        onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
                        required
                    >
                        <option value="" disabled>Fuel Type</option>
                        <option value="petrol">Petrol</option>
                        <option value="diesel">Diesel</option>
                        <option value="cng">CNG / LPG</option>
                        <option value="electric">Electric</option>
                        <option value="hybrid">Hybrid</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>

                {/* Coverage Type Dropdown */}
                <div className="relative">
                    <select
                        id="coverageType"
                        className="w-full bg-white shadow-[10px_10px_40px_0px_rgba(26,129,255,0.10)] p-3 
                        text-sm text-[#22272BCC] appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                        value={formData.coverageType || ""}
                        onChange={(e) => setFormData({ ...formData, coverageType: e.target.value })}
                        required
                    >
                        <option value="" disabled>Coverage Type</option>
                        <option value="comprehensive">Comprehensive</option>
                        <option value="third-party">Third Party</option>
                        <option value="own-damage">Own Damage</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>

                {/* Preferred Insurance Companies Multi-select Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <div className="relative">
                        <button
                            type="button"
                            className="w-full sm:w-[300px] bg-white shadow-[10px_10px_40px_0px_rgba(26,129,255,0.10)] p-3 text-[13px] font-semibold text-[#22272BCC] border-2  border-white hover:border-blue-400 cursor-pointer flex justify-between items-center"
                            onClick={() => setShowDropdown((prev) => !prev)}
                        >
                            <span className="truncate">
                                {(formData.preferredCompanies || []).length > 0
                                    ? formData.preferredCompanies.join(", ")
                                    : "Preferred Insurance Companies"}
                            </span>
                            <svg className="fill-current h-4 w-4 ml-2 text-gray-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </button>

                        {/* Dropdown menu */}
                        {showDropdown && (
                            <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-md max-h-64 overflow-y-auto">
                                {insuranceCompanies.map((company) => (
                                    <label
                                        key={company}
                                        className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            value={company}
                                            checked={(formData.preferredCompanies || []).includes(company)}
                                            onChange={handleCompanyChange}
                                            className="accent-[#6290FF] mr-2"
                                        />
                                        <span className="text-gray-700">{company}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Previous and Next Buttons */}
            <div className="w-full flex justify-end gap-4 mt-8">
                <button
                    type="button"
                    onClick={handlePrevious}
                    className="w-full sm:w-[180px] flex-1 md:flex-none border border-[#62B3F0] text-[#62B3F0] font-semibold py-3 px-8 text-[18px] rounded-[10px] hover:bg-blue-50 transition-colors duration-200 cursor-pointer"
                >
                    Previous
                </button>
                <button
                    type="submit"
                    className="w-full sm:w-[180px] flex-1 md:flex-none bg-[#62B3F0] text-white font-semibold py-3 px-8 text-[18px] rounded-[10px] hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
                >
                    Next
                </button>
            </div>
        </form>
    );
};

export default OldInformationForm;