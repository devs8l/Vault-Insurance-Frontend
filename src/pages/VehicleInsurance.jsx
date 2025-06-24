import React from "react";
import HeaderVehicle from "../components/VehicleInsuranceDashboard/HeaderVehicle";
import HeroVehicle from "../components/VehicleInsuranceDashboard/HeroVehicle";
import TypeVehicle from "../components/VehicleInsuranceDashboard/TypeVehicle";
import VechiclePolicyCover from "../components/VehicleInsuranceDashboard/VechiclePolicyCover";
import VehiclePoints from "../components/VehicleInsuranceDashboard/VehiclePoints";
import VehicleBenefits from "../components/VehicleInsuranceDashboard/VehicleBenefits";
import Footer from "../components/MainDashboard/Footer";
import VehicleEnhance from "../components/VehicleInsuranceDashboard/VehicleEnhance";
import VehicleBeforeBuy from "../components/VehicleInsuranceDashboard/VehicleBeforeBuy";


const VehicleInsurance = () => {

  return (
    <>
    <HeaderVehicle/>
    <HeroVehicle/>
    <TypeVehicle/>
    <VechiclePolicyCover/>
    <VehicleEnhance />
    <VehicleBeforeBuy />
    <VehiclePoints/>
    <VehicleBenefits/>
    <Footer/>    
    </>
    
  );
};

export default VehicleInsurance;