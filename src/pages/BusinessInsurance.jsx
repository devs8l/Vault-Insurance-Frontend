import React from "react";
import HeaderBusiness from "../components/BusinessInsuranceDashboard/HeaderBusiness";
import HeroBusiness from "../components/BusinessInsuranceDashboard/HeroBusiness";
import SerachBarBusiness from "../components/BusinessInsuranceDashboard/SerachBarBusiness";
import Footer from "../components/MainDashboard/Footer";
import BusinessBenefits from "../components/BusinessInsuranceDashboard/BusinessBenefits";

const BusinessInsurance = () => {
  
  return (
    <>
    <HeaderBusiness/>
    <HeroBusiness/>
    <SerachBarBusiness/>
    <BusinessBenefits />
    <section className="bg-[#F4F8FB]">
      <Footer/>
    </section>
           
    </>
    
  );
};

export default BusinessInsurance;