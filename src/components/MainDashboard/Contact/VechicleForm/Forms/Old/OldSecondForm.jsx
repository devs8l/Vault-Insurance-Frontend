import React, { useRef, useEffect, useState } from "react";

const OldSecondForm = ({ formData, setFormData, onPrevious, onNext, currentStep }) => {
    const dropdownRef = useRef(null);
    const [showDropdown, setShowDropdown] = useState(false);

    const insuranceCompanies = [
        "ICICI Lombard General Insurance",
        "HDFC ERGO General Insurance",
        "Tata AIG General Insurance",
        "Future Generali India Insurance",
        "Chola Manadalam",
    ];

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1999 }, (_, i) => 2000 + i).reverse();
    const prevExpiryYears = Array.from({ length: 7 }, (_, i) => currentYear - 5 + i);

    const handleCompanyChange = (e) => {
        const { value, checked } = e.target;
        const updated = checked
            ? [...formData.preferredCompanies, value]
            : formData.preferredCompanies.filter((c) => c !== value);
        setFormData({ ...formData, preferredCompanies: updated });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext?.();
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <h2 className="text-[20px] md:text-[25px] font-semibold text-[#222] mb-1">Vehicle Insurance</h2>
            <p className="text-[14px] md:text-[16px] text-[#22272BCC] mb-8">Compare & Buy Best Fit Vehicle Insurance</p>

            {/* Progress bar */}
            <div className="flex w-full mb-8">
                <div className={`flex-1 h-1 ${currentStep >= 1 ? "bg-[#6290FF]" : "bg-gray-200"} rounded-full mr-2`} />
                <div className={`flex-1 h-1 ${currentStep >= 2 ? "bg-[#6290FF]" : "bg-gray-200"} rounded-full mr-2`} />
                <div className={`flex-1 h-1 ${currentStep >= 3 ? "bg-[#6290FF]" : "bg-gray-200"} rounded-full`} />
            </div>

            <h3 className="text-[20px] font-semibold text-[#222] mb-6">Old Vehicle Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <select
                    name="vehicleCategory"
                    value={formData.vehicleCategory}
                    onChange={handleChange}
                    required
                    className="w-full h-14 px-4 bg-white border border-[#d9dde1] rounded-[16px]"
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

                <input
                    type="text"
                    name="registrationNumber"
                    placeholder="Registration Number"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    required
                    className="w-full h-14 px-4 border border-[#d9dde1] rounded-[16px]"
                />

                <select
                    name="registrationYear"
                    value={formData.registrationYear}
                    onChange={handleChange}
                    required
                    className="w-full h-14 px-4 border border-[#d9dde1] rounded-[16px]"
                >
                    <option value="" disabled hidden>Registration Year</option>
                    {years.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>

                <select
                    name="prevPolicyExpiry"
                    value={formData.prevPolicyExpiry}
                    onChange={handleChange}
                    className="w-full h-14 px-4 border border-[#d9dde1] rounded-[16px]"
                >
                    <option value="" disabled hidden>Prev. Policy Expiry</option>
                    {prevExpiryYears.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>

                <select
                    name="previousClaims"
                    value={formData.previousClaims}
                    onChange={handleChange}
                    required
                    className="w-full h-14 px-4 border border-[#d9dde1] rounded-[16px]"
                >
                    <option value="" disabled hidden>Previous Claims</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>

                <select
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleChange}
                    required
                    className="w-full h-14 px-4 border border-[#d9dde1] rounded-[16px]"
                >
                    <option value="" disabled hidden>Fuel Type</option>
                    <option value="petrol">Petrol</option>
                    <option value="diesel">Diesel</option>
                    <option value="cng">CNG / LPG</option>
                    <option value="electric">Electric</option>
                    <option value="hybrid">Hybrid</option>
                </select>

                <select
                    name="coverageType"
                    value={formData.coverageType}
                    onChange={handleChange}
                    required
                    className="w-full h-14 px-4 border border-[#d9dde1] rounded-[16px]"
                >
                    <option value="" disabled hidden>Coverage Type</option>
                    <option value="comprehensive">Comprehensive</option>
                    <option value="third-party">Third Party</option>
                    <option value="own-damage">Own Damage</option>
                </select>

                {/* Preferred Companies Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        type="button"
                        onClick={() => setShowDropdown((prev) => !prev)}
                        className="w-full h-14 px-4 border border-[#d9dde1] rounded-[16px] flex justify-between items-center text-left"
                    >
                        <span className="truncate">
                            {formData.preferredCompanies.length > 0
                                ? formData.preferredCompanies.join(", ")
                                : "Preferred Insurance Companies"}
                        </span>
                        <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </button>
                    {showDropdown && (
                        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-md max-h-64 overflow-y-auto">
                            {insuranceCompanies.map((company) => (
                                <label key={company} className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        value={company}
                                        checked={formData.preferredCompanies.includes(company)}
                                        onChange={handleCompanyChange}
                                        className="accent-[#6290FF] mr-2"
                                    />
                                    <span>{company}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="w-full flex justify-end gap-4">
                <button
                    type="button"
                    onClick={onPrevious}
                    className="w-full sm:w-[180px] border border-[#62B3F0] text-[#62B3F0] font-semibold py-3 px-8 text-[18px] rounded-[10px] hover:bg-blue-50 transition-colors"
                >
                    Previous
                </button>
                <button
                    type="submit"
                    className="w-full sm:w-[180px] h-14 bg-gradient-to-r from-[#39b2ff] to-[#c465ea] text-white rounded-[16px] font-semibold text-lg hover:brightness-110"
                >
                    Next
                </button>
            </div>
        </form>
    );
};

export default OldSecondForm;
