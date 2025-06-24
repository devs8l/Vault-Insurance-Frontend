import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/MainDashboard/Header';
import HeroSection from './components/MainDashboard/HeroSection';
import InsuranceSections from './components/MainDashboard/InsuranceSections';
import CoreValuesSection from './components/MainDashboard/CoreValuesSection';
import About from './components/MainDashboard/About';
import Statistics from './components/MainDashboard/Statistics';
import Contact from './components/MainDashboard/Contact';
import Footer from './components/MainDashboard/Footer';

import LifeInsurance from './pages/LifeInsurance';
import HealthInsurance from './pages/HealthInsurance';
import VehicleInsurance from './pages/VehicleInsurance';
import BusinessInsurance from './pages/BusinessInsurance';
import ThankYou from './pages/ThankYou';

import LoginPage from './admin/LoginPage';
import AdminDashboard from './admin/AdminDashboard';
import NotFound from './admin/NotFound';

import ContactsDashboard from './admin/ContactsDashboard';
import BusinessQuotesPage from './admin/BusinessQuotesDashboard';
import HealthLeadsPage from './admin/HealthLeadsDashboard';
import LifeInsuranceLeads from './admin/LifeInsuranceLeads';


function MainWebsite() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <InsuranceSections />
        <CoreValuesSection />
        <About />
        <Statistics />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Routes>
      <Route path="/" element={<MainWebsite />} />
      <Route path="/life-insurance" element={<LifeInsurance />} />
      <Route path="/health-insurance" element={<HealthInsurance />} />
      <Route path="/vehicle-insurance" element={<VehicleInsurance />} />
      <Route path="/business-insurance" element={<BusinessInsurance />} />
      <Route path="/contact" element={<Contact />} />
      <Route path='/not-found' element={<NotFound/>}/>
      <Route path='/thank-you' element={<ThankYou/>}/>
      
      
      {/* Admin Routes */}
      <Route path="/admin" element={<LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />} />
      
      {/* Protected Admin Routes */}
      {isLoggedIn ? (
        <>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/contacts" element={<ContactsDashboard />} />
          <Route path="/admin/life-leads" element={<LifeInsuranceLeads />} />
          <Route path="/admin/health-leads" element={<HealthLeadsPage />} />
          <Route path="/admin/business-quotes" element={<BusinessQuotesPage />} />
        </>
      ) : (
        <>
          <Route path="/admin/dashboard" element={<Navigate to="/admin" replace />} />
          <Route path="/admin/contacts" element={<Navigate to="/admin" replace />} />
          <Route path="/admin/life-leads" element={<Navigate to="/admin" replace />} />
          <Route path="/admin/health-leads" element={<Navigate to="/admin" replace />} />
          <Route path="/admin/business-quotes" element={<Navigate to="/admin" replace />} />
        </>
      )}
    </Routes>
  );
}

export default App;
