import React, { useState } from 'react';

const Footer = () => {
  return (
    <footer className="bg-[linear-gradient(to_right,_rgba(189,218,255,1),_rgba(218,188,255,1))]  py-15 rounded-[30px] mx-3 mb-3 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4">
        <div className='mb-20'>
        <img 
              src="/images/Vault Insurance-02.png" 
              alt="Vault Insurance Logo" 
              className="h-7 w-auto"
            />
      </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Logo and Quick Links */}
          <div className="space-y-6">
            
            
            <div>
              <h3 className="text-[17px] font-bold text-[#2d313d] mb-6">Quick links</h3>
              <ul className="space-y-6 text-[15px]">
                <li><a href="/" className="text-[#2d313d] hover:text-blue-600 transition-colors">About Us</a></li>
                <li><a href="/vehicle-insurance" className="text-[#2d313d] hover:text-blue-600 transition-colors">Vehicle Insurance</a></li>
                <li><a href="/health-insurance" className="text-[#2d313d] hover:text-blue-600 transition-colors">Health Insurance</a></li>
                <li><a href="/life-insurance" className="text-[#2d313d] hover:text-blue-600 transition-colors">Life Insurance</a></li>
                <li><a href="/business-insurance" className="text-[#2d313d] hover:text-blue-600 transition-colors">Business Insurance</a></li>
                <li><a href="/not-found" className="text-[#2d313d] hover:text-blue-600 transition-colors">claims</a></li>
              </ul>
            </div>
          </div>

          {/* Careers */}
          <div>
            <h3 className="text-[17px] font-bold text-[#2d313d] mb-6">Careers</h3>
            <ul className="space-y-6 text-[15px]">
              <li><a href="/not-found" className="text-[#2d313d] hover:text-blue-600 transition-colors">Explore Careers: vaultinsurance.in@gmail.com</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-[17px] font-bold text-[#2d313d] mb-5">Vault newsletter</h3>
            <p className="text-[16px] text-[#2d313d] mb-6 leading-8">
              subscribe to our newsletter to get the 
              <br/>latest updates on everything on vault
            </p>
            
            <form action="https://formsubmit.co/vaultinsurance.in@gmail.com" method="POST" className="mb-8">
              {/* Disable CAPTCHA (optional) */}
              <input type="hidden" name="_captcha" value="false" />

              {/* Optional: Redirect to thank-you page */}
              <input type="hidden" name="_next" value="https://vault-insurance-frontend.vercel.app/thank-you" />

              <div className="max-w-[250px] flex border border-[#2d323d] rounded-lg overflow-hidden">
                <input
                  type="email"
                  name='email'
                  placeholder="enter email ID"
                  className="flex-1 px-2 py-3 text-[#2d313d] bg-transparent outline-none w-full"
                  required
                />
                <button type="submit" className="p-2 m-1 rounded-[5px] hover:bg-[#b48acf] transition-colors bg-[#13161D] cursor-pointer">
                  <img src="/images/gmail.svg" alt="Submit" className="w-3 h-3" />
                </button>
              </div>
            </form>

            <div>
              <h4 className="text-[16px] font-bold text-[#2d313d] mb-5">find us at</h4>
              <address className="text-[15px] text-[#2d313d] not-italic leading-6">
                #8, 1st main kaveri layout, doddabettahalli,<br />
                yelahanka new town, bangalore - 560097
                <br/>
                <br/>
                Email: vaultinsurance.in@gmail.com
                <br/>
                <br/>
                Phone: 9844422992, 9844422177
              </address>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-16 pt-8 border-t border-gray-300 flex flex-col md:flex-row justify-around items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <img src="/images/Copyright.svg" alt="Copyright" className="w-5 h-5" />
            <span className="text-[15px] text-[#6e778a]">2025 all rights reserved</span>
          </div>
          <a href="https://stellar8labs.com" target='_blank' className="text-[15px] text-[#6e778a]">
              <p>designed & developed by stellar8 labs</p>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;