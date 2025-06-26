import React from 'react';
import {useNavigate} from "react-router-dom";

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  type = 'button',
  className = '',
  ...props 
}) => {
  const baseClasses = 'font-medium rounded-xl transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center';

  const variants = {
    primary: 'bg-gradient-to-r from-[#39b2ff] to-[#c465ea] text-white hover:opacity-90 cursor-pointer',
    secondary: 'bg-white text-[#3db1ff] hover:bg-gray-100 cursor-pointer',
    outline: 'border-2 border-solid border-white text-white hover:bg-white hover:text-[#3db1ff] cursor-pointer',
    ghost: 'bg-transparent text-white hover:bg-white/10 cursor-pointer'
  };

  const sizes = {
    small: 'px-4 py-2 text-sm h-12',
    medium: 'px-5 py-2.5 text-base',
    large: 'px-6 py-3 text-lg h-16'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const InsuranceGrid = ({ items }) => {
  return (
    <div className="w-full mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-6 mb-6">
        {items.slice(0, 4).map((item, i) => (
          <div key={i} className="flex items-center justify-center space-x-2">
            <img src={item.image} alt={item.title} className="w-10 h-10 object-contain" />
            <span className="text-white text-[15px]">{item.title}</span>
          </div>
        ))}
      </div>
    </div>

  );
};

const InsuranceSections = () => {

  const navigate = useNavigate()

  const handleExploreVault = () => {
    navigate("/business-insurance")
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const businessInsuranceItems = [
  {
    title: "Business Insurance",
    image: "/images/business-insurance.png",
  },
  {
    title: "Education Insurance",
    image: "/images/education-insurance.png",
  },
  {
    title: "Construction Insurance",
    image: "/images/construction-insurance.png",
  },
  {
    title: "Hotel Insurance",
    image: "/images/hotel-insurance.png",
  },
];

const handleRedirectLife = () => {
  navigate("/life-insurance")
  window.scrollTo({ top: 0, behavior: "auto" });
}

const handleRedirectHealth = () => {
  navigate("/health-insurance")
  window.scrollTo({ top: 0, behavior: "auto" });
}

const handleRedirectVehicle= () => {
  navigate("/vehicle-insurance")
  window.scrollTo({ top: 0, behavior: "auto" });
}

  return (
    <>
      {/* Individual / Retail Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#24bcede5] to-[#46b7ffe5] rounded-[30px] mx-5 my-0 overflow-hidden hidden md:block">
        {/* Right-side image */}
        <div className="absolute right-0 top-0 h-full w-2/3 hidden md:block">
          <img 
            src="/images/Clip path-1.png" 
            alt="Individual Insurance" 
            className="h-full w-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6 capitalize">
              For You
            </h2>
            <p className="text-[15px] md:text-[14px] text-white mb-25">
              Protect the ones you love—our health plans stand by you in sickness, our savings plans build 
              <br/>your family's tomorrow, and our car plans fix your ride if it breaks—all at prices you'll love.
            </p>

            {/* Icons Section */}
            <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center sm:space-x-8 space-y-6 sm:space-y-0 mb-0">
              <div
                className="group flex items-center justify-center space-x-3 bg-[#FFFFFF1A] px-6 py-4 rounded-2xl hover:bg-[#FFFFFFCC] cursor-pointer transition"
                onClick={handleRedirectLife}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                  className="w-8 h-8 fill-white group-hover:fill-[#50C0FA] transition duration-300"
                >
                  <path
                    opacity="0.9"
                    d="M44.6025 39.1475L45.0425 39.59L45.4863 39.1475C47.683 36.9508 51.2445 36.9508 53.4413 39.1475C55.638 41.3442 55.638 44.9058 53.4413 47.1025L45.0445 55.4992L36.6475 47.1025C34.4508 44.9058 34.4508 41.3442 36.6475 39.1475C38.8443 36.9508 42.4058 36.9508 44.6025 39.1475ZM30 35V40C21.7157 40 15 46.7158 15 55H10C10 44.1628 18.6196 35.3388 29.377 35.0095L30 35ZM30 2.5C38.2875 2.5 45 9.2125 45 17.5C45 25.5993 38.5893 32.194 30.5625 32.4897L30 32.5C21.7125 32.5 15 25.7875 15 17.5C15 9.40085 21.4109 2.80593 29.4375 2.51035L30 2.5ZM30 7.5C24.4739 7.5 20 11.9739 20 17.5C20 23.0261 24.4739 27.5 30 27.5C35.526 27.5 40 23.0261 40 17.5C40 11.9739 35.526 7.5 30 7.5Z"
                  />
                </svg>
                <span className="text-white text-[15px] group-hover:text-[#50C0FA] transition duration-300">
                  Life
                </span>
              </div>
              <div
                className="group flex items-center justify-center space-x-3 bg-[#FFFFFF1A] px-6 py-4 rounded-2xl hover:bg-[#FFFFFFCC] cursor-pointer transition"
                onClick={handleRedirectHealth}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                  className="w-8 h-8 fill-white group-hover:fill-[#50C0FA] transition duration-300"
                >
                  <path
                    opacity="0.9"
                    d="M20 50V35H40V50H47.5V10H12.5V50H20ZM25 50H35V40H25V50ZM52.5 50H57.5V55H2.5V50H7.5V7.5C7.5 6.1193 8.6193 5 10 5H50C51.3807 5 52.5 6.1193 52.5 7.5V50ZM27.5 20V15H32.5V20H37.5V25H32.5V30H27.5V25H22.5V20H27.5Z"
                  />
                </svg>
                <span className="text-white text-[15px] group-hover:text-[#50C0FA] transition duration-300">
                  Health
                </span>
              </div>
              <div
                className="group flex items-center justify-center space-x-3 bg-[#FFFFFF1A] px-6 py-4 rounded-2xl hover:bg-[#FFFFFFCC] cursor-pointer transition"
                onClick={handleRedirectVehicle}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                  className="w-8 h-8 fill-white group-hover:fill-[#50C0FA] transition duration-300"
                >
                  <path
                    opacity="0.9"
                    d="M47.5 50H12.5V52.5C12.5 53.8807 11.3807 55 10 55H7.5C6.1193 55 5 53.8807 5 52.5V27.5L11.2013 13.0304C11.9892 11.192 13.7969 10 15.797 10H44.203C46.2033 10 48.0108 11.192 48.7988 13.0304L55 27.5V52.5C55 53.8807 53.8808 55 52.5 55H50C48.6193 55 47.5 53.8807 47.5 52.5V50ZM50 32.5H10V45H50V32.5ZM10.4399 27.5H49.5603L44.203 15H15.797L10.4399 27.5ZM16.25 42.5C14.1789 42.5 12.5 40.821 12.5 38.75C12.5 36.679 14.1789 35 16.25 35C18.3211 35 20 36.679 20 38.75C20 40.821 18.3211 42.5 16.25 42.5ZM43.75 42.5C41.679 42.5 40 40.821 40 38.75C40 36.679 41.679 35 43.75 35C45.821 35 47.5 36.679 47.5 38.75C47.5 40.821 45.821 42.5 43.75 42.5Z"
                  />
                </svg>
                <span className="text-white text-[15px] group-hover:text-[#50C0FA] transition duration-300">
                  Vehicle
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#9d6fffe5] to-[#618fffe5] rounded-[30px] mx-5 mt-5 mb-3 overflow-hidden hidden md:block">
        {/* Right-side image */}
        <div className="absolute right-0 top-0 h-full w-2/3 hidden md:block">
          <img 
            src="/images/Clip path-2.png" 
            alt="Business Insurance" 
            className="h-full w-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6 capitalize">
              For Business
            </h2>
            <p className="text-[15px] md:text-[14px] text-white/80 mb-20">
              When disaster strikes your school, construction site, hotel, or factory, we 
              <br/>secure top-rate coverage and fight your claims—keeping your dreams alive.
            </p>

            {/* Insurance Grid Component */}
            <div className="flex justify-center mb-20">
              <div className="w-full">
                <InsuranceGrid items={businessInsuranceItems} />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                variant="secondary"
                size="small"
                className="w-[180px] font-semibold text-[#6793FF]"
                onClick={handleExploreVault}
              >
                Know more
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InsuranceSections;