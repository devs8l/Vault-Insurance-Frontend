import React, { useRef, useEffect, useState } from "react";

const OldAddCover = ({ onPrevious, onGetQuote, formData, setFormData }) => {
  const dropdownRef = useRef(null);
  const [isAddOnDropdownOpen, setIsAddOnDropdownOpen] = useState(false);

  const availableAddOns = [
    { id: "zeroDepreciation", name: "Zero Depreciation – Full claim without part deduction" },
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

  // Handle checkbox selection
  const handleAddOnChange = (e) => {
    const { value, checked } = e.target;
    const selected = formData.selectedAddOns || [];
    const updated = checked
      ? [...selected, value]
      : selected.filter((id) => id !== value);
    setFormData({ ...formData, selectedAddOns: updated });
  };

  const handleGetQuote = (e) => {
    e.preventDefault();
    console.log("Selected Add-Ons:", formData.selectedAddOns);
    if (onGetQuote) onGetQuote();
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
    const selected = formData.selectedAddOns || [];
    if (selected.length === 0) return "Select Add-On Covers";
    return selected
      .map((id) => availableAddOns.find((addOn) => addOn.id === id)?.name)
      .join(", ");
  };

  return (
    <form
      onSubmit={handleGetQuote}
      className="bg-white rounded-3xl shadow-lg w-full p-8 lg:p-10 relative"
    >
      <h2 className="text-[28px] md:text-[46px] font-semibold text-[#222] mb-1">
        Vehicle Insurance
      </h2>
      <p className="text-[14px] md:text-[16px] text-[#22272BCC] mb-8">
        Compare & Buy Best Fit Vehicle Insurance
      </p>

      {/* Progress Bar */}
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
            onClick={() => setIsAddOnDropdownOpen(!isAddOnDropdownOpen)}
            className="h-12 w-full bg-white shadow-[10px_10px_40px_0px_rgba(26,129,255,0.10)] border-2  border-white hover:border-blue-400 cursor-pointer text-gray-900 text-left px-4 pr-8 flex items-center justify-between relative"
          >
            <span
              className={`flex-grow block truncate ${
                (formData.selectedAddOns || []).length > 0
                  ? "text-gray-900"
                  : "text-gray-500"
              }`}
              title={getSelectedAddOnsText()}
            >
              {getSelectedAddOnsText()}
            </span>
            <svg
              className={`fill-current h-4 w-4 transition-transform duration-200 ${
                isAddOnDropdownOpen ? "rotate-180" : ""
              } flex-shrink-0 ml-2`}
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
                    checked={(formData.selectedAddOns || []).includes(addOn.id)}
                    onChange={handleAddOnChange}
                    className="form-checkbox h-4 w-4 text-[#6290FF] rounded accent-[#6290FF]"
                  />
                  <span className="ml-2 text-gray-900 text-sm">{addOn.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="w-full flex justify-end gap-4 mt-8">
        <button
          type="button"
          onClick={onPrevious}
          className="w-full sm:w-[210px] border border-[#62B3F0] text-[#62B3F0] font-semibold py-3 px-8 text-[18px] rounded-[10px] hover:bg-blue-50 transition-colors duration-200 cursor-pointer"
        >
          Previous
        </button>
        <button
          type="submit"
          className="w-full sm:w-[210px] bg-[#62B3F0] text-white font-semibold py-3 px-8 text-[18px] rounded-[10px] hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
        >
          Get a Free Quote
        </button>
      </div>
    </form>
  );
};

export default OldAddCover;
