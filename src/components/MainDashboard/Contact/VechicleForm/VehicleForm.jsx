import React, { useState } from "react";
import NewFirstForm from "./Forms/New/NewFirstForm";
import NewSecondForm from "./Forms/New/NewSecondFrom";
import NewLastForm from "./Forms/New/NewLastForm";
import OldFirstForm from "./Forms/Old/OldFirstForm";
import OldSecondForm from "./Forms/Old/OldSecondForm";
import OldLastForm from "./Forms/Old/OldLastForm";
import { createNewVehicle, createOldVehicle } from "../../../../api/VehicleApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VehicleForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [policyType, setPolicyType] = useState("new");

  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    emailId: "",
    pinCode: "",
    vehicleCategory: "",
    vehicleBrand: "",
    vehicleModel: "",
    fuelType: "",
    registrationYear: "",
    coverageType: "",
    preferredCompanies: [],
    selectedAddOns: [],
  });

  const [oldFormData, setOldFormData] = useState({
    fullName: "",
    mobileNumber: "",
    emailId: "",
    pinCode: "",
    rcFile: null,
    policyFile: null,
    vehicleCategory: "",
    registrationNumber: "",
    registrationYear: "",
    prevPolicyExpiry: "",
    previousClaims: "",
    fuelType: "",
    coverageType: "",
    preferredCompanies: [],
    selectedAddOns: [],
  });

  const handleNextStep = () => setCurrentStep((prev) => prev + 1);
  const handlePreviousStep = () => setCurrentStep((prev) => prev - 1);

  const handleGetQuote = async () => {
    try {
      const payload = { ...formData, policyType: "new" };
      await createNewVehicle(payload);
      toast.success("Form submitted successfully!");
      setCurrentStep(4);
      setFormData({
        fullName: "",
        mobileNumber: "",
        emailId: "",
        pinCode: "",
        vehicleCategory: "",
        vehicleBrand: "",
        vehicleModel: "",
        fuelType: "",
        registrationYear: "",
        coverageType: "",
        preferredCompanies: [],
        selectedAddOns: [],
      });
    } catch (err) {
      console.error("Error submitting new vehicle data:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleOldVehicleSubmit = async () => {
    try {
      const formPayload = new FormData(); 
      for (const [key, value] of Object.entries(oldFormData)) {
        if (Array.isArray(value)) {
          value.forEach((item) => formPayload.append(key, item));
        } else {
          formPayload.append(key, value);
        }
      }

      await createOldVehicle(formPayload);

      toast.success("Old vehicle form submitted successfully!");
      setCurrentStep(4);
      setOldFormData({
        fullName: "",
        mobileNumber: "",
        emailId: "",
        pinCode: "",
        rcFile: null,
        policyFile: null,
        vehicleCategory: "",
        registrationNumber: "",
        registrationYear: "",
        prevPolicyExpiry: "",
        previousClaims: "",
        fuelType: "",
        coverageType: "",
        preferredCompanies: [],
        selectedAddOns: [],
      });
    } catch (err) {
      console.error("Error submitting old vehicle data:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const newFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <NewFirstForm
            formData={formData}
            setFormData={setFormData}
            onNext={handleNextStep}
            setPolicyType={setPolicyType}
            policyType={policyType}
            currentStep={currentStep}
          />
        );
      case 2:
        return (
          <NewSecondForm
            formData={formData}
            setFormData={setFormData}
            onPrevious={handlePreviousStep}
            onNext={handleNextStep}
            currentStep={currentStep}
          />
        );
      case 3:
        return (
          <NewLastForm
            formData={formData}
            setFormData={setFormData}
            onPrevious={handlePreviousStep}
            onGetQuote={handleGetQuote}
            currentStep={currentStep}
          />
        );
      case 4:
        return (
          <div className="w-full p-8 lg:p-10 text-center">
            <h3 className="text-[28px] font-semibold text-[#222] mb-4">
              Thank You!
            </h3>
            <p className="text-[16px] text-[#22272BCC]">
              Your request for a free quote has been submitted successfully.
            </p>
            <button
              onClick={() => {
                setCurrentStep(1);
                setPolicyType("new");
                setFormData({
                  fullName: "",
                  mobileNumber: "",
                  emailId: "",
                  pinCode: "",
                  vehicleCategory: "",
                  vehicleBrand: "",
                  vehicleModel: "",
                  fuelType: "",
                  registrationYear: "",
                  coverageType: "",
                  preferredCompanies: [],
                  selectedAddOns: [],
                });
              }}
              className="mt-8 bg-[#62B3F0] text-white font-semibold py-3 px-8 text-[18px] rounded-[10px] hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
            >
              Start New Request
            </button>
          </div>
        );
      default:
        return <NewFirstForm {...{ onNext: handleNextStep, setPolicyType, policyType, currentStep }} />;
    }
  };

  const oldFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <OldFirstForm
            formData={oldFormData}
            setFormData={setOldFormData}
            onNext={handleNextStep}
            setPolicyType={setPolicyType}
            policyType={policyType}
            currentStep={currentStep}
          />
        );
      case 2:
        return (
          <OldSecondForm
            formData={oldFormData}
            setFormData={setOldFormData}
            onPrevious={handlePreviousStep}
            onNext={handleNextStep}
            policyType={policyType}
            currentStep={currentStep}
          />
        );
      case 3:
        return (
          <OldLastForm
            formData={oldFormData}
            setFormData={setOldFormData}
            onPrevious={handlePreviousStep}
            onGetQuote={handleOldVehicleSubmit}
            policyType={policyType}
            currentStep={currentStep}
          />
        );
      case 4:
        return (
          <div className="w-full p-8 lg:p-10 text-center">
            <h3 className="text-[28px] font-semibold text-[#222] mb-4">
              Thank You!
            </h3>
            <p className="text-[16px] text-[#22272BCC]">
              Your request for a free quote has been submitted successfully.
            </p>
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
    <section>
      <div className="flex flex-col items-center justify-center">
        {policyType === "new" ? newFormStep() : oldFormStep()}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </section>
  );
};

export default VehicleForm;
