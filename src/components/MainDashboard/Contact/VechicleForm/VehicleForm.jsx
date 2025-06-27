import React, { useState } from "react";
import NewFirstForm from "./Forms/New/NewFirstForm";
import NewSecondForm from "./Forms/New/NewSecondFrom";
import NewLastForm from "./Forms/New/NewLastForm";
import OldFirstForm from "./Forms/Old/OldFirstForm";
import OldSecondForm from "./Forms/Old/OldSecondForm";


const VehicleForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [policyType, setPolicyType] = useState("new");

    const handleNextStep = () => {
        setCurrentStep((prevStep) => prevStep + 1);
    };

    const handlePreviousStep = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };

    const handleGetQuote = () => {
        console.log("Getting a free quote!");
        setCurrentStep(4);
    };

    const newFormStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <NewFirstForm
                        onNext={handleNextStep}
                        setPolicyType={setPolicyType}
                        policyType={policyType}
                        currentStep={currentStep}
                    />
                );
            case 2:
                return (
                    <NewSecondForm
                        onPrevious={handlePreviousStep}
                        onNext={handleNextStep}
                        policyType={policyType}
                        currentStep={currentStep}
                    />
                );
            case 3:
                return (
                    <NewLastForm
                        onPrevious={handlePreviousStep}
                        onGetQuote={handleGetQuote}
                        policyType={policyType}
                        currentStep={currentStep}
                    />
                );
            case 4:
                return (
                    <div className="bg-white rounded-3xl shadow-lg w-full p-8 lg:p-10 text-center">
                        <h3 className="text-[28px] font-semibold text-[#222] mb-4">Thank You!</h3>
                        <p className="text-[16px] text-[#22272BCC]">Your request for a free quote has been submitted successfully.</p>
                        <button
                            onClick={() => setCurrentStep(1)}
                            className="mt-8 bg-[#62B3F0] text-white font-semibold py-3 px-8 text-[18px] rounded-[10px] hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
                        >
                            Start New Request
                        </button>
                    </div>
                );
            default:
                return (
                    <NewFirstForm
                        onNext={handleNextStep}
                        setPolicyType={setPolicyType}
                        policyType={policyType}
                        currentStep={currentStep}
                    />
                );
        }
    };

    const oldFormStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <OldFirstForm
                        onNext={handleNextStep}
                        setPolicyType={setPolicyType}
                        policyType={policyType}
                        currentStep={currentStep}
                    />
                );
            case 2:
                return (
                    <OldSecondForm
                        onPrevious={handlePreviousStep}
                        onNext={handleNextStep}
                        policyType={policyType}
                        currentStep={currentStep}
                    />
                );
            case 3:
                return (
                    <OldAddCover
                        onPrevious={handlePreviousStep}
                        onGetQuote={handleGetQuote}
                        policyType={policyType}
                        currentStep={currentStep}
                    />
                );
            case 4:
                return (
                    <div className="bg-white rounded-3xl shadow-lg w-full p-8 lg:p-10 text-center">
                        <h3 className="text-[28px] font-semibold text-[#222] mb-4">Thank You!</h3>
                        <p className="text-[16px] text-[#22272BCC]">Your request for a free quote has been submitted successfully.</p>
                        <button
                            onClick={() => setCurrentStep(1)}
                            className="mt-8 bg-[#62B3F0] text-white font-semibold py-3 px-8 text-[18px] rounded-[10px] hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
                        >
                            Start New Request
                        </button>
                    </div>
                );
            default:
                return (
                    <OldFirstForm
                        onNext={handleNextStep}
                        setPolicyType={setPolicyType}
                        policyType={policyType}
                        currentStep={currentStep}
                    />
                );
        }
    };

    return (
        <section    >
            <div className="flex flex-col items-center justify-center">
                {policyType === "new" ? newFormStep() : oldFormStep()}
            </div>
        </section>
    );
};

export default VehicleForm;
