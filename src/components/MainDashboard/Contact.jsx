import React, { useState } from 'react';
import { submitContactForm } from '../../api/contactApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LifeForm from './Contact/LifeForm';
import HealthForm from './Contact/HeathForm';
import BusinessForm from './Contact/BusinessForm';

// Button Component
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
  const baseClasses =
    'font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center';

  const variants = {
    primary:
      'bg-gradient-to-r from-[#39b2ff] to-[#c465ea] text-white hover:brightness-110 focus:ring-[#c465ea] cursor-pointer',
  };

  const sizes = {
    small: 'px-4 py-2 text-sm h-10',
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

// Contact Component
const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    helpWith: '',
    message: ''
  });

  const [activeForm, setActiveForm] = useState('contact');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await submitContactForm(formData);

      if (res.success) {
        toast.success('🎉 Your message submitted successfully! Our team will contact you shortly.', {
          className: 'bg-green-50 text-green-800 rounded-md shadow-md border border-green-200 px-4 py-2 font-medium',
          icon: '✅'
        });
        setTimeout(() => window.location.reload(), 3000);
        setFormData({
          firstName: '',
          lastName: '',
          phone: '',
          helpWith: '',
          message: ''
        });
      } else {
        alert('Failed to send message.');
      }
    } catch (err) {
      console.error('Quote submission failed:', err);
      toast.error('❌ Oops! Submission failed. Please try again.', {
        className: 'bg-red-50 text-red-800 rounded-md shadow-md border border-red-200 px-4 py-2 font-medium',
        icon: '⚠️'
      });
    }
  };

  const renderActiveForm = () => {
    switch (activeForm) {
      case 'life':
        return <LifeForm />
      case 'health':
        return <HealthForm />
      case 'business':
        return <BusinessForm />
      default:
        return (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[15px] text-[#596069] mb-2">first name*</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full h-14 px-4 bg-white border border-[#d9dde1] rounded-[16px] text-base focus:outline-none focus:border-blue-300"
                  required
                />
              </div>
              <div>
                <label className="block text-[15px] text-[#596069] mb-2">last name*</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full h-14 px-4 bg-white border border-[#d9dde1] rounded-[16px] text-base focus:outline-none focus:border-blue-300"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[15px] text-[#596069] mb-2">phone*</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full h-14 px-4 bg-white border border-[#d9dde1] rounded-[16px] text-base focus:outline-none focus:border-blue-300"
                  required
                />
              </div>
              <div>
                <label className="block text-[15px] text-[#596069] mb-2">how can we help you?*</label>
                <input
                  type="text"
                  name="helpWith"
                  value={formData.helpWith}
                  onChange={handleInputChange}
                  className="w-full h-14 px-4 bg-white border border-[#d9dde1] rounded-[16px] text-base focus:outline-none focus:border-blue-300"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[15px] text-[#596069] mb-2">message*</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className="w-full px-4 py-3 bg-white border border-[#d9dde1] rounded-[16px] text-base focus:outline-none focus:border-blue-300 resize-none"
                required
              ></textarea>
            </div>

            <div className="flex justify-end">
              <Button type="submit" variant="primary" size="small" className="w-[180px] h-14 rounded-[16px] text-xl font-semibold">
                Submit
              </Button>
            </div>
          </form>
        );
    }
  };

  return (
    <section id="contact-form" className="bg-[#f4f8fb] py-20 rounded-[30px] m-5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Left Side - Form */}
            <div className="z-10">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#22272b] mb-6">Contact us</h2>

              {/* Buttons for form switching */}
              <div className="flex flex-wrap gap-4 mb-6">
                {["contact", "life", "health", "business"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveForm(type)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                      activeForm === type
                        ? "bg-[#24BDED] text-white"
                        : "bg-white text-[#24BDED] border border-[#24BDED]"
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>

              {/* Render dynamic form */}
              {renderActiveForm()}
            </div>

            {/* Right Side - Illustration - Now properly aligned in grid */}
            <div className="hidden md:flex justify-center items-center">
              <img
                src="/images/Waving-hand.png"
                alt="Vault Insurance Hero"
                className="w-full max-w-[500px] lg:max-w-[600px] xl:max-w-[700px] h-auto"
              />
            </div>
          </div>
        </div>

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
      </section>  );
};

export default Contact;
