import React from 'react';

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
    outline: 'border-2 border-white text-white hover:bg-white hover:text-[#3db1ff] cursor-pointer',
    ghost: 'bg-transparent text-white hover:bg-white/10 cursor-pointer',
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


const CoreValuesSection = () => {

  const handleGetQuote = () => {
    const contactSection = document.getElementById('contact-form');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const coreValues = [
    {
      title: "Value",
      description: "We ensure you receive the right coverage at the right price — without compromise.",
      bgColor: "bg-[#35C1E7]",
      shadowColor: "shadow-[0px_4px_60px_5px_rgba(78,212,247,0.40)]"
    },
    {
      title: "Accountability",
      description: "You can count on us. We keep our word and stay by your side when you need us the most.",
      bgColor: "bg-[#45A8ED]",
      shadowColor: "shadow-[0px_4px_60px_5px_rgba(85,176,238,0.40)]"
    },
    {
      title: "Understanding",
      description: "We take the time to listen and suggest what's truly right for you – no pressure, no jargon.",
      bgColor: "bg-[#4E7CEB]",
      shadowColor: "shadow-[0px_4px_60px_5px_rgba(95,136,237,0.40)]"
    },
    {
      title: "Loyalty",
      description: "We're not just here for today – we're here for every chapter of your journey.",
      bgColor: "bg-[#755AED]",
      shadowColor: "shadow-[0px_4px_60px_5px_rgba(129,104,238,0.40)]"
    },
    {
      title: "Trust",
      description: "We earn your trust through honest conversations, clear guidance, and genuine care for your needs.",
      bgColor: "bg-[#9E45E8]",
      shadowColor: "shadow-[0px_4px_60px_5px_rgba(166,84,234,0.40)]"
    }
  ];

  return (
    <section className="py-16 md:py-24 rounded-[30px] lg:py-32 bg-[#f8f8f8]  mx-4 md:mx-5 my-3 relative overflow-hidden">
      {/* Background decorative circles */}
      <div className="absolute top-[-150px] left-[-150px] w-[300px] h-[300px] bg-[#3fd0f6] rounded-full opacity-10 z-0"></div>
      <div className="absolute bottom-[-150px] right-[-150px] w-[300px] h-[300px] bg-[#9d46e8] rounded-full opacity-10 z-0"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#22272B] mb-4 md:mb-6">Our Core Values</h2>
        <p className="text-[14px] md:text-[15px] text-[#22272bcc] mb-12 md:mb-16 max-w-3xl mx-auto leading-relaxed">
          At Vault Insurance, we protect more than what you own — we protect 
          what you love, what you’ve built, and all you hope to become.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 mb-12 md:mb-16 md:h-[286px]">
          {coreValues.map((value, index) => (
            <div 
              key={index}
              className={`${value.bgColor} ${value.shadowColor} rounded-[30px] p-6 md:p-8 text-center transition-transform duration-300 hover:scale-105`}
            >
              <h2 className="text-[20px] md:text-[24px] font-semibold text-white mb-4 md:mb-6 capitalize">
                {value.title}
              </h2>
              <p className="text-white text-[14px] md:text-[15px] leading-relaxed md:leading-loose">
                {value.description}
              </p>
            </div>
          ))}
        </div>
        <div  className='hidden md:block'>
          <Button 
          onClick={handleGetQuote} 
          variant='primary'
          size="small" 
          className="w-[180px] hover:brightness-110"
        >
          Get a Free Quote
        </Button>
        </div>
        <div  className='md:hidden'>
          <Button 
          onClick={handleGetQuote} 
          variant='desk'
          size="large" 
          className="w-full hover:brightness-110"
        >
          Book A Free Call
        </Button>
        </div>
        
      </div>
    </section>
  );
};

export default CoreValuesSection;