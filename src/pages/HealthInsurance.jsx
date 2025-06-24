import React  from "react";
import HeaderHealth from "../components/HealthInsuranceDashboard/HeaderHealth";
import HeroHealth from "../components/HealthInsuranceDashboard/HeroHealth";
import TypeHealth from "../components/HealthInsuranceDashboard/TypeHealth";
import PolicyCoverHealth from "../components/HealthInsuranceDashboard/PolicyCoverHealth";
import HealthPoints from "../components/HealthInsuranceDashboard/HealthPoints";
import HealthBenefits from "../components/HealthInsuranceDashboard/HealthBenefits";
import Footer from "../components/MainDashboard/Footer";

const HealthInsurance = () => {
  
  return (
    <>
    <HeaderHealth/>
    <HeroHealth/>
    <TypeHealth/>
    <PolicyCoverHealth/>
    <HealthPoints/>
    <HealthBenefits/>
    <Footer />
    </>
  );
};

export default HealthInsurance;
