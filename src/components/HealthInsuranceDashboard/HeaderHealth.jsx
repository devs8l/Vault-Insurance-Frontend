import React, { useState } from "react";
import { useLocation , useNavigate } from "react-router-dom";

const HeaderHealth = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showClaimsInfo, setShowClaimsInfo] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: "home", path: "/" },
    { name: "life insurance", path: "/life-insurance" },
    { name: "health insurance", path: "/health-insurance" },
    { name: "vehicle insurance", path: "/vehicle-insurance" },
    { name: "business insurance", path: "/business-insurance" },
  ];

  const isActive = (path) => location.pathname === path;

  const handleGetQuote = () => {
    navigate("/contact")
  };

  const handleRedirect = () => {
    navigate("/")
  }


  const handleClaimsClick = () => {
    setShowClaimsInfo(!showClaimsInfo);
    setMenuOpen(false); 
  };

  return (
    <header className="w-full bg-white py-5 px-1 z-50 bg-[linear-gradient(250deg,#24BDED_0%,#47B7FF_100%)]  ">
      <div className="flex items-center w-full md:justify-around justify-between px-5">
        {/* Logo */}
        <div className="flex items-center">
          <img
            onClick={handleRedirect}
            src="/images/Vault Insurance-03.png"
            alt="Vault Insurance Logo"
            className="h-8 w-auto cursor-pointer"
          />
        </div>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden lg:flex items-center space-x-8 text-white">
          {navLinks.map(({ name, path }) => (
            <a
              key={name}
              href={path}
              className={`text-1lg font-medium transition-colors ${
                isActive(path)
                  ? "border-b-2 border-white"
                  : "hover:text-blue-200"
              } pb-1`}
            >
              {name}
            </a>
          ))}
        </nav>

        {/* Desktop Buttons - Right Side */}
        <div className="hidden md:flex items-center justify-center space-x-4">
          <button 
          onClick={handleGetQuote}
          className="w-[170px] text-sm font-medium text-white px-6 py-2 border border-white rounded-lg transition hover:bg-blue-700 whitespace-nowrap cursor-pointer">
            Get Free Quote
          </button>
          <button
            onClick={handleClaimsClick}
            className="w-[170px] text-sm font-medium text-white border border-white px-6 py-2 rounded-lg transition hover:bg-blue-700 flex items-center justify-center gap-2 cursor-pointer"
          >
            Claims
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white hover:text-gray-100 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {menuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#24BDED] bg shadow-lg rounded-lg mt-6 mx-4">
          <nav className="flex flex-col">
            {navLinks.map(({ name, path }) => (
              <a
                key={name}
                href={path}
                className={`px-4 py-4 text-lg text-white font-medium transition-colors ${
                  isActive(path)
                    ? "bg-blue-400 bg-opacity-10 border-l-4 border-blue-600"
                    : "hover:bg-blue-400 hover:bg-opacity-10"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {name}
              </a>
            ))}
            <div className="border-t border-white px-4 py-4 flex flex-col space-y-2">
              <button 
              onClick={handleGetQuote}
              className="w-full text-center text-sm font-medium text-white px-4 py-4 border border-white rounded-lg transition hover:bg-blue-700">
                Get Free Quote
              </button>
              <button
                onClick={handleClaimsClick}
                className="w-full text-center text-sm font-medium text-white border border-white px-4 py-4 rounded-lg transition hover:bg-blue-700"
              >
                Claims
              </button>
            </div>
          </nav>
        </div>
      )}

      {/* Claims Info Dropdown */}
      {showClaimsInfo && (
        <div className="absolute right-4 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg w-72 z-50 max-w-full">
          {/* Close Button */}
          <div className="flex justify-end p-2">
            <button
              onClick={() => setShowClaimsInfo(false)}
              className="text-gray-500 hover:text-gray-700 transition"
              aria-label="Close"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Info Content */}
          <div className="p-4 pt-0 space-y-4">
            {/* Call Us */}
            <div className="flex items-start space-x-3">
              <img
                src="/svg/call.svg"
                alt="Call Icon"
                className="h-5 w-5 mt-1 object-contain"
              />
              <div>
                <p className="text-sm text-gray-800 font-medium">call us</p>
                <a
                  href="tel:+919876543210"
                  className="text-sm text-blue-600 font-medium break-all hover:underline"
                >
                  +91 9876543210
                </a>
              </div>
            </div>

            {/* WhatsApp Us */}
            <div className="flex items-start space-x-3">
              <img
                src="/svg/whatsapp.svg"
                alt="WhatsApp Icon"
                className="h-5 w-5 mt-1 object-contain"
              />
              <div>
                <p className="text-sm text-gray-800 font-medium">whatsapp us</p>
                <a
                  href="https://wa.me/919876543210?text=Hi,%20I'm%20interested%20in%20learning%20more%20about%20your%20insurance%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 font-medium break-all hover:underline"
                >
                  +91 9876543210
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderHealth;