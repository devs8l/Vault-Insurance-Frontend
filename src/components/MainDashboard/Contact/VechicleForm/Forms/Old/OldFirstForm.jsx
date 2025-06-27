import React, { useState } from "react";

const OldFirstForm = ({ onNext, setPolicyType, policyType, currentStep }) => {
    const [fullName, setFullName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [emailId, setEmailId] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [rcFileName, setRcFileName] = useState(null);
    const [policyFileName, setPolicyFileName] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Old Vehicle Form Submitted!");
        console.log("Policy Type:", policyType);
        console.log("Full Name:", fullName);
        console.log("Mobile Number:", mobileNumber);
        console.log("Email ID:", emailId);
        console.log("PIN Code:", pinCode);
        console.log("RC File Name:", rcFileName);
        console.log("Policy File Name:", policyFileName);
        onNext();
    };

    const handleRcFileUpload = (e) => {
        const file = e.target.files[0];
        setRcFileName(file ? file.name : null);
    };

    const handlePolicyFileUpload = (e) => {
        const file = e.target.files[0];
        setPolicyFileName(file ? file.name : null);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full relative">
            <h2 className="text-[20px] md:text-[25px] font-semibold text-[#222] mb-1">Vehicle Insurance</h2>
            <p className="text-[14px] md:text-[16px] text-[#22272BCC] mb-8">
                Compare & Buy Best Fit Vehicle Insurance
            </p>

            {/* Progress Bar */}
            <div className="flex w-full mb-8">
                <div className="flex-1 h-1 bg-[#6290FF] rounded-full mr-2"></div>
                <div className="flex-1 h-1 bg-gray-200 rounded-full mr-2"></div>
                <div className="flex-1 h-1 bg-gray-200 rounded-full"></div>
            </div>

            <h3 className="text-[20px] font-semibold text-[#222] mb-6">Personal Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full h-14 px-4 bg-white border border-[#d9dde1] rounded-[16px] text-base focus:outline-none focus:border-blue-300 cursor-pointer"
                />

                <input
                    type="tel"
                    placeholder="Mobile Number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    required
                    className="w-full h-14 px-4 bg-white border border-[#d9dde1] rounded-[16px] text-base focus:outline-none focus:border-blue-300 cursor-pointer"
                />

                <input
                    type="email"
                    placeholder="Email ID"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                    required
                    className="w-full h-14 px-4 bg-white border border-[#d9dde1] rounded-[16px] text-base focus:outline-none focus:border-blue-300 cursor-pointer"
                />

                <input
                    type="text"
                    placeholder="PIN Code"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    required
                    className="w-full h-14 px-4 bg-white border border-[#d9dde1] rounded-[16px] text-base focus:outline-none focus:border-blue-300 cursor-pointer"
                />

                {/* RC Copy Upload */}
                <div className="relative flex items-center justify-center h-14 border border-dashed border-[#6290FF] rounded-[16px] cursor-pointer hover:border-gray-300 transition-colors overflow-hidden">
                    <input
                        type="file"
                        id="rcCopy"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        onChange={handleRcFileUpload}
                        aria-label="Upload RC Copy"
                    />
                    <div className="flex items-center space-x-1 text-[#52A6D2] w-full justify-center px-1">
                        {rcFileName ? (
                            <span className="text-[15px] text-gray-900 truncate">{rcFileName}</span>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                                    <path
                                        d="M11 19H13V14.825L14.6 16.425L16 15L12 11L8 15L9.425 16.4L11 14.825V19ZM6 22C5.45 22 4.97917 21.8042 4.5875 21.4125C4.19583 21.0208 4 20.55 4 20V4C4 3.45 4.19583 2.97917 4.5875 2.5875C4.97917 2.19583 5.45 2 6 2H14L20 8V20C20 20.55 19.8042 21.0208 19.4125 21.4125C19.0208 21.8042 18.55 22 18 22H6ZM13 9V4H6V20H18V9H13Z"
                                        fill="#52A6D2"
                                    />
                                </svg>
                                <span className="text-[14px] whitespace-nowrap">Upload RC Copy <span className="text-xs text-[#52A6D2]">(Opt)</span></span>
                            </>
                        )}
                    </div>
                </div>

                {/* Policy Copy Upload */}
                <div className="relative flex items-center justify-center h-14 px-4 border border-dashed border-[#6290FF] rounded-[16px] cursor-pointer hover:border-gray-300 transition-colors overflow-hidden">
                    <input
                        type="file"
                        id="policyCopy"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        onChange={handlePolicyFileUpload}
                        aria-label="Upload Policy Copy"
                    />
                    <div className="flex items-center space-x-2 text-[#52A6D2] w-full justify-center px-1">
                        {policyFileName ? (
                            <span className="text-[15px] text-gray-900 truncate">{policyFileName}</span>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                                    <path
                                        d="M11 19H13V14.825L14.6 16.425L16 15L12 11L8 15L9.425 16.4L11 14.825V19ZM6 22C5.45 22 4.97917 21.8042 4.5875 21.4125C4.19583 21.0208 4 20.55 4 20V4C4 3.45 4.19583 2.97917 4.5875 2.5875C4.97917 2.19583 5.45 2 6 2H14L20 8V20C20 20.55 19.8042 21.0208 19.4125 21.4125C19.0208 21.8042 18.55 22 18 22H6ZM13 9V4H6V20H18V9H13Z"
                                        fill="#52A6D2"
                                    />
                                </svg>
                                <span className="text-[14px] whitespace-nowrap">Policy Copy <span className="text-xs text-[#52A6D2]">(Opt)</span></span>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Policy Type Selection */}
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

            <div className="w-full flex justify-end">
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

export default OldFirstForm;
