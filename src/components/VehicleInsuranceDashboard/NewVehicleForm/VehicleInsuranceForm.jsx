import React, { useState } from "react";

// Add currentStep to the destructured props
const VehicleInsuranceForm = ({ onNext, setPolicyType, policyType, currentStep }) => {
    const [fullName, setFullName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [emailId, setEmailId] = useState("");
    const [pinCode, setPinCode] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Personal Information Submitted!");
        console.log("Policy Type:", policyType);
        console.log("Full Name:", fullName);
        console.log("Mobile Number:", mobileNumber);
        console.log("Email ID:", emailId);
        console.log("PIN Code:", pinCode);

        if (onNext && policyType === "new") {
            onNext();
        } else if (policyType === "old") {
            console.log("Old Vehicle policy selected, form submitted.");
            onNext();
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-lg w-full p-8 lg:p-10 relative"
        >
            <h2 className="text-[28px] md:text-[46px] font-semibold text-[#222] mb-1">Vehicle Insurance</h2>
            <p className="text-[14px] md:text-[16px] text-[#22272BCC] mb-8">Compare & Buy Best Fit Vehicle Insurance</p>

            {/* Progress Indicator - Now currentStep is defined */}
            <div className="flex w-full mb-8">
                <div className={`flex-1 h-1 ${policyType === 'new' && currentStep === 1 ? 'bg-[#6290FF]' : 'bg-gray-200'} rounded-full mr-2`}></div>
                <div className={`flex-1 h-1 ${policyType === 'new' && currentStep === 2 ? 'bg-[#6290FF]' : 'bg-gray-200'} rounded-full mr-2`}></div>
                <div className={`flex-1 h-1 ${policyType === 'new' && currentStep === 3 ? 'bg-[#6290FF]' : 'bg-gray-200'} rounded-full`}></div>
            </div>


            <h3 className="text-[20px] font-semibold text-[#222] mb-6">Personal Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* Full Name */}
                <div className="relative">
                    <input
                        type="text"
                        id="fullName"
                        className="bg-white shadow-[10px_10px_40px_0px_rgba(26,129,255,0.10)] p-3 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full cursor-pointer"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                    
                </div>

                {/* Mobile Number */}
                <div className="relative">
                    <input
                        type="tel"
                        id="mobileNumber"
                        className="bg-white shadow-[10px_10px_40px_0px_rgba(26,129,255,0.10)] p-3 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full cursor-pointer"
                        placeholder="Mobile Number"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        required
                    />
                </div>

                {/* Email ID */}
                <div className="relative">
                    <input
                        type="email"
                        id="emailId"
                        className="bg-white shadow-[10px_10px_40px_0px_rgba(26,129,255,0.10)] p-3 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full cursor-pointer"
                        placeholder="Email ID"
                        value={emailId}
                        onChange={(e) => setEmailId(e.target.value)}
                        required
                    />
                </div>

                {/* PIN Code */}
                <div className="relative">
                    <input
                        type="text"
                        id="pinCode"
                        className="bg-white shadow-[10px_10px_40px_0px_rgba(26,129,255,0.10)] p-3 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full cursor-pointer"
                        placeholder="PIN Code"
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value)}
                        required
                    />
                </div>
            </div>

            {/* Policy Type Radio Buttons */}
            <div className="flex flex-row gap-4 sm:gap-8 mb-12">
                <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                        type="radio"
                        name="policy"
                        value="new"
                        checked={policyType === "new"}
                        onChange={() => setPolicyType("new")}
                        className="accent-[#6290FF] w-5 h-5"
                    />
                    <span className="text-[#22272B] text-[15px] font-medium">New Vehicle</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                        type="radio"
                        name="policy"
                        value="old"
                        checked={policyType === "old"}
                        onChange={() => setPolicyType("old")}
                        className="accent-[#6290FF] w-5 h-5"
                    />
                    <span className="text-[#22272B] text-[15px] font-medium">Old Vehicle</span>
                </label>
            </div>

            {/* Next Button */}
            <div className="w-full flex justify-end">
                <button
                    type="submit"
                    className="w-full sm:w-[300px] bg-[#62B3F0] text-white font-semibold py-3 px-8 text-[18px] rounded-[10px] hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
                >
                    Next
                </button>
            </div>
        </form>
    );
};

export default VehicleInsuranceForm;