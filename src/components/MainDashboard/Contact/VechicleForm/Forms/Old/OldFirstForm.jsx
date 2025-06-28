import React from "react";

const OldFirstForm = ({
    onNext,
    setPolicyType,
    policyType,
    formData,
    setFormData,
    currentStep
}) => {
    const rcFileName = formData?.rcFile?.name || "";
    const policyFileName = formData?.policyFile?.name || "";

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files.length > 0) {
            setFormData((prev) => ({ ...prev, [name]: files[0] }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext(); // Proceed to next step
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
                {/* Text Inputs */}
                <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName || ""} onChange={handleChange} required className="w-full h-14 px-4 bg-white border border-[#d9dde1] rounded-[16px] text-base focus:outline-none" />
                <input type="tel" name="mobileNumber" placeholder="Mobile Number" value={formData.mobileNumber || ""} onChange={handleChange} required className="w-full h-14 px-4 bg-white border border-[#d9dde1] rounded-[16px] text-base focus:outline-none" />
                <input type="email" name="emailId" placeholder="Email ID" value={formData.emailId || ""} onChange={handleChange} required className="w-full h-14 px-4 bg-white border border-[#d9dde1] rounded-[16px] text-base focus:outline-none" />
                <input type="text" name="pinCode" placeholder="PIN Code" value={formData.pinCode || ""} onChange={handleChange} required className="w-full h-14 px-4 bg-white border border-[#d9dde1] rounded-[16px] text-base focus:outline-none" />

                {/* RC File Upload */}
                <div className="relative flex items-center justify-center h-14 border border-dashed border-[#6290FF] rounded-[16px] cursor-pointer hover:border-gray-300 overflow-hidden">
                    <input
                        type="file"
                        id="rcFile"
                        name="rcFile"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        onChange={handleFileChange}
                        accept=".jpg,.jpeg,.png,.pdf"
                    />
                    <div className="flex items-center text-[#52A6D2] w-full justify-center px-1">
                        {rcFileName ? (
                            <span className="text-[15px] text-gray-900 truncate">{rcFileName}</span>
                        ) : (
                            <>
                                <span className="text-[14px] whitespace-nowrap">Upload RC Copy <span className="text-xs text-[#52A6D2]">(Optional)</span></span>
                            </>
                        )}
                    </div>
                </div>

                {/* Policy File Upload */}
                <div className="relative flex items-center justify-center h-14 px-4 border border-dashed border-[#6290FF] rounded-[16px] cursor-pointer hover:border-gray-300 overflow-hidden">
                    <input
                        type="file"
                        id="policyFile"
                        name="policyFile"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        onChange={handleFileChange}
                        accept=".jpg,.jpeg,.png,.pdf"
                    />
                    <div className="flex items-center text-[#52A6D2] w-full justify-center px-1">
                        {policyFileName ? (
                            <span className="text-[15px] text-gray-900 truncate">{policyFileName}</span>
                        ) : (
                            <>
                                <span className="text-[14px] whitespace-nowrap">Policy Copy <span className="text-xs text-[#52A6D2]">(Optional)</span></span>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Policy Type Radio */}
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

            {/* Submit Button */}
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
