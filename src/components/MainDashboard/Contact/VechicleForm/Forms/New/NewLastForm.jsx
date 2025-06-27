import React, { useState, useRef, useEffect } from "react";

const NewLastForm = ({ onPrevious, onGetQuote }) => {
    const [selectedAddOns, setSelectedAddOns] = useState([]);
    const [isAddOnDropdownOpen, setIsAddOnDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const availableAddOns = [
        { id: "engineProtection", name: "Engine Protection – Covers engine damage from water/oil issues" },
        { id: "roadsideAssistance", name: "Roadside Assistance – Help for breakdown, towing, fuel, etc." },
        { id: "returnToInvoice", name: "Return to Invoice – Get full car value if stolen or totaled" },
        { id: "consumablesCover", name: "Consumables Cover – Covers oil, nuts, bolts, etc." },
        { id: "keyReplacement", name: "Key Replacement – Covers lost or stolen keys" },
        { id: "tyreProtection", name: "Tyre Protection – Covers tyre damage or replacement" },
        { id: "paCoverPassengers", name: "PA Cover (Passengers) – Accident cover for passengers" },
        { id: "dailyAllowance", name: "Daily Allowance – Travel money if car is under repair" },
        { id: "ncbProtection", name: "NCB Protection – Keep No Claim Bonus after a claim" },
    ];

    const handleAddOnChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedAddOns((prev) => [...prev, value]);
        } else {
            setSelectedAddOns((prev) => prev.filter((addOn) => addOn !== value));
        }
    };

    const handleGetQuote = (e) => {
        e.preventDefault();
        console.log("Add-on Covers Submitted!");
        console.log("Selected Add-Ons:", selectedAddOns);
        if (onGetQuote) {
            onGetQuote();
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsAddOnDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const getSelectedAddOnsText = () => {
        if (selectedAddOns.length === 0) return "Select Add-On Covers";
        const names = selectedAddOns.map(id => availableAddOns.find(a => a.id === id)?.name);
        return names.join(', ');
    };

    const dropdownBtnClass =
        "w-full h-14 px-4 bg-white border border-[#d9dde1] rounded-[16px] text-base text-left focus:outline-none focus:border-blue-300 cursor-pointer flex items-center justify-between";

    return (
        <form onSubmit={handleGetQuote} className="w-full">
            <h2 className="text-[20px] md:text-[25px] font-semibold text-[#222] mb-1">Vehicle Insurance</h2>
            <p className="text-[14px] md:text-[16px] text-[#22272BCC] mb-8">Compare & Buy Best Fit Vehicle Insurance</p>

            {/* Progress */}
            <div className="flex w-full mb-8">
                <div className="flex-1 h-1 bg-[#6290FF] rounded-full mr-2"></div>
                <div className="flex-1 h-1 bg-[#6290FF] rounded-full mr-2"></div>
                <div className="flex-1 h-1 bg-[#6290FF] rounded-full"></div>
            </div>

            <h3 className="text-[20px] font-semibold text-[#222] mb-6">
                Add-on Covers <span className="text-[#999] text-base">(Optional)</span>
            </h3>

            <div className="grid grid-cols-1 gap-6 mb-8">
                <div className="relative" ref={dropdownRef}>
                    <button
                        type="button"
                        className={dropdownBtnClass}
                        onClick={() => setIsAddOnDropdownOpen(!isAddOnDropdownOpen)}
                    >
                        <span className={`truncate ${selectedAddOns.length > 0 ? 'text-gray-900' : 'text-gray-500'}`}>
                            {getSelectedAddOnsText()}
                        </span>
                        <svg
                            className={`h-4 w-4 transform transition-transform duration-200 ${isAddOnDropdownOpen ? "rotate-180" : ""}`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </button>

                    {isAddOnDropdownOpen && (
                        <div className="absolute z-10 mt-1 w-full rounded-xl border border-gray-300 bg-white shadow-lg py-2 max-h-60 overflow-y-auto">
                            {availableAddOns.map((addOn) => (
                                <label
                                    key={addOn.id}
                                    className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                                >
                                    <input
                                        type="checkbox"
                                        value={addOn.id}
                                        checked={selectedAddOns.includes(addOn.id)}
                                        onChange={handleAddOnChange}
                                        className="form-checkbox h-4 w-4 text-[#6290FF] accent-[#6290FF] mr-2"
                                    />
                                    <span className="text-gray-900 text-sm">{addOn.name}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Buttons */}
            <div className="w-full flex justify-end gap-4 mt-8">
                <button
                    type="button"
                    onClick={onPrevious}
                    className="w-full sm:w-[180px] border border-[#62B3F0] text-[#62B3F0] font-semibold py-3 px-8 text-[18px] rounded-[10px] hover:bg-blue-50 transition-colors duration-200 cursor-pointer"
                >
                    Previous
                </button>
                <button
                    type="submit"
                    className="w-full sm:w-[180px] h-14 bg-gradient-to-r from-[#39b2ff] to-[#c465ea] text-white rounded-[16px] font-semibold text-lg hover:brightness-110 transition cursor-pointer"
                >
                    Get a Free Quote
                </button>
            </div>
        </form>
    );
};

export default NewLastForm;
