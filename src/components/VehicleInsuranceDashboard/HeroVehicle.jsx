import React, { useState } from "react";
import VehicleInsuranceForm from "./NewVehicleForm/VehicleInsuranceForm";
import VehicleInformationForm from "./NewVehicleForm/VehicleInformationForm";
import AddOnCoversForm from "./NewVehicleForm/AddOnCoversForm";
import OldVehicleForm from "./OldVehicleInsauranceForm/OldVehicleForm";
import OldInformationForm from "./OldVehicleInsauranceForm/OldInformationForm";
import OldAddCover from "./OldVehicleInsauranceForm/OldAddCover";
import { createNewVehicle, createOldVehicle } from "../../api/VehicleApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HeroVehicle = () => {
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

  const handleNextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const handlePreviousStep = () => setCurrentStep((prevStep) => prevStep - 1);

  const handleGetQuote = async () => {
    try {
      if (policyType === "new") {
        await createNewVehicle({ ...formData, policyType: "new" });
      } else {
        const formPayload = new FormData();
        for (const [key, value] of Object.entries(oldFormData)) {
          if (Array.isArray(value)) {
            value.forEach((item) => formPayload.append(key, item));
          } else {
            formPayload.append(key, value);
          }
        }
        await createOldVehicle(formPayload);
      }

      toast.success("Quote submitted successfully!");
      setCurrentStep(4); // move to thank you step

      // Reset
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
      console.error("Error submitting data:", err);
      toast.error("Something went wrong. Try again.");
    }
  };

  const newFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <VehicleInsuranceForm
            onNext={handleNextStep}
            setPolicyType={setPolicyType}
            policyType={policyType}
            currentStep={currentStep}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 2:
        return (
          <VehicleInformationForm
            onPrevious={handlePreviousStep}
            onNext={handleNextStep}
            currentStep={currentStep}
            policyType={policyType}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 3:
        return (
          <AddOnCoversForm
            onPrevious={handlePreviousStep}
            onGetQuote={handleGetQuote}
            currentStep={currentStep}
            policyType={policyType}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 4:
        return renderThankYou();
      default:
        return <VehicleInsuranceForm onNext={handleNextStep} />;
    }
  };

  const oldFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <OldVehicleForm
            onNext={handleNextStep}
            setPolicyType={setPolicyType}
            policyType={policyType}
            currentStep={currentStep}
            formData={oldFormData}
            setFormData={setOldFormData}
          />
        );
      case 2:
        return (
          <OldInformationForm
            onPrevious={handlePreviousStep}
            onNext={handleNextStep}
            currentStep={currentStep}
            policyType={policyType}
            formData={oldFormData}
            setFormData={setOldFormData}
          />
        );
      case 3:
        return (
          <OldAddCover
            onPrevious={handlePreviousStep}
            onGetQuote={handleGetQuote}
            currentStep={currentStep}
            policyType={policyType}
            formData={oldFormData}
            setFormData={setOldFormData}
          />
        );
      case 4:
        return renderThankYou();
      default:
        return <OldVehicleForm onNext={handleNextStep} />;
    }
  };

  const renderThankYou = () => (
    <div className="bg-white rounded-3xl shadow-lg w-full p-8 lg:p-10 relative text-center">
      <h3 className="text-[28px] font-semibold text-[#222] mb-4">Thank You!</h3>
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

  return (
    <>
      <section className="relative w-full py-12 px-4 md:px-12 lg:px-24 bg-[linear-gradient(250deg,#24BDED_0%,#47B7FF_100%)]">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between relative 2xl:ml-[20%]">
          {policyType === "new" ? newFormStep() : oldFormStep()}

          <div className="w-full relative h-auto mb-3 mx-0 z-20 lg:top-[50px] lg:right-10 2xl:top-[20px]">
            <img
              src="/images/Vehicle Insurance.png"
              alt="vehicle-insurance"
              className="object-contain w-full lg:w-[600px] lg:h-[550px] 2xl:w-[700px] 2xl:h-[600px]"
            />
          </div>
        </div>
      </section>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export default HeroVehicle;
