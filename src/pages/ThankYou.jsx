import React from 'react';

const ThankYou = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0E1117] px-4">
      <div className="bg-[#1A1F2B] p-8 rounded-2xl shadow-lg max-w-md w-full text-center text-white">
        <h1 className="text-3xl font-bold mb-4 text-[#B741FF]">Thank You! 🎉</h1>
        <p className="text-lg mb-6">
          You've successfully subscribed to our newsletter.  
          We'll keep you updated with exciting news & offers!
        </p>
        <a
          href="/"
          className="inline-block mt-4 px-6 py-3 bg-[#B741FF] rounded-lg hover:bg-[#9e35e3] transition-colors"
        >
          Go Back to Home
        </a>
      </div>
    </div>
  );
};

export default ThankYou;
