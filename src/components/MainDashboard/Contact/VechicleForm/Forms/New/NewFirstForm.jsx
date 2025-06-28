import React from "react";

const NewFirstForm = ({ onNext, setPolicyType, policyType, currentStep ,formData, setFormData }) => {
    const handleChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext();
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            {/* Heading */}
            <h2 className="text-[20px] md:text-[25px] font-semibold text-[#222] mb-1">
                Vehicle Insurance
            </h2>
            <p className="text-[14px] md:text-[16px] text-[#22272BCC] mb-8">
                Compare & Buy Best Fit Vehicle Insurance
            </p>

            {/* Step Indicator */}
            <div className="flex w-full mb-8">
                {[1, 2, 3].map((step) => (
                    <div
                        key={step}
                        className={`flex-1 h-1 ${
                            policyType === 'new' && currentStep === step
                                ? 'bg-[#6290FF]'
                                : 'bg-gray-200'
                        } rounded-full ${step !== 3 ? 'mr-2' : ''}`}
                    ></div>
                ))}
            </div>

            <h3 className="text-[20px] font-semibold text-[#222] mb-6">Personal Information</h3>

            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    required
                    className="w-full h-14 px-4 bg-white border border-[#d9dde1] rounded-[16px] text-base focus:outline-none focus:border-blue-300 cursor-pointer"
                />
                <input
                    type="tel"
                    placeholder="Mobile Number"
                    value={formData.mobileNumber}
                    onChange={(e) => handleChange("mobileNumber", e.target.value)}
                    required
                    className="w-full h-14 px-4 bg-white border border-[#d9dde1] rounded-[16px] text-base focus:outline-none focus:border-blue-300 cursor-pointer"
                />
                <input
                    type="email"
                    placeholder="Email ID"
                    value={formData.emailId}
                    onChange={(e) => handleChange("emailId",e.target.value)}
                    required
                    className="w-full h-14 px-4 bg-white border border-[#d9dde1] rounded-[16px] text-base focus:outline-none focus:border-blue-300 cursor-pointer"
                />
                <input
                    type="text"
                    placeholder="PIN Code"
                    value={formData.pinCode}
                    onChange={(e) => handleChange("pinCode", e.target.value)}
                    required
                    className="w-full h-14 px-4 bg-white border border-[#d9dde1] rounded-[16px] text-base focus:outline-none focus:border-blue-300 cursor-pointer"
                />
            </div>

            {/* Policy Type */}
            <div className="flex flex-row gap-6 mb-12">
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

            {/* Submit */}
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

export default NewFirstForm;
