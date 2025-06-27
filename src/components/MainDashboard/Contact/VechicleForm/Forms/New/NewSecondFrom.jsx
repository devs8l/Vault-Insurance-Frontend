import React, { useState, useRef, useEffect } from "react";

const NewSecondForm = ({ onPrevious, onNext }) => {
    const [vehicleCategory, setVehicleCategory] = useState("");
    const [vehicleBrand, setVehicleBrand] = useState("");
    const [vehicleModel, setVehicleModel] = useState("");
    const [fuelType, setFuelType] = useState("");
    const [registrationYear, setRegistrationYear] = useState("");
    const [coverageType, setCoverageType] = useState("");
    const [preferredCompanies, setPreferredCompanies] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const dropdownRef = useRef(null);

    const insuranceCompanies = [
        "ICICI Lombard General Insurance",
        "HDFC ERGO General Insurance",
        "Tata AIG General Insurance",
        "Future Generali India Insurance",
        "Chola Manadalam",
    ];

    const handleCompanyChange = (e) => {
        const { value, checked } = e.target;
        setPreferredCompanies((prev) =>
            checked ? [...prev, value] : prev.filter((c) => c !== value)
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Vehicle Information Submitted!");
        onNext && onNext();
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

    const inputClass =
        "w-full h-14 px-4 bg-white border border-[#d9dde1] rounded-[16px] text-base focus:outline-none focus:border-blue-300 cursor-pointer";

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <h2 className="text-[20px] md:text-[25px] font-semibold text-[#222] mb-1">
                Vehicle Insurance
            </h2>
            <p className="text-[14px] md:text-[16px] text-[#22272BCC] mb-8">
                Compare & Buy Best Fit Vehicle Insurance
            </p>

            <div className="flex w-full mb-8">
                <div className="flex-1 h-1 bg-[#6290FF] rounded-full mr-2"></div>
                <div className="flex-1 h-1 bg-[#6290FF] rounded-full mr-2"></div>
                <div className="flex-1 h-1 bg-gray-200 rounded-full"></div>
            </div>

            <h3 className="text-[20px] font-semibold text-[#222] mb-6">Vehicle Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* Vehicle Category */}
                <select
                    id="vehicleCategory"
                    className={inputClass}
                    value={vehicleCategory}
                    onChange={(e) => setVehicleCategory(e.target.value)}
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

                <input
                    type="text"
                    id="vehicleBrand"
                    className={inputClass}
                    placeholder="Vehicle Brand"
                    value={vehicleBrand}
                    onChange={(e) => setVehicleBrand(e.target.value)}
                    required
                />

                <input
                    type="text"
                    id="vehicleModel"
                    className={inputClass}
                    placeholder="Vehicle Model"
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value)}
                    required
                />

                {/* Fuel Type */}
                <select
                    id="fuelType"
                    className={inputClass}
                    value={fuelType}
                    onChange={(e) => setFuelType(e.target.value)}
                    required
                >
                    <option value="" disabled>Fuel Type</option>
                    <option value="petrol">Petrol</option>
                    <option value="diesel">Diesel</option>
                    <option value="cng">CNG / LPG</option>
                    <option value="electric">Electric</option>
                    <option value="hybrid">Hybrid</option>
                </select>

                {/* Registration Year */}
                <select
                    id="registrationYear"
                    className={inputClass}
                    value={registrationYear}
                    onChange={(e) => setRegistrationYear(e.target.value)}
                    required
                >
                    <option value="" disabled>Est. Registration Year</option>
                    {Array.from({ length: 3 }, (_, i) => new Date().getFullYear() + i).map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>

                {/* Coverage Type */}
                <select
                    id="coverageType"
                    className={inputClass}
                    value={coverageType}
                    onChange={(e) => setCoverageType(e.target.value)}
                    required
                >
                    <option value="" disabled>Coverage Type</option>
                    <option value="comprehensive">Comprehensive</option>
                    <option value="third-party">Third Party</option>
                    <option value="own-damage">Own Damage</option>
                </select>

                {/* Preferred Companies */}
                <div className="col-span-full relative" ref={dropdownRef}>
                    <div className="relative">
                        <button
                            type="button"
                            className={`${inputClass} text-left flex justify-between items-center`}
                            onClick={() => setShowDropdown(!showDropdown)}
                        >
                            <span>
                                {preferredCompanies.length > 0
                                    ? preferredCompanies.join(", ")
                                    : "Preferred Insurance Companies"}
                            </span>
                            <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                            </svg>
                        </button>

                        {showDropdown && (
                            <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-md max-h-64 overflow-y-auto">
                                {insuranceCompanies.map((company) => (
                                    <label key={company} className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            value={company}
                                            checked={preferredCompanies.includes(company)}
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

            {/* Buttons */}
            <div className="w-full flex justify-end gap-4 mt-8">
                <button
                    type="button"
                    onClick={onPrevious}
                    className="w-full sm:w-[180px] flex-1 md:flex-none border border-[#62B3F0] text-[#62B3F0] font-semibold py-3 px-8 text-[18px] rounded-[10px] hover:bg-blue-50 transition-colors duration-200 cursor-pointer"
                >
                    Previous
                </button>
                <button
                    type="submit"
                    className="w-full sm:w-[180px] h-14 bg-gradient-to-r from-[#39b2ff] to-[#c465ea] text-white rounded-[16px] font-semibold text-lg hover:brightness-110 transition cursor-pointer"
                >
                    Next
                </button>
            </div>
        </form>
    );
};

export default NewSecondForm;
