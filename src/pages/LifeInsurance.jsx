import React from "react";
import Footer from "../components/MainDashboard/Footer";
import HeaderLife from "../components/LifeInsuranceDashboard/HeaderLife";
import HeroLife from "../components/LifeInsuranceDashboard/HeroLife";
import TypeLife from "../components/LifeInsuranceDashboard/TypeLife";
import BenefitLife from "../components/LifeInsuranceDashboard/BenefitsLife";
import LifePartners from "../components/LifeInsuranceDashboard/LifePartners";

const LifeInsurance = () => {

  return (
    <>
      <HeaderLife/>
      <HeroLife/>
      <TypeLife/>
      <LifePartners/>
      <BenefitLife/>
      <Footer/>
    </>
    
  );
};

export default LifeInsurance;