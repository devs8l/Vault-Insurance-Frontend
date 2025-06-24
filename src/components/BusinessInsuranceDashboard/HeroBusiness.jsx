import React, { useState } from "react";
import { submitBusinessQuote } from '../../api/businessApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const HeroBusiness = () => {

    const [name, setName] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [mobile, setMobileNumber] = useState("");
    const [product, setProduct] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
        name,
        business_name: businessName,
        mobile_number: mobile,
        product_type: product,
        email
    };

    try {
        const response = await submitBusinessQuote(data);
        console.log('Response:', response);
        toast.success('🎉 Business Quote submitted successfully! Our team will contact you shortly.', {
        className: 'bg-green-50 text-green-800 rounded-md shadow-md border border-green-200 px-4 py-2 font-medium',
        icon: '✅'
        });
        setTimeout(() => window.location.reload(), 3000);
    } catch (err) {
        console.error('Quote submission failed:', err);
        toast.error('❌ Oops! Submission failed. Please try again.', {
        className: 'bg-red-50 text-red-800 rounded-md shadow-md border border-red-200 px-4 py-2 font-medium',
        icon: '⚠️'
        });
    }
    };

    return (
        <>
        {/*Hero Section Start*/}

        <section className="w-full bg-[linear-gradient(to_bottom,_rgba(157,111,255,0.9),_rgba(98,144,255,0.9))] py-10 px-4 sm:px-6 md:px-12 lg:px-24">

  {/* Flex Container */}
  <div className="flex flex-col-reverse lg:flex-row items-center justify-between relative max-w-[1440px] mx-auto">

    {/* Form */}
    <form 
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl shadow-lg w-full max-w-[700px] p-6 sm:p-8 lg:p-10 z-10"
    >
      <h2 className="text-black font-semibold text-3xl sm:text-4xl leading-tight mb-3">
        Business Insurance
      </h2>
      <p className="text-gray-600 text-base sm:text-lg mb-8">
        Enter details and get a quote for your business
      </p>

      {/* Input Fields Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 max-w-[400px]">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full h-[60px] p-4 rounded-lg shadow-[10px_10px_40px_0px_rgba(26,129,255,0.10)] focus:outline-none focus:ring-2 focus:ring-purple-400 text-base text-gray-700 placeholder-gray-400 cursor-pointer"
          required
        />
        <input
          type="text"
          placeholder="Business Name"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          className="w-full h-[60px] p-4 rounded-lg shadow-[10px_10px_40px_0px_rgba(26,129,255,0.10)] focus:outline-none focus:ring-2 focus:ring-purple-400 text-base text-gray-700 placeholder-gray-400 cursor-pointer"
          required
        />
        <input
          type="tel"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobileNumber(e.target.value)}
          className="w-full h-[60px] p-4 rounded-lg shadow-[10px_10px_40px_0px_rgba(26,129,255,0.10)] focus:outline-none focus:ring-2 focus:ring-purple-400 text-base text-gray-700 placeholder-gray-400 cursor-pointer"
          required
        />
        <div className="relative w-full h-[60px]">
          <select
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="appearance-none w-full h-full p-4 rounded-lg shadow-[10px_10px_40px_0px_rgba(26,129,255,0.10)] focus:outline-none focus:ring-2 focus:ring-purple-400 text-base text-gray-700 pr-10 cursor-pointer"
            required
          >
            <option value="">Product Type</option>
            <option value="retail">Retail Business</option>
            <option value="service">Service Business</option>
            <option value="manufacturing">Manufacturing Business</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
            <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email ID"
          className="sm:col-span-2 w-full h-[60px] p-4 rounded-lg shadow-[10px_10px_40px_0px_rgba(26,129,255,0.10)] focus:outline-none focus:ring-2 focus:ring-purple-400 text-base text-gray-700 placeholder-gray-400 cursor-pointer"
          required
        />
      </div>

      {/* Submit Button */}
      <div className="mb-10 flex justify-center sm:justify-start">
        <button
          type="submit"
          className="w-full sm:w-[65%] py-4 sm:py-6 bg-[#8B6BE7] text-white rounded-xl text-lg font-semibold shadow-md hover:bg-purple-700 transition cursor-pointer"
        >
          Get a Free Quote
        </button>
      </div>
    </form>

    {/* Desktop Image */}
    <div className="hidden lg:block absolute top-[10%] right-[10%] z-10 max-w-[55%]">
      <img
        src="/images/Business home.png"
        alt="Shop Illustration"
        className="object-contain w-full h-auto max-h-[550px]"
      />
    </div>
    {/* Mobile Image */}
    <div className="lg:hidden w-full mt-6 flex justify-center z-0 mb-5">
      <img
        src="/images/Business home.png"
        alt="Shop Illustration"
        className="object-contain w-full max-w-md h-auto"
      />
    </div>
  </div>
</section>

      {/*Hero Section End*/}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </>
    )
}

export default HeroBusiness;