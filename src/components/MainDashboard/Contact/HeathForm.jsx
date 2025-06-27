import React, { useState, useRef, useEffect } from "react";
import { submitHealthInsuranceLead } from '../../../api/healthApi';
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

const HealthForm = () => {
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
        preferredInsurer: []
    });
    const [policyFile, setPolicyFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    
    // Search dropdown state
    const [search, setSearch] = useState("");
    const [prefSearch, setPrefSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isPrefOpen, setIsPrefOpen] = useState(false);
    const dropdownRef = useRef();
    const prefDropdownRef = useRef();

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
            if (prefDropdownRef.current && !prefDropdownRef.current.contains(event.target)) {
                setIsPrefOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredCompanies = insuranceCompanies.filter(company =>
        company.toLowerCase().includes(search.toLowerCase())
    );

    const filteredPrefCompanies = insuranceCompanies.filter(company =>
        company.toLowerCase().includes(prefSearch.toLowerCase())
    );

    const handleSelect = (company) => {
        setFormData({...formData, insurer: company});
        setIsOpen(false);
        setSearch("");
    };

    const handlePrefInsurerToggle = (company) => {
        const currentSelection = formData.preferredInsurer;
        if (currentSelection.includes(company)) {
            setFormData({
                ...formData,
                preferredInsurer: currentSelection.filter(item => item !== company)
            });
        } else {
            setFormData({
                ...formData,
                preferredInsurer: [...currentSelection, company]
            });
        }
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
            ['name', 'email', 'phone', 'pincode'] : 
            ['name', 'phone', 'currentInsurer'];
        
        requiredFields.forEach(field => {
            if (!formData[field]) {
                newErrors[field] = "This field is required";
            }
        });

        // For new policies, check if either insurer or preferredInsurer is selected
        if (policyType === "new" && !formData.insurer && formData.preferredInsurer.length === 0) {
            newErrors.insurer = "Please select at least one insurance company";
        }

        // For renew policies, check preferredInsurer
        if (policyType === "renew" && formData.preferredInsurer.length === 0) {
            newErrors.preferredInsurer = "Please select at least one preferred company";
        }

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
                formDataObj.append('pincode', formData.pincode);
                formDataObj.append('email', formData.email);
                
                // Add insurer if selected
                if (formData.insurer) {
                    formDataObj.append('insurer', formData.insurer);
                }
                
                // Add preferred insurers if selected
                formData.preferredInsurer.forEach(insurer => {
                    formDataObj.append('preferred_insurer[]', insurer);
                });

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
                formData.preferredInsurer.forEach(insurer => {
                    formDataObj.append('preferred_insurer[]', insurer);
                });
                
                if (policyFile) {
                    formDataObj.append('policy_file', policyFile);
                }
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
                preferredInsurer: []
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
        <div className="space-y-4">
            <div className="flex gap-6 mb-4 text-[#22272b]">
                <label className="flex items-center space-x-2">
                    <input
                        type="radio"
                        name="policyType"
                        value="new"
                        checked={policyType === "new"}
                        onChange={() => setPolicyType("new")}
                        className="accent-blue-500 cursor-pointer"
                    />
                    <span className="text-[#22272B] text-sm cursor-pointer">New Policy</span>
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
                    <span className="text-[#22272B] text-sm cursor-pointer">Renew Your Policy</span>
                </label>
            </div>

            <div className="flex items-center gap-4 mb-4">
                {/* Adult Counter */}
                <div className="flex items-center gap-2">
                    <span className="text-sm">Adult</span>
                    <div className="flex">
                        <button
                            type="button"
                            onClick={() => setFormData({...formData, adults: Math.max(0, formData.adults - 1)})}
                            className="px-2 border cursor-pointer"
                        >
                            -
                        </button>
                        <span className="mx-2">{formData.adults}</span>
                        <button
                            type="button"
                            onClick={() => setFormData({...formData, adults: formData.adults + 1})}
                            className="px-2 border cursor-pointer"
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Children Counter */}
                <div className="flex items-center gap-2">
                    <span className="text-sm">Child</span>
                    <div className="flex">
                        <button
                            type="button"
                            onClick={() => setFormData({...formData, children: Math.max(0, formData.children - 1)})}
                            className="px-2 border cursor-pointer"
                        >
                            -
                        </button>
                        <span className="mx-2">{formData.children}</span>
                        <button
                            type="button"
                            onClick={() => setFormData({...formData, children: formData.children + 1})}
                            className="px-2 border cursor-pointer"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

                {/* Preferred Insurer Dropdown */}
                <div className="relative" ref={prefDropdownRef}>
                    <div
                        className={`w-full min-h-14 max-h-28 px-4 py-2 bg-white border rounded-[16px] text-base focus:outline-none 
                            overflow-y-auto flex flex-wrap gap-2 items-center cursor-pointer
                            ${errors.preferredInsurer ? 'border-red-500' : 'border-gray-300'}`}
                        onClick={() => setIsPrefOpen(!isPrefOpen)}
                    >
                        {formData.preferredInsurer.length > 0 ? (
                            formData.preferredInsurer.map((item, index) => (
                                <span
                                    key={index}
                                    className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap"
                                >
                                    {item}
                                </span>
                            ))
                        ) : (
                            <span className="text-gray-400">Preferred Insurance Company</span>
                        )}
                    </div>  
                    {errors.preferredInsurer && <p className="text-red-500 text-xs mt-1">{errors.preferredInsurer}</p>}

                    {isPrefOpen && (
                        <div className="absolute z-10 w-full bg-white border rounded mt-1 max-h-60 overflow-y-auto">
                            <input
                                type="text"
                                className="w-full p-2 border-b outline-none text-sm"
                                placeholder="Search Insurer..."
                                value={prefSearch}
                                onChange={(e) => setPrefSearch(e.target.value)}
                                autoFocus
                            />
                            <div className="max-h-48 overflow-y-auto">
                                {filteredPrefCompanies.map((company, index) => (
                                    <label 
                                        key={index} 
                                        className="flex items-center p-2 hover:bg-blue-50 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={formData.preferredInsurer.includes(company)}
                                            onChange={() => handlePrefInsurerToggle(company)}
                                            className="mr-2 h-4 w-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                                        />
                                        <span className="text-sm">{company}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Claim Status */}
                <div className="relative">
                    <select
                        name="claimStatus"
                        className="text-gray-400 w-full h-14 px-4 bg-white border border-[#d9dde1] rounded-[16px] text-base focus:outline-none focus:border-blue-300 cursor-pointer"
                        value={formData.claimStatus}
                        onChange={handleChange}
                    >
                        <option value="" >Any Previous Claims?</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>

                {/* Eldest Age */}
                <input
                    type="number" 
                    name="eldestAge"
                    placeholder="Eldest Member Age"
                    className={`w-full h-14 px-4 bg-white border border-[#d9dde1] rounded-[16px] text-base focus:outline-none focus:border-blue-300 cursor-pointer ${errors.eldestAge ? 'border-red-500' : 'border-gray-300'}`}
                    value={formData.eldestAge}
                    onChange={handleChange}
                />
                {errors.eldestAge && <p className="text-red-500 text-xs mt-1">{errors.eldestAge}</p>}

                {/* Pincode */}
                <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    className={`w-full h-14 px-4 bg-white border border-[#d9dde1] rounded-[16px] text-base focus:outline-none focus:border-blue-300 cursor-pointer ${errors.pincode ? 'border-red-500' : 'border-gray-300'}`}
                    value={formData.pincode}
                    onChange={handleChange}
                    maxLength="6"
                />
                {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {/* Name */}
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className={`w-full h-14 px-4 bg-white border border-[#d9dde1] rounded-[16px] text-base focus:outline-none focus:border-blue-300 cursor-pointer ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
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
                    className={`w-full h-14 px-4 bg-white border border-[#d9dde1] rounded-[16px] text-base focus:outline-none focus:border-blue-300 cursor-pointer ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
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
                    className={`w-full h-14 px-4 bg-white border border-[#d9dde1] rounded-[16px] text-base focus:outline-none focus:border-blue-300 cursor-pointer ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                    maxLength="10"
                    required
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
        </div>
    );

    const renderRenewPolicyForm = () => (
        <div className="space-y-4">
            <div className="flex gap-6 mb-4">
                <label className="flex items-center space-x-2">
                    <input
                        type="radio"
                        name="policyType"
                        value="new"
                        checked={policyType === "new"}
                        onChange={() => setPolicyType("new")}
                        className="accent-blue-500 cursor-pointer"
                    />
                    <span className="text-[#22272B] text-sm cursor-pointer">New Policy</span>
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
                    <span className="text-[#22272B] text-sm cursor-pointer">Renew Your Policy</span>
                </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className={`w-full h-14 px-4 bg-white border border-[#d9dde1] rounded-[16px] text-base focus:outline-none focus:border-blue-300 cursor-pointer ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    required
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Contact Number"
                    className={`w-full h-14 px-4 bg-white border border-[#d9dde1] rounded-[16px] text-base focus:outline-none focus:border-blue-300 cursor-pointer ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                    maxLength="10"
                    required
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                
                <div className="relative">
                    <select
                        name="currentInsurer"
                        className={`w-full h-14 px-4 bg-white border border-[#d9dde1] rounded-[16px] text-base focus:outline-none focus:border-blue-300 text-gray-400 cursor-pointer ${errors.currentInsurer ? 'border-red-500' : 'border-gray-300'}`}
                        value={formData.currentInsurer}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Current Insurance Company</option>
                        {insuranceCompanies.map((company, index) => (
                            <option key={index} value={company}>{company}</option>
                        ))}
                    </select>
                    {errors.currentInsurer && <p className="text-red-500 text-xs mt-1">{errors.currentInsurer}</p>}
                </div>
                
                {/* Preferred Insurer Dropdown */}
                <div className="relative w-full" ref={prefDropdownRef}>
                        <div
                            className={`w-full min-h-14 max-h-28 px-4 py-2 bg-white border rounded-[16px] text-base focus:outline-none 
                                overflow-y-auto flex flex-wrap gap-2 items-center cursor-pointer
                                ${errors.preferredInsurer ? 'border-red-500' : 'border-gray-300'}`}
                            onClick={() => setIsPrefOpen(!isPrefOpen)}
                        >
                            {formData.preferredInsurer.length > 0 ? (
                                formData.preferredInsurer.map((item, index) => (
                                    <span
                                        key={index}
                                        className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap"
                                    >
                                        {item}
                                    </span>
                                ))
                            ) : (
                                <span className="text-gray-400">Preferred Insurance Company</span>
                            )}
                        </div>

                        {errors.preferredInsurer && (
                            <p className="text-red-500 text-xs mt-1">{errors.preferredInsurer}</p>
                        )}

                        {isPrefOpen && (
                            <div className="absolute z-10 w-full bg-white border rounded mt-1 max-h-60 overflow-y-auto shadow-md">
                                <input
                                    type="text"
                                    className="w-full p-2 border-b outline-none text-sm"
                                    placeholder="Search Insurer..."
                                    value={prefSearch}
                                    onChange={(e) => setPrefSearch(e.target.value)}
                                    autoFocus
                                />
                                <div className="max-h-48 overflow-y-auto">
                                    {filteredPrefCompanies.map((company, index) => (
                                        <label
                                            key={index}
                                            className="flex items-center p-2 hover:bg-blue-50 cursor-pointer"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={formData.preferredInsurer.includes(company)}
                                                onChange={() => handlePrefInsurerToggle(company)}
                                                className="mr-2 h-4 w-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                                            />
                                            <span className="text-sm">{company}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                </div>

                
                <div className="md:col-span-2">
                    <label className="block text-sm mb-2">
                        Upload Policy Copy <span className="text-gray-400">(Optional)</span>
                    </label>
                    <div className="relative">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            accept=".pdf,.jpg,.jpeg,.png"
                        />
                        <div className="p-3 border border-dashed border-gray-300 rounded flex items-center justify-center">
                            {policyFile ? (
                                <span className="text-blue-500">{policyFile.name}</span>
                            ) : (
                                <span className="text-gray-400">Click to upload (PDF, JPG, PNG)</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="">
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
                <h2 className="text-xl font-semibold mb-4">Health Insurance</h2>
                <p className="text-sm text-gray-600 mb-6">Compare & Buy Best Fit Health Insurance</p>

                {policyType === "new" ? renderNewPolicyForm() : renderRenewPolicyForm()}
                <div className="flex justify-end">
                    <button 
                        type="submit" 
                        className="w-[180px] h-14 bg-gradient-to-r from-[#39b2ff] to-[#c465ea] text-white rounded-[16px] font-semibold text-lg hover:brightness-110 transition cursor-pointer"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : (policyType === "new" ? "Get a Free Quote" : "Renew My Policy")}
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
};

export default HealthForm;