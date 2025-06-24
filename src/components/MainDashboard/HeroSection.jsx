import React from 'react';

const HeroSection = () => {
  const handleGetQuote = () => {
    const contactSection = document.getElementById('contact-form');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreVault = () => {
    const aboutSection = document.getElementById('about-vault');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookCall = () => {
    // Implement book a call functionality
    window.open('https://calendly.com/your-link', '_blank');
  };

  const Button = ({
    children,
    onClick,
    variant = 'primary',
    size = 'small',
    disabled = false,
    type = 'button',
    className = '',
    ...props
  }) => {
    const baseClasses =
      'font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center';

    const variants = {
      primary:
        'bg-gradient-to-r from-[#39b2ff] to-[#c465ea] text-white hover:brightness-110 focus:ring-[#c465ea] cursor-pointer',
      secondary:
        'bg-white text-[#4fb6f8] border border-white hover:bg-gray-50 cursor-pointer',
      outline:
        'border-2 border-[#3db1ff] text-transparent bg-clip-text bg-gradient-to-r from-[#3db1ff] to-[#c366eb] hover:bg-white hover:text-[#3db1ff] focus:ring-[#3db1ff] cursor-pointer',
      ghost:
        'bg-transparent text-white border-2 border-transparent hover:border-white cursor-pointer',
    };

    const sizes = {
      small: 'px-4 py-5 text-sm h-12',
      medium: 'px-6 py-3 text-base h-12',
      large: 'px-8 py-4 text-lg h-16',
    };

    const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${
      disabled ? 'cursor-not-allowed opacity-50' : ''
    } ${className}`;

    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={buttonClasses}
        {...props}
      >
        {children}
      </button>
    );
  };

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Main Hero Content */}
      <div className="relative container mx-auto px-4 sm:px-6 pt-16 md:pt-24 pb-12 md:pb-20">
        <div className=" relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Text Content */}
          <div className="text-center lg:text-left space-y-5 sm:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-[#21272b]">
              Safeguarding Smiles,<br />
              Securing Futures.
            </h1>

            <p className="text-sm md:text-base leading-relaxed text-[#22272bcc] max-w-md lg:max-w-lg mx-auto lg:mx-0">
              Your trusted partner in protecting what matters most — 
              families, futures, and everything in between 💜
            </p>

            {/* Desktop Buttons */}
            <div className="hidden sm:flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
              <Button
                onClick={handleGetQuote}
                variant="primary"
                size='small'
                className="w-[160px]"
              >
                Get a Free Quote
              </Button>

              <Button
                onClick={handleExploreVault}
                variant="outline"
                size='small'
                className="w-[160px]"
              >
                Let&apos;s Explore Vault
              </Button>
            </div>
          </div>

          {/* GIF for mobile/tablet view */}
          <div className="block lg:hidden w-full mt-6 -mx-4">
            <img
              src="/gif/Vault1.1.gif"
              alt="Vault Hero GIF"
              className="w-full h-auto max-h-[70vh] object-contain"
            />
          </div>
        </div>
        {/* Background GIF for desktop - right aligned */}
        <div className="absolute md:right-0 -top-10 z-0 hidden lg:block w-[95%] max-w-[1400px]">
          <img
            src="/gif/Vault1.1.gif"
            alt="Vault Hero GIF"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Mobile Buttons - Centered below GIF */}
        <div className="block sm:hidden mt-8">
          <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
            <Button
              onClick={handleBookCall}
              variant="primary"
              size="large"
              className="w-full"
            >
              Book A Free Call
            </Button>
          </div>
        </div>
      </div>

      {/* "Here is Vault for you" Section */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 py-12 md:mt-40 lg:mt-80">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight mb-4 flex flex-wrap items-center justify-center text-[#22272b]">
            <span>Here is</span>
            <img
              src="/images/Vault Insurance-01.png"
              alt="Vault"
              className="h-7 sm:h-8 w-auto mx-2 inline-block"
            />
            <span>for you</span>
          </h2>

          <p className="text-sm md:text-base leading-relaxed text-[#22272bcc] max-w-xl mx-auto">
            With 23 years of trusted expertise, we safeguard every corner of 
            your world—bringing you true peace of mind through hassle-free 
            offerings backed by our best-price guarantee
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;