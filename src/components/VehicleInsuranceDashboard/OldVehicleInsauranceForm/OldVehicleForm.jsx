import React from "react";

const OldVehicleForm = ({
    onNext,
    setPolicyType,
    policyType,
    currentStep,
    formData,
    setFormData
}) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Old Vehicle Form Submitted!");
        console.log("Data:", formData);
        onNext();
    };

    const handleRcFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, rcFileName: file.name, rcFile: file });
        } else {
            setFormData({ ...formData, rcFileName: null, rcFile: null });
        }
    };

    const handlePolicyFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, policyFileName: file.name, policyFile: file });
        } else {
            setFormData({ ...formData, policyFileName: null, policyFile: null });
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-lg w-full p-8 lg:p-10 relative"
        >
            <h2 className="text-[28px] md:text-[46px] font-semibold text-[#222] mb-1">Vehicle Insurance</h2>
            <p className="text-[14px] md:text-[16px] text-[#22272BCC] mb-8">Compare & Buy Best Fit Vehicle Insurance</p>

            <div className="flex w-full mb-8">
                <div className="flex-1 h-1 bg-[#6290FF] rounded-full mr-2"></div>
                <div className="flex-1 h-1 bg-gray-200 rounded-full mr-2"></div>
                <div className="flex-1 h-1 bg-gray-200 rounded-full"></div>
            </div>

            <h3 className="text-[20px] font-semibold text-[#222] mb-6">Personal Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    className="bg-white shadow-[10px_10px_40px_0px_rgba(26,129,255,0.10)] p-3 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                    value={formData.fullName || ""}
                    onChange={handleChange}
                    required
                />

                <input
                    type="tel"
                    name="mobileNumber"
                    placeholder="Mobile Number"
                    className="bg-white shadow-[10px_10px_40px_0px_rgba(26,129,255,0.10)] p-3 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                    value={formData.mobileNumber || ""}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="emailId"
                    placeholder="Email ID"
                    className="bg-white shadow-[10px_10px_40px_0px_rgba(26,129,255,0.10)] p-3 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                    value={formData.emailId || ""}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="pinCode"
                    placeholder="PIN Code"
                    className="bg-white shadow-[10px_10px_40px_0px_rgba(26,129,255,0.10)] p-3 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                    value={formData.pinCode || ""}
                    onChange={handleChange}
                    required
                />

                {/* Upload RC */}
                <div className="relative flex items-center justify-center h-12 border border-dashed border-[#6290FF] cursor-pointer hover:border-gray-300 transition-colors overflow-hidden">
                    <input
                        type="file"
                        name="rcFile"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        onChange={handleRcFileUpload}
                        aria-label="Upload RC Copy"
                    />
                    <div className="flex items-center space-x-2 text-[#52A6D2] w-full justify-center px-2">
                        {formData.rcFileName ? (
                            <span className="text-[15px] text-gray-900 truncate">
                                {formData.rcFileName}
                            </span>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                                    <path d="M11 19H13V14.825L14.6 16.425L16 15L12 11L8 15L9.425 16.4L11 14.825V19Z" fill="#52A6D2"/>
                                    <path d="M6 22C5.45 22 4.97917 21.8042 4.5875 21.4125C4.19583 21.0208 4 20.55 4 20V4C4 3.45 4.19583 2.97917 4.5875 2.5875C4.97917 2.19583 5.45 2 6 2H14L20 8V20C20 20.55 19.8042 21.0208 19.4125 21.4125C19.0208 21.8042 18.55 22 18 22H6ZM13 9V4H6V20H18V9H13Z" fill="#52A6D2"/>
                                </svg>
                                <span className="text-[14px] whitespace-nowrap">Upload RC Copy <span className="text-xs text-[#52A6D2]">(Opt)</span></span>
                            </>
                        )}
                    </div>
                </div>

                {/* Upload Policy */}
                <div className="relative flex items-center justify-center h-12 border border-dashed border-[#6290FF] cursor-pointer hover:border-gray-300 transition-colors overflow-hidden">
                    <input
                        type="file"
                        name="policyFile"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        onChange={handlePolicyFileUpload}
                        aria-label="Upload Policy Copy"
                    />
                    <div className="flex items-center space-x-2 text-[#52A6D2] w-full justify-center px-2">
                        {formData.policyFileName ? (
                            <span className="text-[15px] text-gray-900 truncate">
                                {formData.policyFileName}
                            </span>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                                    <path d="M11 19H13V14.825L14.6 16.425L16 15L12 11L8 15L9.425 16.4L11 14.825V19Z" fill="#52A6D2"/>
                                    <path d="M6 22C5.45 22 4.97917 21.8042 4.5875 21.4125C4.19583 21.0208 4 20.55 4 20V4C4 3.45 4.19583 2.97917 4.5875 2.5875C4.97917 2.19583 5.45 2 6 2H14L20 8V20C20 20.55 19.8042 21.0208 19.4125 21.4125C19.0208 21.8042 18.55 22 18 22H6ZM13 9V4H6V20H18V9H13Z" fill="#52A6D2"/>
                                </svg>
                                <span className="text-[15px] whitespace-nowrap">Policy Copy <span className="text-xs text-[#52A6D2]">(Opt)</span></span>
                            </>
                        )}
                    </div>
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

export default OldVehicleForm;
