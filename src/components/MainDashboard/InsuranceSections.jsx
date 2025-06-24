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
    window.scrollTo({ top: 0, behavior: "smooth" });
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
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const handleRedirectHealth = () => {
  navigate("/health-insurance")
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const handleRedirectVehicle= () => {
  navigate("/vehicle-insurance")
  window.scrollTo({ top: 0, behavior: "smooth" });
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
                className="flex items-center justify-center space-x-3 bg-[#FFFFFF1A] px-4 py-4 rounded-2xl hover:bg-[#FFFFFFCC] hover:te group cursor-pointer"
                onClick={handleRedirectLife}
              >
                <img src="/images/Life.svg" alt="Life" className="w-8 h-8 group-hover:brightness-125 transition" />
                <span className="text-white text-[15px] group-hover:text-[#50C0FA] transition">Life</span>
              </div>

              <div
                className="flex items-center justify-center space-x-3 bg-[#FFFFFF1A] px-4 py-4 rounded-2xl hover:bg-[#FFFFFFCC] group cursor-pointer"
                onClick={handleRedirectHealth}
              >
                <img src="/images/Health.svg" alt="Health" className="w-8 h-8 group-hover:brightness-125 transition" />
                <span className="text-white text-[15px] group-hover:text-[#50C0FA] transition">Health</span>
              </div>

              <div
                className="flex items-center justify-center space-x-3 bg-[#FFFFFF1A] px-4 py-4 rounded-2xl hover:bg-[#FFFFFFCC] group cursor-pointer"
                onClick={handleRedirectVehicle}
              >
                <img src="/images/Vehicle.svg" alt="Vehicle" className="w-8 h-8 group-hover:brightness-125 transition" />
                <span className="text-white text-[15px] group-hover:text-[#50C0FA] transition">Vehicle</span>
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