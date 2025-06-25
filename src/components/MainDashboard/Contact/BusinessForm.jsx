import React, { useState } from "react";
import { submitBusinessQuote } from '../../../api/businessApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BusinessForm = () => {
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
            toast.success('🎉 Business Quote submitted successfully!', {
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
        <div className="mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-xl font-semibold text-[#22272b]">Business Insurance</h2>
                <p className="text-sm text-gray-600">Enter details and get a quote for your business</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full h-14 px-4 bg-white border border-[#d9dde1] rounded-[16px] text-base focus:outline-none focus:border-blue-300 cursor-pointer"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Business Name"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="w-full h-14 px-4 bg-white border border-[#d9dde1] rounded-[16px] text-base focus:outline-none focus:border-blue-300 cursor-pointer"
                        required
                    />
                    <input
                        type="tel"
                        placeholder="Mobile Number"
                        value={mobile}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        className="w-full h-14 px-4 bg-white border border-[#d9dde1] rounded-[16px] text-base focus:outline-none focus:border-blue-300 cursor-pointer"
                        required
                    />
                    <select
                        value={product}
                        onChange={(e) => setProduct(e.target.value)}
                        className="w-full h-14 px-4 bg-white border border-[#d9dde1] rounded-[16px] text-base focus:outline-none focus:border-blue-300 cursor-pointer"
                        required
                    >
                        <option value="">Product Type</option>
                        <option value="retail">Retail Business</option>
                        <option value="service">Service Business</option>
                        <option value="manufacturing">Manufacturing Business</option>
                    </select>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email ID"
                        className="w-full h-14 px-4 bg-white border border-[#d9dde1] rounded-[16px] text-base focus:outline-none focus:border-blue-300 cursor-pointer"
                        required
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="w-[180px] h-14 bg-gradient-to-r from-[#39b2ff] to-[#c465ea] text-white rounded-[16px] font-semibold text-lg hover:brightness-110 transition cursor-pointer"
                    >
                        Get a Free Quote
                    </button>
                    </div>
            </form>

            <ToastContainer 
                position="top-center" 
                autoClose={3000} 
                hideProgressBar={false} 
                newestOnTop={false} 
                closeOnClick 
                rtl={false} 
                pauseOnFocusLoss 
                draggable 
                pauseOnHover 
            />
        </div>
    );
}

export default BusinessForm;