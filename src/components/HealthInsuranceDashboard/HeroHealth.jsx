import React, { useState, useRef, useEffect } from "react";
import { submitHealthInsuranceLead } from '../../api/healthApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const insuranceCompanies = [
  "Aditya Birla Health",
  "Bajaj Allianz General",
  "Care Health",
  "HDFC ERGO General",
  "ICICI Lombard General",
  "Star Health",
  "Tata AIG",
  "Others"
];


const HeroHealth = () => {
    // Form state
    const [policyType, setPolicyType] = useState("new");
    const [formData, setFormData] = useState({
        adults: 1,
        children: 0,
        hasDisease: "",
        existingDisease: "",
        insurer: "",
        claimStatus: "",
        tenure: "",
        eldestAge: "",
        pincode: "",
        name: "",
        email: "",
        phone: "",
        currentInsurer: "",
        preferredInsurer: ""
    });
    const [policyFile, setPolicyFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    
    // Search dropdown state
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef();

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredCompanies = insuranceCompanies.filter(company =>
        company.toLowerCase().includes(search.toLowerCase())
    );

    const handleSelect = (company) => {
        setFormData({...formData, insurer: company});
        setIsOpen(false);
        setSearch("");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
        
        // Clear error when field is changed
        if (errors[name]) {
            setErrors({...errors, [name]: null});
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 5 * 1024 * 1024) { // 5MB limit
            toast.error("File size should be less than 5MB");
            return;
        }
        setPolicyFile(file);
    };

    const validateForm = () => {
        const newErrors = {};
        const requiredFields = policyType === "new" ? 
            ['name', 'email', 'phone', 'insurer', 'pincode'] : 
            ['name', 'phone', 'currentInsurer', 'preferredInsurer'];
        
        requiredFields.forEach(field => {
            if (!formData[field]) {
                newErrors[field] = "This field is required";
            }
        });

        // Email validation
        if (policyType === "new" && formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }

        // Phone validation
        if (formData.phone && !/^[0-9]{10}$/.test(formData.phone)) {
            newErrors.phone = "Please enter a valid 10-digit phone number";
        }

        // Pincode validation
        if (formData.pincode && !/^[0-9]{6}$/.test(formData.pincode)) {
            newErrors.pincode = "Please enter a valid 6-digit pincode";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

  const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Validate form first
        if (!validateForm()) {
            setIsSubmitting(false);
            toast.error("Please fix the errors in the form");
            return;
        }

        try {
            const formDataObj = new FormData();
            
            // Add common fields
            formDataObj.append('name', formData.name);
            formDataObj.append('phone', formData.phone);
            formDataObj.append('policy_type', policyType);

            // Add fields based on policy type
            if (policyType === "new") {
                formDataObj.append('adults', formData.adults);
                formDataObj.append('children', formData.children);
                formDataObj.append('insurer', formData.insurer);
                formDataObj.append('tenure', formData.tenure);
                formDataObj.append('pincode', formData.pincode);
                formDataObj.append('email', formData.email);
                
                if (formData.claimStatus) {
                    formDataObj.append('claim_status', formData.claimStatus);
                }
                if (formData.eldestAge) {
                    formDataObj.append('eldest_age', formData.eldestAge);
                }
                if (formData.hasDisease === "yes" && formData.existingDisease) {
                    formDataObj.append('existing_disease', formData.existingDisease);
                }
            } else {
                formDataObj.append('current_insurer', formData.currentInsurer);
                formDataObj.append('preferred_insurer', formData.preferredInsurer);
                
                if (policyFile) {
                    formDataObj.append('policy_file', policyFile);
                }
            }

            // Debug: Log what's being sent
            console.log('Submitting form data:');
            for (let [key, value] of formDataObj.entries()) {
                console.log(key, value);
            }

            const response = await submitHealthInsuranceLead(formDataObj, true);
            
            if (!response.success) {
                throw new Error(response.error || 'Submission failed');
            }
            
            toast.success(
                `🎉 Your ${policyType === "new" ? "quote" : "renewal request"} submitted successfully!`,
                { className: 'bg-green-50 text-green-800 rounded-md shadow-md border border-green-200 px-4 py-2 font-medium' }
            );
            
            // Reset form after successful submission
            setFormData({
                adults: 1,
                children: 0,
                hasDisease: "",
                existingDisease: "",
                insurer: "",
                claimStatus: "",
                tenure: "",
                eldestAge: "",
                pincode: "",
                name: "",
                email: "",
                phone: "",
                currentInsurer: "",
                preferredInsurer: ""
            });
            setPolicyFile(null);
            
        } catch (err) {
            console.error('Submission failed:', err);
            let errorMessage = err.response?.data?.error || 
                            err.message || 
                            `❌ ${policyType === "new" ? "Quote" : "Renewal"} submission failed. Please try again.`;
            
            toast.error(errorMessage, {
                className: 'bg-red-50 text-red-800 rounded-md shadow-md border border-red-200 px-4 py-2 font-medium'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderNewPolicyForm = () => (
        <>
            <div className="flex gap-6 mb-6">
                <label className="flex items-center space-x-2">
                    <input
                        type="radio"
                        name="policyType"
                        value="new"
                        checked={policyType === "new"}
                        onChange={() => setPolicyType("new")}
                        className="accent-blue-500 cursor-pointer"
                    />
                    <span className="text-[#22272B] text-[12px] font-medium cursor-pointer">New Policy</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input
                        type="radio"
                        name="policyType"
                        value="renew"
                        checked={policyType === "renew"}
                        onChange={() => setPolicyType("renew")}
                        className="accent-blue-500 cursor-pointer"
                    />
                    <span className="text-[#22272B] text-[12px] font-medium cursor-pointer">Renew Your Policy</span>
                </label>
            </div>

            <div className="md:flex md:items-center gap-3 sm:gap-4 mb-4">
                {/* Adult Counter */}
                <div className="flex justify-between items-center md:w-[200px] md:h-[60px] bg-white shadow-[10px_10px_40px_0px_rgba(26,129,255,0.10)] px-3 py-1 md:mb-0 mb-4 gap-2">
                    <img src="/svg/adult.svg" className="w-[24x] h-[24px]" alt="Adult Icon" />
                    <span className="text-[13px] text-[#22272BCC] font-semibold">Adult</span>
                    <div className="flex">
                        <button
                            type="button"
                            className="text-lg font-bold flex items-center justify-center w-6 h-6 bg-[#EEE] cursor-pointer"
                            onClick={() => setFormData({...formData, adults: Math.max(0, formData.adults - 1)})}
                        >
                            <svg width="13" height="2" viewBox="0 0 13 2" fill="none" className="w-3 h-3">
                                <path d="M11.5898 0H0.589844C0.308594 0 0.0898438 0.25 0.0898438 0.5V1.5C0.0898438 1.78125 0.308594 2 0.589844 2H11.5898C11.8398 2 12.0898 1.78125 12.0898 1.5V0.5C12.0898 0.25 11.8398 0 11.5898 0Z" fill="#22272B" fillOpacity="0.6" />
                            </svg>
                        </button>
                        <span className="mx-2 text-[15px] text-[#22272BCC] font-semibold">{formData.adults}</span>
                        <button
                            type="button"
                            className="text-lg font-bold flex items-center justify-center w-6 h-6 bg-[#EEE] cursor-pointer"
                            onClick={() => setFormData({...formData, adults: formData.adults + 1})}
                        >
                            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" className="w-3 h-3">
                                <path d="M11.5898 5H7.08984V0.5C7.08984 0.25 6.83984 0 6.58984 0H5.58984C5.30859 0 5.08984 0.25 5.08984 0.5V5H0.589844C0.308594 5 0.0898438 5.25 0.0898438 5.5V6.5C0.0898438 6.78125 0.308594 7 0.589844 7H5.08984V11.5C5.08984 11.7812 5.30859 12 5.58984 12H6.58984C6.83984 12 7.08984 11.7812 7.08984 11.5V7H11.5898C11.8398 7 12.0898 6.78125 12.0898 6.5V5.5C12.0898 5.25 11.8398 5 11.5898 5Z" fill="#22272B" fillOpacity="0.6" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Children Counter */}
                <div className="flex justify-between bg-white shadow-[10px_10px_40px_0px_rgba(26,129,255,0.10)] items-center md:w-[200px] md:h-[60px] px-3 py-1 gap-2">
                    <img src="/svg/child.svg" className="w-[24x] h-[24px]" alt="Child Icon" />
                    <span className="text-[13px] text-[#22272BCC] font-semibold">Child</span>
                    <div className="flex">
                        <button
                            type="button"
                            className="text-lg font-bold flex items-center justify-center w-6 h-6 bg-[#EEE] cursor-pointer"
                            onClick={() => setFormData({...formData, children: Math.max(0, formData.children - 1)})}
                        >
                            <svg width="13" height="2" viewBox="0 0 13 2" fill="none" className="w-3 h-3">
                                <path d="M11.5898 0H0.589844C0.308594 0 0.0898438 0.25 0.0898438 0.5V1.5C0.0898438 1.78125 0.308594 2 0.589844 2H11.5898C11.8398 2 12.0898 1.78125 12.0898 1.5V0.5C12.0898 0.25 11.8398 0 11.5898 0Z" fill="#22272B" fillOpacity="0.6" />
                            </svg>
                        </button>
                        <span className="mx-2 text-[15px] text-[#22272BCC] font-semibold">{formData.children}</span>
                        <button
                            type="button"
                            className="text-lg font-bold flex items-center justify-center w-6 h-6 bg-[#EEE] cursor-pointer"
                            onClick={() => setFormData({...formData, children: formData.children + 1})}
                        >
                            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" className="w-3 h-3">
                                <path d="M11.5898 5H7.08984V0.5C7.08984 0.25 6.83984 0 6.58984 0H5.58984C5.30859 0 5.08984 0.25 5.08984 0.5V5H0.589844C0.308594 5 0.0898438 5.25 0.0898438 5.5V6.5C0.0898438 6.78125 0.308594 7 0.589844 7H5.08984V11.5C5.08984 11.7812 5.30859 12 5.58984 12H6.58984C6.83984 12 7.08984 11.7812 7.08984 11.5V7H11.5898C11.8398 7 12.0898 6.78125 12.0898 6.5V5.5C12.0898 5.25 11.8398 5 11.5898 5Z" fill="#22272B" fillOpacity="0.6" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Select Fields */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4">
                {/* Insurer Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <div
                        className={`w-full bg-white shadow-[10px_10px_40px_rgba(26,129,255,0.10)] p-3 text-[13px] font-semibold text-[#22272BCC] border-2 ${errors.insurer ? 'border-red-500' : 'border-white hover:border-blue-400'} cursor-pointer`}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {formData.insurer || "Preferred Insurer"}
                    </div>
                    {errors.insurer && <p className="text-red-500 text-xs mt-1">{errors.insurer}</p>}

                    {isOpen && (
                        <div className="absolute z-10 w-full bg-white border rounded mt-1 max-h-60 overflow-y-auto shadow-lg">
                            <input
                                type="text"
                                className="w-full p-2 border-b outline-none text-sm"
                                placeholder="Search Insurer..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                autoFocus
                            />
                            {filteredCompanies.length > 0 ? (
                                filteredCompanies.map((company, index) => (
                                    <div
                                        key={index}
                                        className="p-2 hover:bg-blue-100 cursor-pointer text-sm"
                                        onClick={() => handleSelect(company)}
                                    >
                                        {company}
                                    </div>
                                ))
                            ) : (
                                <div className="p-2 text-gray-500 text-sm">No results found.</div>
                            )}
                        </div>
                    )}
                </div>

                {/* Claim Status */}
                <div className="relative">
                    <select
                        name="claimStatus"
                        className="w-full bg-white shadow-[10px_10px_40px_0px_rgba(26,129,255,0.10)] p-2 sm:p-3 text-[13px] font-semibold text-[#22272BCC] appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                        value={formData.claimStatus}
                        onChange={handleChange}
                    >
                        <option value="">Any Previous Claims?</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                    <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer" width="25" height="25" viewBox="0 0 25 25" fill="none">
                        <path d="M12.2188 16.2999L6.21875 10.2999L7.61875 8.8999L12.2188 13.4999L16.8188 8.8999L18.2188 10.2999L12.2188 16.2999Z" fill="#4E5B60" />
                    </svg>
                </div>

                {/* Eldest Age */}
                <input
                    type="number" 
                    name="eldestAge"
                    placeholder="Eldest Member Age"
                    className={`bg-white shadow-[10px_10px_40px_0px_rgba(26,129,255,0.10)] p-2 sm:p-3 text-[#22272BCC] text-[13px] font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer ${errors.eldestAge ? 'border border-red-500' : ''}`}
                    value={formData.eldestAge}
                    onChange={handleChange}
                    min="1"
                    max="100"
                />
                {errors.eldestAge && <p className="text-red-500 text-xs mt-1">{errors.eldestAge}</p>}

                {/* Pincode */}
                <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    className={`bg-white shadow-[10px_10px_40px_0px_rgba(26,129,255,0.10)] p-2 sm:p-3 text-[#22272BCC] text-[13px] font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer ${errors.pincode ? 'border border-red-500' : ''}`}
                    value={formData.pincode}
                    onChange={handleChange}
                    maxLength="6"
                />
                {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-4">
                    {/* Name */}
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className={`bg-white shadow-[10px_10px_40px_0px_rgba(26,129,255,0.10)] p-2 sm:p-3 text-[#22272BCC] text-[13px] font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer ${errors.name ? 'border border-red-500' : ''}`}
                        required
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}

                    {/* Email */}
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email ID"
                        className={`bg-white shadow-[10px_10px_40px_0px_rgba(26,129,255,0.10)] p-2 sm:p-3 text-[#22272BCC] text-[13px] font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer ${errors.email ? 'border border-red-500' : ''}`}
                        required
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}

                    {/* Phone */}
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className={`bg-white shadow-[10px_10px_40px_0px_rgba(26,129,255,0.10)] p-2 sm:p-3 font-semibold text-[#22272BCC] text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer ${errors.phone ? 'border border-red-500' : ''}`}
                        maxLength="10"
                        required
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
        </>
    );

    const renderRenewPolicyForm = () => (
        <>
            <div className="flex gap-6 mb-6">
                <label className="flex items-center space-x-2">
                    <input
                        type="radio"
                        name="policyType"
                        value="new"
                        checked={policyType === "new"}
                        onChange={() => setPolicyType("new")}
                        className="accent-blue-500 cursor-pointer"
                    />
                    <span className="text-[#22272B] text-[12px] font-medium cursor-pointer">New Policy</span>
                </label>
                <label className="flex items-center space-x-2">
                    <input
                        type="radio"
                        name="policyType"
                        value="renew"
                        checked={policyType === "renew"}
                        onChange={() => setPolicyType("renew")}
                        className="accent-blue-500 cursor-pointer"
                    />
                    <span className="text-[#22272B] text-[12px] font-medium cursor-pointer">Renew Your Policy</span>
                </label>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className={`bg-white shadow-[10px_10px_40px_0px_rgba(26,129,255,0.10)] p-3 text-[#22272BCC] text-[13px] font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.name ? 'border border-red-500' : ''} cursor-pointer`}
                        required
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                
                <div>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Contact Number"
                        className={`bg-white shadow-[10px_10px_40px_0px_rgba(26,129,255,0.10)] p-3 text-[#22272BCC] text-[13px] font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.phone ? 'border border-red-500' : ''} cursor-pointer`}
                        maxLength="10"
                        required
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                
                <div className="relative">
                    <select
                        name="currentInsurer"
                        className={`w-full bg-white shadow-[10px_10px_40px_0px_rgba(26,129,255,0.10)] p-3 text-[13px] font-semibold text-[#22272BCC] appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.currentInsurer ? 'border border-red-500' : ''} cursor-pointer`}
                        value={formData.currentInsurer}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Current Insurance Company</option>
                        {insuranceCompanies.map((company, index) => (
                            <option key={index} value={company}>{company}</option>
                        ))}
                    </select>
                    <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer" width="25" height="25" viewBox="0 0 25 25" fill="none">
                        <path d="M12.2188 16.2999L6.21875 10.2999L7.61875 8.8999L12.2188 13.4999L16.8188 8.8999L18.2188 10.2999L12.2188 16.2999Z" fill="#4E5B60" />
                    </svg>
                    {errors.currentInsurer && <p className="text-red-500 text-xs mt-1">{errors.currentInsurer}</p>}
                </div>
                
                <div className="relative">
                    <select
                        name="preferredInsurer"
                        className={`w-full bg-white shadow-[10px_10px_40px_0px_rgba(26,129,255,0.10)] p-3 text-[13px] font-semibold text-[#22272BCC] appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.preferredInsurer ? 'border border-red-500' : ''} cursor-pointer`}
                        value={formData.preferredInsurer}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Preferred Insurance Company</option>
                        {insuranceCompanies.map((company, index) => (
                            <option key={index} value={company}>{company}</option>
                        ))}
                    </select>
                    <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer" width="25" height="25" viewBox="0 0 25 25" fill="none">
                        <path d="M12.2188 16.2999L6.21875 10.2999L7.61875 8.8999L12.2188 13.4999L16.8188 8.8999L18.2188 10.2999L12.2188 16.2999Z" fill="#4E5B60" />
                    </svg>
                    {errors.preferredInsurer && <p className="text-red-500 text-xs mt-1">{errors.preferredInsurer}</p>}
                </div>
                
                <div className="md:col-span-2">
                    <label className="block text-[#22272BCC] text-[13px] font-semibold mb-2">
                        Upload Policy Copy <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                        <input
                        type="file"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept=".pdf,.jpg,.jpeg,.png"
                        />
                        <div className="bg-white shadow-[10px_10px_40px_0px_rgba(26,129,255,0.10)] p-3 text-[#22272BCC] text-[13px] font-semibold border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
                        {policyFile ? (
                            <span className="text-blue-500">{policyFile.name}</span>
                        ) : (
                            <span>Click to upload (PDF, JPG, PNG)</span>
                        )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <>
            <section className="w-full py-12 px-4 md:px-12 lg:px-24 bg-[linear-gradient(250deg,#24BDED_0%,#47B7FF_100%)]">
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between relative 2xl:ml-[20%]">
                    <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-lg w-full p-8 lg:p-10 lg:pr-50 relative">
                        <h2 className="text-[28px] md:text-[46px] font-semibold text-[#222] mb-2">Health Insurance</h2>
                        <p className="text-[14px] md:text[16px] text-[#22272BCC] mb-6">Compare & Buy Best Fit Health Insurance</p>

                        {policyType === "new" ? renderNewPolicyForm() : renderRenewPolicyForm()}
                        
                        <button 
                            type="submit" 
                            className="w-full bg-[#24BDED] hover:bg-[#1DAED9] text-white py-3 rounded-xl text-lg font-semibold transition cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed mt-7"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : (policyType === "new" ? "Get a Free Quote" : "Renew My Policy")}
                        </button>
                    </form>

                    <div className="w-full relative h-auto mb-3 mx-0 z-20 lg:top-[50px] lg:right-10 2xl:top-[20px]">
                        <img
                            src="/images/hospital-bed.png"
                            alt="Hospital Bed"
                            className="object-contain w-full lg:w-[600px] lg:h-[550px] 2xl:w-[700px] 2xl:h-[600px]"
                        />
                    </div>
                </div>
            </section>

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
        </>
    );
};

export default HeroHealth;